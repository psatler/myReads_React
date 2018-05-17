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


  render() {
    console.log('Books: ', this.state.books)

    return (
      <div className="app">
        <Container>
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
        </Container>

      </div>
    )
  }
}

export default BooksApp
