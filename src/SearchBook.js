import React,  {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'


class SearchBook extends Component {
  static propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
  }

  state = {
    searchQuery: '',
    booksDisplayed: [],
  }

  //as the user types, the output is updated
  updateSearchQuery = (query) => {
    this.setState({ searchQuery: query });
    this.searchBook(query);
  }

  searchBook = (query) => {
    BooksAPI.search(query)
      .then( (book) => {

        //avoiding {error: "empty query", items: Array(0)} error
        if(typeof book === 'undefined' || book.error){
          throw new Error();
        }
        this.setState({ booksDisplayed: book });
      })
      .catch( (e) => {
        console.log(e);
        this.setState( { booksDisplayed: [] });
      });
  };


  render() {
    //destructing
    const {searchQuery, booksDisplayed} = this.state;
    const {listOfBooksOnShelves} = this.props;

    let onShelves;
    let notOnShelves;
    let finalArrayDisplayed = [];
    //filtering the list of books already on shelves
    if(searchQuery && searchQuery.trim()){ //using trim to avoid " " being evaluated true
      const match = new RegExp(escapeRegExp(searchQuery),'i');
      onShelves = listOfBooksOnShelves.filter((book) => match.test(book.title));

      //filtering those books shown on the search page that are not on shelves yet
      notOnShelves  = booksDisplayed.filter(function(array_el){
         return onShelves.filter(function(anotherOne_el){
            return anotherOne_el.id === array_el.id;
         }).length === 0;
      });

      //concatenating both list of books already on shelves with those that are not
      finalArrayDisplayed = [...onShelves, ...notOnShelves];
      finalArrayDisplayed.sort(sortBy('title'));
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
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
            {finalArrayDisplayed.map( (b) => (
              <Book key={b.id} aBook={b} booksOnShelvesFunc={this.props.booksOnShelvesFunc} />
            ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default SearchBook;
