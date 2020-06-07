// import React from 'react';
// import Notes from '../Notes';
// import { shallow } from 'enzyme';
// import toJSON from 'enzyme-to-json';

// const data = {
//   total: 3,
//   notes: [
//     {id: 1, title: 'title1', body: 'body1'},
//     {id: 2, title: 'title2', body: 'body2'},
//     {id: 3, title: 'title3', body: 'body3'}
//   ]
// };

// describe('Notes', () => {
//   it('displays notes from state', () => {
//     const wrapper = shallow(<Notes page='1' />);
//     wrapper.setState(data);
//     expect(toJSON(wrapper)).toMatchSnapshot();
//   });

//   it('gets notes from api.', async (done) => {
//     const mockSuccessResponse = data;
//     const mockJsonPromise = Promise.resolve(mockSuccessResponse);
//     const mockFetchPromise = Promise.resolve({
//       json: () => mockJsonPromise,
//     });
//     jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

//     const wrapper = shallow(<Notes page='1' />);
//     expect(wrapper.state()).toEqual({
//       total: 0,
//       page: "1",
//       notes: []
//     });

//     expect(global.fetch).toHaveBeenCalledTimes(1);
//     expect(global.fetch).toHaveBeenCalledWith('https://5ec581652a4ba000163d2084.mockapi.io/api/v1/notes?page=1&limit=10');

//     process.nextTick(() => {
//       expect(wrapper.state()).toEqual({
//         total: 3,
//         page: "1",
//         notes: [
//           {id: 1, title: 'title1', body: 'body1'},
//           {id: 2, title: 'title2', body: 'body2'},
//           {id: 3, title: 'title3', body: 'body3'}
//         ]
//       });
//     });

//     global.fetch.mockClear();
//     done();
//   });
// });