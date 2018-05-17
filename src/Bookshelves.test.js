import React from 'react'
import { shallow, mount } from 'enzyme'
import Bookshelves from './Bookshelves'
import { bookListMock } from './testData/testData'
import { Divider, Header, Icon } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


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

  xit('mounts correctly', () => {
    expect(mount(
      <Bookshelves
        listOfBooksOnShelves={bookList}
        booksOnShelvesFunc={booksOnShelvesFunc}
      />));
  });

  //search for three classes of type bookshelf 
  it('should display three shelves', () => {
    const wrapper = shallow(<Bookshelves
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);
    expect(wrapper.find('.bookshelf').length).toBe(3);
  });


  it('should display the shelves titles', () => {
    const wrapper = shallow(<Bookshelves
        listOfBooksOnShelves={bookList}
        booksOnShelvesFunc={booksOnShelvesFunc}
      />);
    expect(wrapper.contains(
      <Divider horizontal><span className="bookshelf-title"> Currently Reading </span> </Divider>
    )).toEqual(true);
    expect(wrapper.contains(
      <Divider  horizontal><span className="bookshelf-title"> Want to Read </span></Divider>
    )).toEqual(true);
    expect(wrapper.contains(
      <Divider horizontal><span className="bookshelf-title"> Read </span></Divider>
    )).toEqual(true);
  });






});
