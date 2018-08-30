import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import * as BooksAPI from './BooksAPI'
import { Card, Image, Rating, Accordion } from 'semantic-ui-react'


class Book extends Component {
  static propTypes = {
    aBook: PropTypes.object.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
    updateStatusFunc: PropTypes.func.isRequired,
  }

  // state = {
  //   status: this.props.aBook.shelf ? this.props.aBook.shelf : 'none'
  // }

  // this function was moved to App.js because that file is the one who holds the app state
  // updateStatus = (book, shelf ) => {
  //   BooksAPI.update(book, shelf).then( (res) => {
  //       this.setState({ status: shelf });
  //       this.props.booksOnShelvesFunc(); //calling a function from the App.js file
  //   });
  // }

  showBook = () => {
    const b = this.props.aBook; //a single book
    const status = b.shelf;
    const bookImage = b.imageLinks ? b.imageLinks.thumbnail : '';
    const rating = b.averageRating ? b.averageRating : null; //if there is no average rating, the stars are not filled
    const author = b.authors ? b.authors.join(' ') : '';
    const panels = [ //this was added so it can display the description of the book
      {
        title: 'Show description',
        content: b.description
      },
    ]

    return (
      <li key={ b.id }>
        <Card>
          <Image src={bookImage} />
          <Card.Content>
            <Card.Header>
              { b.title }
            </Card.Header>
            <Card.Meta>
              <span className='date'>
                { author }
              </span>
            </Card.Meta>
            <Card.Description >
              <Accordion panels={panels} />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <select
              // onChange={(event) => this.updateStatus(b, event.target.value)}
              onChange={(event) => this.props.updateStatusFunc(b, event.target.value)} //this function is defined in App.js
              // value={this.state.status}
              value={status}
              style={{border: "none"}}
              >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </Card.Content>
          <Card.Content >
            <div > Rating: {/*shows average rating if present in the book object */}
              <Rating icon='star' defaultRating={rating} maxRating={5} disabled />
            </div>
          </Card.Content>
        </Card>
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
