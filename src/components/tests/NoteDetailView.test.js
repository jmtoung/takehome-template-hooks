import React from 'react';
import { mount, shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NoteDetailView from '../../views/NoteDetailView';

describe('NoteDetailView', () => {
  it('renders NotFound component if no id.', async (done) => {
    jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    const wrapper = mount(<NoteDetailView match={{ params: { id: null} }} />);


    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(wrapper.props()).toEqual(true);


    done();
  });
  // it('renders NotFound component if no id.', async () => {
  //   jest.spyOn(React, 'useEffect').mockImplementation(f => f());
  //   const wrapper = mount(<NoteDetailView match={{ params: { id: null} }} />);
  //   expect(React.useEffect).toHaveBeenCalledTimes(1);
  //   expect(toJSON(wrapper)).toMatchSnapshot();
  // });

  // it('renders properly after fetching note.', async (done) => {
  //   const mockSuccessResponse = { title: 'This is a title', body: 'This is the body.' };
  //   const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  //   const mockFetchPromise = Promise.resolve({
  //     json: () => mockJsonPromise,
  //   });
  //   jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

  //   const wrapper = shallow(<NoteDetailView match={{ params: { id: 1 } }} />);
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://5ec581652a4ba000163d2084.mockapi.io/api/v1/notes/1');

  //   process.nextTick(() => {
  //     expect(wrapper.state()).toEqual({
  //       title: 'This is a title',
  //       body: 'This is the body.',
  //       notFound: false,
  //     });
  //     expect(toJSON(wrapper)).toMatchSnapshot();
  //   });

  //   global.fetch.mockClear();
  //   done();
  // });


});