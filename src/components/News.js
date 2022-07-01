import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize: 6,
      category: 'general'
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string
    }
    capitalizeMe = (str)=>{
      return str.charAt(0).toUpperCase() + str.substr(1,).toLowerCase();
    }

    constructor(props){
      super(props);
      this.state = {
        articles: [],
        loading: true,
        page: 1,
        totalResults: 0
      }
      document.title = `News Finder - ${this.capitalizeMe(this.props.category)}`;
    }

    async updateNews() {
      this.props.setProgress(25);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      this.props.setProgress(50);
      let parsedData = await data.json();
      this.props.setProgress(75);
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false
      });
      this.props.setProgress(100);
    }

    async componentDidMount() {
      this.updateNews();
    }

    fetchMoreData = async ()=>{
      this.setState({page: this.state.page + 1});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
      });
    }

    // handlePrevClick = async ()=>{
    //   this.setState({page: this.state.page - 1});
    //   this.updateNews();
    // }
    // handleNextClick = async ()=>{
    //   this.setState({page: this.state.page + 1});
    //   this.updateNews();
    // }

    render() {
        return (
            <>
              <h1 className="text-center mt-4 mb-4">
                <span className="text-decoration-underline">Top <span className="text-danger">{this.state.totalResults}</span> Headlines</span> <span className="badge shadow bg-light text-dark border">{this.props.category.toUpperCase()}</span>
              </h1>
              {this.state.loading && <Spinner />}

              <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}>

                <div className="container">
                  <div className="row">
                  {this.state.articles.map((elem, i)=>{
                    return <div className="col-md-4 my-3" key={elem.url}>
                      <NewsItem source={elem.source.name?elem.source.name:"Anonymous"} author={elem.author?elem.author:"Anonymous"} title={elem.title} description={elem.description} publishedAt={elem.publishedAt} img_url={elem.urlToImage?elem.urlToImage:""} news_url={elem.url} />
                    </div>
                  })}
                  </div>
                </div>
              </InfiniteScroll>

              {/*<div className="d-flex justify-content-between">
                <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Prev</button>
                <span className="badge bg-dark rounded fs-6 d-flex align-items-center">{this.state.page}</span>
                <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
              </div>*/}
            </>
        )
    }
}

export default News
