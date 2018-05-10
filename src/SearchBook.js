import React,  {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBook extends Component {
  static propTypes = {
    listOfBooks: PropTypes.array.isRequired,
  }


  state = {
    searchQuery: ''
  }

  //as the user types, the output is updated
  updateSearchQuery = (entryValue) => {
    this.setState({ searchQuery: entryValue.trim() })
  }

  

  render() {
    console.log('Props', this.props)

    //destructing
    const {searchQuery} = this.state;
    const {listOfBooks} = this.props;



    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
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

            {searchQuery}
          </ol>
        </div>
      </div>

    )
  }

}

export default SearchBook;
