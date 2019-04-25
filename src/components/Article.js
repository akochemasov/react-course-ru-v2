import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Article.css';

class Article extends Component {
  state = {
    isShowBigText: false
  }

  moreClickHandler = () => {
    this.setState({
      isShowBigText: !this.state.isShowBigText
    })
  }

  render() {
    const {author, text, bigText} = this.props.data;
    const {isShowBigText} = this.state;

    return(
      <div className="article">
        <p className="article__news-author">{author}:</p>
        <p className="article__news-text">{text}</p>
        <button onClick={this.moreClickHandler}>Подробнее</button>
        {isShowBigText && <p className="article__news-big-text">{bigText}</p>}
      </div>
    )
  }
}
Article.propTypes = {
  data: PropTypes.shape({
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired
  })
}

export default Article