import React from 'react';
import Note from '../Note';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('Note', () => {
  it('renders note correctly.', () => {
    const wrapper = shallow(<Note />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('calls delete function when delete button is clicked.', () => {
    const deleteFunc = jest.fn();
    const wrapper = shallow(<Note deleteNote={deleteFunc} />);
    wrapper
      .find('.delete')
      .simulate('click');
    expect(deleteFunc).toHaveBeenCalledTimes(1);
  });

  it('calls updateView function and view is updated.', () => {
    const wrapper = shallow(<Note
      id="1"
      title='This is a title'
      body='This is the body.'
    />);
    const updateView = jest.spyOn(wrapper.instance(), 'updateView');

    expect(wrapper.state()).toEqual({ // State of component before click.
      id: '1',
      title: 'This is a title',
      body: 'This is the body.',
      isUpdating: false,
    });

    wrapper.find('.update-view').simulate('click');

    expect(updateView).toHaveBeenCalledTimes(1);
    expect(wrapper.state()).toEqual({ // State of component after click.
      id: '1',
      title: 'This is a title',
      body: 'This is the body.',
      isUpdating: true,
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('calls on api to update note when submit is called.', (done) => {
    const mockSuccessResponse = {id: '1', title: 'This is the updated title', body: 'This is the updated body.'};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    const wrapper = shallow(<Note id='1'/>);
    var submitEvent = new Event('submit');
    wrapper.instance().handleSubmit(submitEvent);


    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://5ec581652a4ba000163d2084.mockapi.io/api/v1/notes/1", {"body": "{}", "headers": {"Content-Type": "application/json"}, "method": "PUT"});

    process.nextTick(() => {
      expect(wrapper.state()).toEqual({
        id: '1',
        title: 'This is the updated title',
        body: 'This is the updated body.',
        isUpdating: true
      });
    });

    global.fetch.mockClear();
    done();
  });

});