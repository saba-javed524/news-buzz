import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl } = this.props; //destructuring
        return (
            <div className='my-3'>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={imageUrl} className="card-img-top" alt="..." style={{ height: "200px" }} />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm btn-primary">Read More...</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem