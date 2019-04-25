const myNews = [
  {
    id: 1,
    author: 'Author 1',
    text: 'Text 1',
    bigText: 'Big text 1'
  },
  {
    id: 2,
    author: 'Author 2',
    text: 'Text 2',
    bigText: 'Big text 2'
  },
  {
    id: 3,
    author: 'Author 3',
    text: 'Text 3',
    bigText: 'Big text 2'
  }
];

// Article
class Article extends React.Component {
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
        <p className="news__author">{author}:</p>
        <p className="news__text">{text}</p>
        <button onClick={this.moreClickHandler}>Подробнее</button>
        {isShowBigText && <p className="news__big-text">{bigText}</p>}
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

// News
class News extends React.Component {
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

// Add news
class Add extends React.Component {
  state = {
    author: '',
    text: '',
    isAccept: false
  }

  showHandler = (e) => {
    e.preventDefault();

    const {author, text} = this.state;
    this.props.onAddNews({author, text});    
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
    const {author, text, isAccept} = this.state;  
    return author.trim() && text.trim() && isAccept
  }

  render() {
    const {author, text} = this.state;

    return(
      <form className="add">
        <input id="author" type="text" className="add__author" placeholder="Имя" onChange={this.inputChangeHandler} value={author} />
        <textarea id="text" type="text" className="add__text" placeholder="Текст новости" onChange={this.inputChangeHandler} value={text}></textarea>
        <label>
          <input type="checkbox" onChange={this.checkboxAcceptHandler} />Я согласен с правилами
        </label>
        <button className="add__btn" onClick={this.showHandler} disabled={!this.validate()}>Добавить новость</button>
      </form>
    )
  }
}
Add.propTypes = {
  onAddNews: PropTypes.func.isRequired
}

// App
class App extends React.Component {
  state = {
    news: myNews
  }

  onAddNews = ({author, text}) => {
    const {news} = this.state;
    const nextNews = [...this.state.news, {id: news.length + 1, author, text, bigText: ''}]

    this.setState({
      news: nextNews
    })
  }

  render() {
    return(
      <React.Fragment>
      <h3>Новости</h3>
      <Add onAddNews={this.onAddNews} />
      <News data={this.state.news} />
    </React.Fragment>
    )
    }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)