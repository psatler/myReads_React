import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Bookshelves from './Bookshelves'
import { Container } from 'semantic-ui-react'
import MenuExampleStackable from './semanticUI/Menu'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: [],
  }

  componentDidMount(){
    this.booksOnShelves();
  }


  //getting the list of books on shelves from server
  booksOnShelves = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books:books });
    })
  }

  //it updates the book shelf, switching one book from one shelf to another
  updateStatus = (book, shelf ) => {
    BooksAPI.update(book, shelf) //update shelves on server
      .then( (res) => { //now update the UI 
        let bookToBeUpdated = this.state.books.find(b => b.id === book.id)
        if(bookToBeUpdated){ //if it's a book which is already on shelves
          bookToBeUpdated.shelf = shelf;
          this.setState([
            ...this.state.books,
            bookToBeUpdated
          ])
        } 
        else { //if the book is not on any shelf yet
          book.shelf = shelf;
          this.setState([
            ...this.state.books,
            book
          ])
        }
    });
  }


  render() {

    return (
      <div className="app">
        <Container>
          <MenuExampleStackable></MenuExampleStackable>

          <Route path="/search" render={() => (
            <SearchBook
              listOfBooksOnShelves={this.state.books}
              booksOnShelvesFunc={this.booksOnShelves}
              updateStatusFunc={this.updateStatus}
            />
          )}/>

          <Route exact path="/" render={() => (
            <Bookshelves
              listOfBooksOnShelves={this.state.books}
              booksOnShelvesFunc={this.booksOnShelves}
              updateStatusFunc={this.updateStatus}
            />
          )}/>
        </Container>

      </div>
    )
  }
}

export default BooksApp
