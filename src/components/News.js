import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Article from './Article';

import './News.css';

class News extends Component {
  renderNews = () => {
    const {data} = this.props;

    let newsTemplate = <p>Новостей нет</p>;
    if (data.length) {
      newsTemplate = data.map((item, index) => <Article data={item} key={item.id} />)
    }

    return newsTemplate;
  }

  render() {
    const {data} = this.props;

    return (
      <div className="news">
          {this.renderNews()}
          {data.length ? <strong>Всего новостей: {data.length}</strong> : null}              
      </div>
    )
  }
}
News.propTypes = {
  data: PropTypes.array.isRequired
}

export default News;