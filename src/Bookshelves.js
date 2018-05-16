import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Divider, Header, Icon, Image } from 'semantic-ui-react'
import Book from './Book'


class Bookshelves extends Component {

  static propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
  }

  printCurReadingShelf = () => {
    const currentlyReading = this.props.listOfBooksOnShelves.filter(b => b.shelf === "currentlyReading")
    return (
      <div className="bookshelf">
        {/* <h2 className="bookshelf-title">Currently Reading</h2> */}
        <Divider horizontal><span className="bookshelf-title"> Currently Reading </span> </Divider>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {currentlyReading.map( (b) => (
              <Book key={b.id} aBook={b} booksOnShelvesFunc={this.props.booksOnShelvesFunc} />
              ))}
          </ol>
        </div>
      </div>
    )
  };

  printWantToReadShelf = () => {
    const wantToRead = this.props.listOfBooksOnShelves.filter(b => b.shelf === "wantToRead")
    return (
      <div className="bookshelf">
        {/* <h2 className="bookshelf-title">Want to Read</h2> */}
        <Divider  horizontal><span className="bookshelf-title"> Want to Read </span></Divider>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {wantToRead.map( (b) => (
              <Book key={b.id} aBook={b} booksOnShelvesFunc={this.props.booksOnShelvesFunc} />
              ))}
          </ol>
        </div>
      </div>
    )
  };

  printReadShelf = () => {
    const read = this.props.listOfBooksOnShelves.filter(b => b.shelf === "read")
    return (
      <div className="bookshelf">
        {/* <h2 className="bookshelf-title">Read</h2> */}
        <Divider horizontal><span className="bookshelf-title"> Read </span></Divider>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {read.map( (b) => (
              <Book key={b.id} aBook={b} booksOnShelvesFunc={this.props.booksOnShelvesFunc} />
              ))}
          </ol>
        </div>
      </div>
    )
  };


  render() {


    return (
      <div className="list-books">
        <div className="list-books-title">
          {/* <h1>MyReads</h1> */}
          <Header as='h2' icon textAligh='center'>
            <Icon name='book' />
            My Reads
          </Header>
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
