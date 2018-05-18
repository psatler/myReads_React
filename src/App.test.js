import React from 'react'
// import ReactDOM from 'react-dom'
import App from './App'
import {shallow, mount } from 'enzyme'
import {Link, Router, MemoryRouter} from 'react-router-dom'
import { bookListMock } from './testData/testData'
import SearchBook from './SearchBook'

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/

// xit('renders without crashing', () => {
//   const div = document.createElement('div')
//   ReactDOM.render(<App />, div)
// })

const bookList = bookListMock;
const booksOnShelves = jest.fn();


describe('[Component] App', () => {
  it('shallow renders correctly', () => {
      expect(shallow(<App />));
  });

  it('mounts correctly', () => {
    expect(mount(
      <MemoryRouter>
        <App />
      </MemoryRouter>
      ));
  });

  it('checks initial state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().books.length).toEqual(0);
  });

  it('renders the app structure', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.app').length).toBe(1);
  });


  it("renders search page", () => {
    const wrapper = shallow(
      //simulating we are going the /search page
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
      );
    // wrapper.find(<Router />).props('history');
    // expect(wrapper.find(<SearchBook />)).toHaveLength(1);
    expect(wrapper.contains(
      <SearchBook
        listOfBooksOnShelves={bookList}
        booksOnShelvesFunc={booksOnShelves}
      />
    )).toBe(true);


  });

  xit('returns the list of books on shelves', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state('books').length).toEqual(0);
    wrapper.instance().booksOnShelves(); //fetch list of books on shelves
    // wrapper.setState({books: bookList});
    expect(wrapper.state().books.length > 0).toBeTruthy();
  });

});
