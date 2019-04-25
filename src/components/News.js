import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

import './News.css';

const SPAM_WORD = 'test';
const SPAG_MSG = 'СПАМ';

class News extends Component {
  state = {
    filteredNews: this.props.data
  }

  componentWillReceiveProps = (nextProps) => {
    const nextListNews = [...nextProps.data];

    nextListNews.forEach(item => {
      if (item.bigText.toLowerCase().includes(SPAM_WORD)) {
        item.bigText = SPAG_MSG;
      }
    })

    this.setState({
      filteredNews: nextListNews
    })
  }

  renderNews = () => {
    const {filteredNews} = this.state;

    let newsTemplate = <p>Новостей нет</p>;
    if (filteredNews.length) {
      newsTemplate = filteredNews.map((item, index) => <Article data={item} key={item.id} />)
    }

    return newsTemplate;
  }

  render() {
    const {filteredNews} = this.state;

    return (
      <div className="news">
          {this.renderNews()}
          {filteredNews.length ? <strong>Всего новостей: {filteredNews.length}</strong> : null}              
      </div>
    )
  }
}
News.propTypes = {
  data: PropTypes.array.isRequired
}

export default News;