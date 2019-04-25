import React, { Component } from 'react';
import News from './components/News';
import AddNews from './components/AddNews';

import './App.css';

import newsData from './data/newsData.json';

class App extends Component {
  state = {
    news: newsData
  }

  onAddNews = ({author, text, bigText}) => {
    const {news} = this.state;
    const nextNews = [...this.state.news, {id: news.length + 1, author, text, bigText}]

    console.log(nextNews)
    this.setState({
      news: nextNews
    })
  }

  render() {
    return(
      <div className="app">
        <h3>Новости</h3>
        <AddNews onAddNews={this.onAddNews} />
        <News data={this.state.news} />
      </div>
    )
    }
}

export default App;
