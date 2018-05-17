import React from 'react'
import { shallow, mount } from 'enzyme'
import SearchBook  from './SearchBook'
import { bookListMock } from './testData/testData'
import {Link, MemoryRouter} from 'react-router-dom'


const booksOnShelvesFunc = jest.fn();
const bookList = bookListMock;

describe('[Component] SearchBook', () => {

  it('shallow renders correctly', () => {
    expect(shallow(
      <SearchBook
        listOfBooksOnShelves={bookList}
        booksOnShelvesFunc={booksOnShelvesFunc}
      />));
  });

  //when testing with mount, had to surround the component being tested with
  //MemoryRouter so it won't complain about Link and Context issues
  it('mounts correctly', () => {
    expect(mount(
      <MemoryRouter>
        <SearchBook
          listOfBooksOnShelves={bookList}
          booksOnShelvesFunc={booksOnShelvesFunc}
        />
      </MemoryRouter>
      ));
  });

  //looking for the div class that renders the search input field
  it('renders a search field', () => {
    const wrapper = shallow(<SearchBook
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);
    expect(wrapper.find('.search-books').length).toBe(1);
  });


  it('renders a field to display the books found (that matches the query)', () => {
    const wrapper = shallow(<SearchBook
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);
    expect(wrapper.find('.search-books-results').length).toBe(1);
  });

  it('changes the current state as the user types the query', () => {
    const wrapper = shallow(<SearchBook
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);
    // fetch.mockResponse(JSON.stringify(bookList), new Headers({
    //       	Accept: 'application/json',
    //       	'Content-Type': 'application/json'
    //       }));
    expect(wrapper.state('searchQuery')).toBe('');
    wrapper.instance().updateSearchQuery('Android');
    expect(wrapper.state('searchQuery')).toEqual('Android');

  });


//##############################
  xit('renders the list of books based on the query inserted by user', () => {
    const wrapper = shallow(<SearchBook
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);

    expect(wrapper.state('booksDisplayed').length).toBe(0);
    wrapper.instance().searchBook('Android');

    return Promise.resolve()
        .then(() => {
            wrapper.update();
            expect(wrapper.state('booksDisplayed').length).toBe(20);
        });
  });

  xit('renders the list of books based on the query inserted by user', () => {
    const wrapper = shallow(<SearchBook
      listOfBooksOnShelves={bookList}
      booksOnShelvesFunc={booksOnShelvesFunc}
    />);

    const updateSearchQuery = jest.fn();
    wrapper.find('input').simulate('change', { target: { value: 'Literary' } });
    // expect(updateSearchQuery).toHaveBeenCalledTimes(1);

    return Promise.resolve()
        .then(() => {
            wrapper.update();
            expect(updateSearchQuery).toHaveBeenCalledTimes(1);
        });

    // fetch.mockResponse(JSON.stringify(bookList), new Headers({
    //       	Accept: 'application/json',
    //       	'Content-Type': 'application/json'
    //       }));


    // expect(wrapper.state('booksDisplayed').length).toBe(0);
    // wrapper.instance().searchBook('Android');
    // // console.log(wrapper.debug());
    // expect(wrapper.state('booksDisplayed').length).toBe(20);
  // })

  });

});
