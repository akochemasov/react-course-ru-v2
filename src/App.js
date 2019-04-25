import React, { Component } from 'react';
import News from './components/News';
import AddNews from './components/AddNews';

import './App.css';

// import newsData from './data/newsData.json';

const SPAM_WORD = 'test';
const SPAG_MSG = 'СПАМ';

class App extends Component {
  state = {
    news: null,
    isLoading: false
  }

  componentDidMount = () => {
    this.setState({isLoading: true})

    fetch('http://localhost:3001/data/newsData.json')
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.setState({
          news: data,
          isLoading: false
        })

        // setTimeout(() => {
        //   this.setState({
        //     news: data,
        //     isLoading: false
        //   })
        // }, 3000)    //искуственная задержка
      })
  }

  static getDerivedStateFromProps(props, state) {
    if (Array.isArray(state.news)) {
      const nextFilteredNews = [...state.news];
      nextFilteredNews.forEach(item => {
        if (item.bigText.toLowerCase().includes(SPAM_WORD)) {
          item.bigText = SPAG_MSG;
        }
      })

      return {
        news: nextFilteredNews
      }
    }

    return null
  }

  onAddNews = ({author, text, bigText}) => {
    const {news} = this.state;

    // if (bigText.toLowerCase().includes(SPAM_WORD)) {
    //   bigText = SPAG_MSG
    // }

    const nextNews = [...this.state.news, {id: news.length + 1, author, text, bigText}]

    this.setState({
      news: nextNews
    })
  }

  render() {
    const {news, isLoading} = this.state;
    
    return(
      <div className="app">
        <AddNews onAddNews={this.onAddNews} />
        <h3>Новости</h3>        
        {isLoading && <p>Загружаю...</p>}
        {Array.isArray(news) && <News data={news} />}
      </div>
    )
    }
}

export default App;
