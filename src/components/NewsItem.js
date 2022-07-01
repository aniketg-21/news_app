import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let {source, author, title, description, publishedAt, img_url, news_url} = this.props;
        return (
          <div className="card shadow-lg rounded">
            <h5 className="card-header">{author}</h5>
            <div className="d-flex position-absolute" style={{right:0}}>
              <span className="translate-middle badge rounded-pill bg-danger">{source}<span className="visually-hidden">source name</span></span>
            </div>
            <img src={img_url} className="img-fluid shadow" alt="Not found!" />
            <p className=" text-muted text-center mb-0">{new Date(publishedAt).toGMTString()}</p>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <a href={news_url} target="_blank" rel="noreferrer" className="btn btn-dark">Continue reading &rarr;</a>
            </div>
          </div>
        )
    }
}

export default NewsItem
