import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'


class Book extends Component {
  static propTypes = {
    aBook: PropTypes.object.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
  }

  state = {
    status: this.props.aBook.shelf ? this.props.aBook.shelf : 'none1'
  }


  updateStatus = (book, shelf) => {
    // console.log('Event Update Status', shelf);
    BooksAPI.update(book, shelf).then( (res) => {
        this.setState({ status: shelf });
        this.props.booksOnShelvesFunc(); //calling a function from the App.js file
    });
  }


  showBook = () => {
    const b = this.props.aBook; //a single book
    const bookImage = b.imageLinks ? b.imageLinks.thumbnail : '';

    return (
          <li key={ b.id }>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage:`url(${bookImage})` }}>
                </div>
                <div className="book-shelf-changer">
                  <select
                    onChange={(event) => this.updateStatus(b, event.target.value)}
                    value={this.state.status}
                    >
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none1">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title"> { b.title } </div>
              <div className="book-authors"> { b.authors} </div>
            </div>
          </li>
      )
  }


  render() {

    return (
      <div>
        {this.showBook()}
      </div>
    )
  }
}

export default Book;
