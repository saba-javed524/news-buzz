import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {


    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            pageLimit: 0
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a938f2904fbc47809b1f97811e00a4e5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        let totalResults = await parsedData.totalResults;
        this.setState({
            loading: false,
            page: this.state.page,
            articles: parsedData.articles,
            pageLimit: Math.ceil(totalResults / this.props.pageSize)
        })
    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a938f2904fbc47809b1f97811e00a4e5&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            loading: false,
            page: this.state.page - 1,
            articles: parsedData.articles,
            pageLimit: this.state.pageLimit
        })
    }
    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a938f2904fbc47809b1f97811e00a4e5&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({
            loading: true
        })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            loading: false,
            page: this.state.page + 1,
            articles: parsedData.articles,
            pageLimit: this.state.pageLimit
        })
    }

    render() {
        return (
            <div className="container">
                <h3 className='text-center mt-3'>Buzzworthy News: Stay Informed with News Buzz!</h3>
                {this.state.loading === true ? <Spinner /> :
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title === null ? "" : (element.title.length > 45 ? element.title.slice(0, 45) + "..." : element.title.slice(0, 45))} description={element.description === null ? "" : (element.description.length > 88 ? element.description.slice(0, 88) + "..." : element.description.slice(0, 88))} imageUrl={element.urlToImage === null ? "https://media.istockphoto.com/id/1128119311/photo/cubes-with-the-word-news-on-a-newspaper.jpg?b=1&s=612x612&w=0&k=20&c=AUpepbnMhzMFfCpJTKqoC4fKn48prR39X5AqYNdaHk0=" : element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>}
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1 ? true : false} onClick={this.handlePreviousClick} type="button" className="btn btn-dark my-2">&larr; Previous</button>
                    <h6 className='mt-3 text-secondary-emphasis'>Page {this.state.page} of total {this.state.pageLimit} pages. Showing {this.state.loading ? '0' : this.props.pageSize} results.</h6>
                    <button disabled={this.state.pageLimit > this.state.page ? false : true} onClick={this.handleNextClick} type="button" className="btn btn-dark my-2">Next &rarr;</button>
                </div>

            </div>
        )
    }
}


export default News