import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Header, Icon } from 'semantic-ui-react'
// import Book from './Book'
import Shelf from './Shelf'


class Bookshelves extends Component {

  static propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
    updateStatusFunc: PropTypes.func.isRequired,
  }

  render() {


    return (
      <div className="list-books">
        <div className="list-books-title">
          <Header as='h1' icon textAlign='center'>
            <Icon name='book' />
              My Reads
            <Header.Subheader>
              A Book Lending App
            </Header.Subheader>
          </Header>
        </div>

        <div className="list-books-content">
          <div>
            <Shelf
              shelfName={"currentlyReading"}
              shelfTitle={'Currently Reading'}
              listOfBooksOnShelves={this.props.listOfBooksOnShelves}
              booksOnShelvesFunc={this.props.booksOnShelvesFunc} 
              updateStatusFunc={this.props.updateStatusFunc}
            />
            <Shelf
              shelfName={"wantToRead"}
              shelfTitle={'Want to Read'}
              listOfBooksOnShelves={this.props.listOfBooksOnShelves}
              booksOnShelvesFunc={this.props.booksOnShelvesFunc} 
              updateStatusFunc={this.props.updateStatusFunc}
            />
            <Shelf
              shelfName={"read"}
              shelfTitle={'Read'}
              listOfBooksOnShelves={this.props.listOfBooksOnShelves}
              booksOnShelvesFunc={this.props.booksOnShelvesFunc} 
              updateStatusFunc={this.props.updateStatusFunc}
            />
            {/* {this.printCurReadingShelf()}
            {this.printWantToReadShelf()}
            {this.printReadShelf()} */}
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
