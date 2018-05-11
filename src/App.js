import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Bookshelves from './Bookshelves'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    wantToRead: [],
    currentlyReading: [],
    read: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => { //getting books list on shelves from server
      books.map( (book) => {
          if(book.shelf === "currentlyReading"){
            this.setState( { currentlyReading: [...this.state.currentlyReading, book] } )
          }
          else if (book.shelf === "wantToRead"){
            this.setState( { wantToRead: [...this.state.wantToRead, book] } )
          }
          else if (book.shelf === "read"){
            this.setState( { read: [...this.state.read, book] } )
          }
      })
      this.setState({ books:books })
    })


  }

  render() {
    console.log('Books', this.state.books);
    console.log('currentlyReading', this.state.currentlyReading)
    console.log('wantToRead', this.state.wantToRead)
    console.log('read', this.state.read)

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBook
            listOfBooksOnShelves={this.state.books}

          />
        )}/>

        <Route exact path="/" render={() => (
          <Bookshelves
            listOfBooksOnShelves={this.state.books}
            listOfBookWantToRead={this.state.wantToRead}
            listOfBookCurrentlyReading={this.state.currentlyReading}
            listOfBookRead={this.state.read}
          />
        )}/>

      </div>
    )
  }
}

export default BooksApp
