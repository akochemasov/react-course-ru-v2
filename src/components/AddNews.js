import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AddNews.css'

class AddNews extends Component {
  state = {
    author: '',
    text: '',
    bigText: '',
    isAccept: false
  }

  showHandler = (e) => {
    e.preventDefault();

    const {author, text, bigText} = this.state;
    this.props.onAddNews({author, text, bigText});
  }

  inputChangeHandler = (e) => {
    const {id, value} = e.currentTarget;

    this.setState({
      [id]: value
    })
  }

  checkboxAcceptHandler = (e) => {        
    this.setState({
      isAccept: e.currentTarget.checked
    })
  }

  validate = () => {
    const {author, text, bigText, isAccept} = this.state;  
    return author.trim() && text.trim() && bigText.trim() && isAccept
  }

  render() {
    const {author, text, bigText} = this.state;

    return(
      <form className="add">
        <input id="author" type="text" className="add__author" placeholder="Имя" onChange={this.inputChangeHandler} value={author} />
        <textarea id="text" type="text" className="add__text" placeholder="Текст новости" onChange={this.inputChangeHandler} value={text}></textarea>
        <textarea id="bigText" type="text" className="add__big-text" placeholder="Подробный текст новости" onChange={this.inputChangeHandler} value={bigText}></textarea>
        <label>
          <input type="checkbox" onChange={this.checkboxAcceptHandler} />Я согласен с правилами
        </label>
        <button className="add__btn" onClick={this.showHandler} disabled={!this.validate()}>Добавить новость</button>
      </form>
    )
  }
}
AddNews.propTypes = {
  onAddNews: PropTypes.func.isRequired
}

export default AddNews