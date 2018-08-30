import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'semantic-ui-react'
import Book from './Book'

const Shelf = (props) => {
    const shelfArray = props.listOfBooksOnShelves.filter(b => b.shelf === props.shelfName);
    return (
      <div className="bookshelf">
        <Divider horizontal><span className="bookshelf-title"> { props.shelfTitle } </span> </Divider>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {shelfArray.map( (b) => (
              <Book 
                key={b.id} 
                aBook={b} 
                booksOnShelvesFunc={props.booksOnShelvesFunc} 
                updateStatusFunc={props.updateStatusFunc} 
              />
              ))}
          </ol>
        </div>
      </div>
    )
}

Shelf.propTypes = {
    listOfBooksOnShelves: PropTypes.array.isRequired,
    booksOnShelvesFunc: PropTypes.func.isRequired,
    updateStatusFunc: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelfTitle: PropTypes.string.isRequired,
}


export default Shelf;

