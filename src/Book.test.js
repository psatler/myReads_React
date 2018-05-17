import React from 'react'
import { shallow, mount } from 'enzyme'
import Book from './Book'
import { Card, Image, Rating, Accordion } from 'semantic-ui-react'
// import * as BooksAPI from './BooksAPI'
import { bookListMock } from './testData/testData'

const bookMock = bookListMock
const booksOnShelves = jest.fn();

describe('[Component] Book', () => {

  it('shallow renders correctly', () => {
    expect(shallow(<Book aBook={bookMock[0]} booksOnShelvesFunc={booksOnShelves} />));
  });

  it('should display an image of the book', () => {
    const wrapper = shallow(<Book aBook={bookMock[0]} booksOnShelvesFunc={booksOnShelves} />);
		expect(
			wrapper.containsMatchingElement(<Image src={bookMock[0].imageLinks.thumbnail} />)
		).toBe(true);
	});

  it("should have book's name displayed if present", () => {
    const wrapper = shallow(<Book aBook={bookMock[1]} booksOnShelvesFunc={booksOnShelves} />);
    expect(wrapper.contains(<Card.Header>{bookMock[1].title}</Card.Header>)).toEqual(true);
  });

  it("should display author's name", () => {
    const wrapper = shallow(<Book aBook={bookMock[1]} booksOnShelvesFunc={booksOnShelves} />);
    expect(wrapper.find('span').text()).toBe(bookMock[1].authors.join(' '));
  });

  it("should display book's description", () => {
    const wrapper = shallow(<Book aBook={bookMock[2]} booksOnShelvesFunc={booksOnShelves} />);
    expect(
      wrapper.contains(
        <Card.Description >
          <Accordion panels={[{
            title: 'Show description',
            content: bookMock[2].description
          }]} />
        </Card.Description>)).toEqual(true);
  });

  it("should display book's rating", () => {
    const wrapper = shallow(<Book aBook={bookMock[1]} booksOnShelvesFunc={booksOnShelves} />);
    const rating = bookMock[1].averageRating ? bookMock[1].averageRating : null;
    expect(
			wrapper.containsMatchingElement(
        <Rating icon='star' defaultRating={rating} maxRating={5} disabled />)
		).toBe(true);
  });


  it('should display a select tag to select shelf', () => {
    const wrapper = shallow(<Book aBook={bookMock[0]} booksOnShelvesFunc={booksOnShelves} />);
    expect(wrapper.find('select').length).toBe(1);
  });

  //#################
  //testing the select tag so if the user changes the shelf, it will work as intended
  xit('calls updateStatus when select tag has its value changed', () => {

    const wrapper = mount(
      <Book
        aBook={bookMock[0]} booksOnShelvesFunc={booksOnShelves}
      />
    );

    //before changing states
    expect(wrapper.state('status')).toBe(bookMock[0].shelf);
    wrapper.instance().updateStatus(bookMock[0], 'wantToRead'); //from currentlyReading to wantToRead
    expect(wrapper.state('status')).toBe('wantToRead'); //expect new state

    // const updateStatus = jest.fn();
    // wrapper.find('select').simulate('change', { target: { value: 'read' } });
    // expect(updateStatus).toHaveBeenCalledTimes(1);
  });


});
