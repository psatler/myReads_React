import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelves extends Component {

  static propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    listOfBookWantToRead: PropTypes.array.isRequired,
    listOfBookCurrentlyReading: PropTypes.array.isRequired,
    listOfBookRead: PropTypes.array.isRequired,
  }

  printCurReadingShelf = () => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.listOfBookCurrentlyReading.map( (b) => (
              <Book key={b.id} aBook={b} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
  printWantToReadShelf = () => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.listOfBookWantToRead.map( (b) => (
              <Book key={b.id} aBook={b} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
  printReadShelf = () => {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.listOfBookRead.map( (b) => (
              <Book key={b.id} aBook={b} />
            ))}
          </ol>
        </div>
      </div>
    )
  }



  render() {


    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.printCurReadingShelf()}
            {this.printWantToReadShelf()}
            {this.printReadShelf()}
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }


}

export default Bookshelves;
