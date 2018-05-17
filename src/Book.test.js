import React from 'react'
import { shallow, mount } from 'enzyme'
import Book from './Book'



describe('[Component] Book', () => {

  // global.localStorage = {
  //   token: jest.fn(),
  // };
  //
  // console.log('Aqui');

  it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
  });
  // it('displays book if information is present', () => {
  //   const wrapper = shallow(
  //     <Book />
  //   );
  //   expect(wrapper.contains(children)).toEqual(true);
  // });
});
