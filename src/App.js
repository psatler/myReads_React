import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Bookshelves from './Bookshelves'
import MenuExampleStackable from './semanticUI/Menu'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount(){
    this.booksOnShelves();
  }


  //getting books list on shelves from server
  booksOnShelves = () => {
    BooksAPI.getAll().then((books) => {
      // books.map( (book) => {
      //     if(book.shelf === "currentlyReading"){
      //       this.setState( { currentlyReading: [...this.state.currentlyReading, book] } )
      //     }
      //     else if (book.shelf === "wantToRead"){
      //       this.setState( { wantToRead: [...this.state.wantToRead, book] } )
      //     }
      //     else if (book.shelf === "read"){
      //       this.setState( { read: [...this.state.read, book] } )
      //     }
      // })
      this.setState({ books:books });
    })
  }


  render() {
    // console.log('Books', this.state.books);

    return (
      <div className="app">
          <MenuExampleStackable></MenuExampleStackable>
          
          <Route path="/search" render={() => (
            <SearchBook
              listOfBooksOnShelves={this.state.books}
              booksOnShelvesFunc={this.booksOnShelves}
            />
          )}/>

          <Route exact path="/" render={() => (
            <Bookshelves
              listOfBooksOnShelves={this.state.books}
              booksOnShelvesFunc={this.booksOnShelves}
            />
          )}/>


      </div>
    )
  }
}

export default BooksApp
