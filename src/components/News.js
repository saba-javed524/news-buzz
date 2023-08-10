import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const updateNews = async () => {
        console.log('UPDATE NEWS IS CALLED')
        props.setProgress(10);
        setLoading(true);
        props.setProgress(30);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        document.title = `${capitalize(props.category)} - The News Buzz`
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);
        // let totalResults = await parsedData.totalResults;
        props.setProgress(70);
        setLoading(false);
        setPage(2);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        // setPageLimit(Math.ceil(totalResults / props.pageSize)) //total number of pages
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
        /* eslint-disable */
    }, [])

    const fetchMoreData = async () => {
        console.log('FETCH MORE DATA IS CALLED')
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        // let totalResults = await parsedData.totalResults;
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    }

    // const handlePreviousClick = async () => {
    //     setPage(page - 1);
    //     await updateNews()
    // }

    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     await updateNews()
    // }

    return (
        <>
            <h3 className='text-center' style={{ marginTop: '6%' }}>Buzzworthy News: Top {capitalize(props.category)} Headlines!</h3>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}>
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title === null ? "" : (element.title.length > 45 ? element.title.slice(0, 45) + "..." : element.title.slice(0, 45))}
                                    description={element.description === null ? "" : (element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description.slice(0, 88))}
                                    imageUrl={element.urlToImage === null ? "https://media.istockphoto.com/id/1128119311/photo/cubes-with-the-word-news-on-a-newspaper.jpg?b=1&s=612x612&w=0&k=20&c=AUpepbnMhzMFfCpJTKqoC4fKn48prR39X5AqYNdaHk0=" : element.urlToImage}
                                    newsUrl={element.url}
                                    author={!element.author ? 'Unknown' : element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                    pillColor={props.pillColor} />
                            </div>
                        })}
                    </div>
                    <h6 className='text-center mt-3 text-secondary-emphasis'>Showing {articles.length} of total {totalResults} results.</h6>

                </div>

                {/* <div className="container d-flex justify-content-between">
                        <button disabled={  page <= 1 ? true : false} onClick={  handlePreviousClick} type="button" className="btn btn-dark my-2">&larr; Previous</button>
                        <h6 className='mt-3 text-secondary-emphasis'>Page {  page} of total {  pageLimit} pages. Showing {  loading ? '0' :   props.pageSize} of total {  totalResults} results.</h6>
                        <button disabled={  pageLimit >   page ? false : true} onClick={  handleNextClick} type="button" className="btn btn-dark my-2">Next &rarr;</button>
                    </div> */}
            </InfiniteScroll>
        </>
    )
}

News.defaultProps = {
    pageSize: 9,
    country: "us",
    category: "general",
    pillColor: "primary",

}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string,
    pillColor: PropTypes.string
}

export default News
