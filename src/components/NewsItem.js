import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source, pillColor } = props; //destructuring
    return (
        <div className='my-3'>
            <div className="card">
                <div style={{ display: 'flex', right: 0, position: 'absolute', justifyContent: 'flex-end' }}>
                    <span className={`badge rounded-pill bg-${pillColor}`} >
                        {source}
                    </span>
                </div>
                <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "200px" }} />
                <div className="card-body" style={{ zIndex: '1' }}>
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className={`text-${pillColor}`}>By {author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm btn-primary">Read More...</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem