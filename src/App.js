import React, { Component } from "react";
import './App.css';


class App extends Component  {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      articles:[]
    };
  }

  updateSearch(event){
    this.setState({search:event.target.value.substr(0, 15)})
    console.log(this.state)
  }

  componentDidMount() {
    fetch('http://ec2-34-245-55-16.eu-west-1.compute.amazonaws.com/articles ')
    .then(res => res.json())
    .then((data) => {
      let articles = data.map((article) => {
        if (!article.title) return null;
        return article.title
      })
        this.setState({articles:articles})
        console.log(this.state.articles)
    })
    .catch(console.log);
  }

  render() {
    let filteredItems =this.state.articles.filter(
      (article) => {
        return JSON.stringify(article).indexOf(this.state.search) !== -1;
      }
    )
    console.log(filteredItems)
    return (
      <div className='wrapper'>
        <h1>A React Test</h1>
        <input 
        type='text' 
        placeholder='search' 
        value={this.state.search}
        onChange={this.updateSearch.bind(this)}
        />
        <div className="container">
          {filteredItems.map((item, i) => { 
            return item !== null ? <div className='card' key={i}>{item}</div>:null
            })}
        </div>
      </div>
    );
  }
}

export default App;

