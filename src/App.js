import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Bookshelves from './Bookshelves'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => { //getting book list on shelves from server
      this.setState({ books:books })
    })
  }




  render() {
    console.log('Books', this.state.books);

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook
            listOfBooksOnShelves={this.state.books}

          />
        )}/>

        <Route exact path="/" render={() => (
          <Bookshelves />
        )}/>

      </div>
    )
  }
}

export default BooksApp
