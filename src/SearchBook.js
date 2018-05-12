import React,  {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
// import sortBy from 'sort-by'

class SearchBook extends Component {
  static propTypes = {
    // listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
  }

  state = {
    searchQuery: '',
    booksDisplayed: [],
  }

  //as the user types, the output is updated
  updateSearchQuery = (query) => {
    this.setState({ searchQuery: query })
    this.searchBook(query)
  }

  searchBook = (bookName) => {
    BooksAPI.search(bookName)
      .then( (book) => {
        console.log('BOOK', book)
        console.log('bookName', bookName)
        if(typeof book === 'undefined' || book.error){
          throw 'Undefined or Error'
        }

        this.setState({ booksDisplayed: book })
        // this.props.booksOnShelvesFunc();
        // if(book.error || book.length === 0 ){
        //   this.setState( { booksDisplayed: [] })
        // }

      })
      .catch( (e) => {
        console.log(e);
        console.log("Saida", this.state.booksDisplayed);
        this.setState( { booksDisplayed: [] })
      });
  };



  render() {
    // console.log('Props', this.props)

    //destructing
    const {searchQuery, booksDisplayed} = this.state;
    const {listOfBooksOnShelves} = this.props;

    //filtering the list of books
    // let filteredList;
    // if(searchQuery){
    //   const match = new RegExp(escapeRegExp(searchQuery),'i')
    //   filteredList = listOfBooksOnShelves.filter((book) => match.test(book.title))
    // }
    // console.log('filteredList', filteredList)
    console.log('booksDisplayed', booksDisplayed)



    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => this.updateSearchQuery(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksDisplayed.map( (b) => (
              <Book key={b.id} aBook={b} booksOnShelvesFunc={this.props.booksOnShelvesFunc} />
            ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default SearchBook;
