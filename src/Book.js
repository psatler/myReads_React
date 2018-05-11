import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Book extends Component {
  static propTypes = {
    aBook: PropTypes.object.isRequired
  }


  showBook = () => {
    const b = this.props.aBook //a single book
    // console.log('TYPE OF',typeof b)

    const bookImage = b.imageLinks ? b.imageLinks.thumbnail : ''
    // console.log('imageLinks',b.imageLinks)

    return (
          <li key={ b.id }>
            <div className="book">
              <div className="book-top">
                <div className="book-cover"
                  style={{ width: 128, height: 193, backgroundImage:`url(${bookImage})` }}>
                </div>
                <div className="book-shelf-changer">
                  <select>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
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
