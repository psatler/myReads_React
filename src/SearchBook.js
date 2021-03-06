import React,  {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
// import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import _ from 'lodash'
// import sortBy from 'sort-by'


class SearchBook extends Component {
  static propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
    updateStatusFunc: PropTypes.func.isRequired,
  }

  state = {
    searchQuery: '',
    booksDisplayed: [],
  }

  // updateShelf = (book, shelf ) => {
  //   BooksAPI.update(book, shelf) //update shelves on server
  //     .then( (res) => { //now update the UI 
  //       let bookToBeUpdated = this.state.booksDisplayed.find(b => b.id === book.id)
  //       if(bookToBeUpdated){ //if it's a book which is already on shelves
  //         bookToBeUpdated.shelf = shelf;
  //         this.setState([
  //           ...this.state.booksDisplayed,
  //           bookToBeUpdated
  //         ])
  //       } 
  //   });
  // }

  //as the user types, the output is updated
  updateSearchQuery = (query) => {
    this.setState({ //changing setState to use a callback (as setState is asynchronous), so we get the updated state always
      searchQuery: query,
    }, () => {
      this.searchBook(this.state.searchQuery)
    })
  }

  searchBook = _.debounce( (query) => {
    BooksAPI.search(query.trim())
      .then( (book) => {

        //avoiding {error: "empty query", items: Array(0)} error
        if(typeof book === 'undefined' || book.error){
          throw new Error();
        }
       //book is a list of 20 books returned that matches the query from the user
        book.map( b => {
          //for each book from the search, check if exists in the on any of the shelves already
          let bookOnShelf = this.props.listOfBooksOnShelves.find( b2 => b.id === b2.id);
          if(bookOnShelf){
            return b.shelf = bookOnShelf.shelf; //just assigning the shelf to the lists that is displayed
          }
          else {
            return b.shelf = 'none';
          }
        });
       
        this.setState({ booksDisplayed: book });
      })
      .catch( (e) => {
        console.log(e);
        this.setState( { booksDisplayed: [] });
      });
    }, 
  300); //waiting 300 ms to trigger search request


  render() {
    //destructing
    const {searchQuery, booksDisplayed} = this.state;
    // const {listOfBooksOnShelves} = this.props;

    // let onShelves;
    // let notOnShelves;
    // let finalArrayDisplayed = [];
    // //filtering the list of books already on shelves
    // if(searchQuery && searchQuery.trim()){ //using trim to avoid " " being evaluated true
    //   const match = new RegExp(escapeRegExp(searchQuery),'i');
    //   onShelves = listOfBooksOnShelves.filter((book) => match.test(book.title));

    //   //filtering those books shown on the search page that are not on shelves yet
    //   notOnShelves  = booksDisplayed.filter(function(array_el){
    //      return onShelves.filter(function(anotherOne_el){
    //         return anotherOne_el.id === array_el.id;
    //      }).length === 0;
    //   });

    //   //concatenating both list of books already on shelves with those that are not
    //   finalArrayDisplayed = [...onShelves, ...notOnShelves];
    //   finalArrayDisplayed.sort(sortBy('title'));
    // }

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
            {booksDisplayed.map( (b) => (
              <Book 
                key={b.id} 
                aBook={b} 
                booksOnShelvesFunc={this.props.booksOnShelvesFunc} 
                // updateStatusFunc={this.updateShelf} 
                updateStatusFunc={this.props.updateStatusFunc} 
              />
            ))}
          </ol>
        </div>
      </div>

    )
  }

}

export default SearchBook;
