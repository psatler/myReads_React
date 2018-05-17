import React from 'react'
import { shallow, mount } from 'enzyme'
import Bookshelves from './Bookshelves'
import { bookListMock } from './testData/testData'


const booksOnShelvesFunc = jest.fn();
const bookList = bookListMock;

describe('[Component] Bookshelves', () => {

  it('shallow renders correctly', () => {

    expect(shallow(
      <Bookshelves
        listOfBooksOnShelves={bookList}
        booksOnShelvesFunc={booksOnShelvesFunc}
      />));
  });

  
});
