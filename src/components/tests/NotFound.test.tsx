import React from 'react';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { NotFound } from '../NotFound';

describe('NotFound', () => {
  it('renders NotFound component correctly.', async () => {
    const wrapper = shallow(<NotFound />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});