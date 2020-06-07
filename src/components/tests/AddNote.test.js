import React from 'react';
import AddNote from '../AddNote';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';

describe('AddNote', () => {
  it('renders addNote button view correctly.', () => {
    const wrapper = shallow(<AddNote />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('calls updateAddNoteView and displays form view.', () => {
    const wrapper = shallow(<AddNote />);
    const changeView = jest.spyOn(wrapper.instance(), 'updateAddNoteView');

    wrapper.find('.create-note').simulate('click');

    expect(changeView).toHaveBeenCalledTimes(1);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('updates state when handleChange is called.', () =>  {
    const wrapper = shallow(<AddNote />);

    const handleChange = jest.spyOn(wrapper.instance(), 'handleChange');

    const form = document.createElement('form');
    const input = document.createElement('input');
    form.appendChild(input);
    input.onchange = handleChange.bind(wrapper);
    input.value = 'This is the title';
    input.name = 'title';

    const event = new Event('change');
    input.dispatchEvent(event);

    expect(handleChange).toHaveBeenCalledTimes(1);

    expect(wrapper.state()).toEqual({
      title: 'This is the title',
      body: '',
      isCreating: false
    });

  });

  it('sends new note to api when form is submitted.', (done) => {
    const wrapper = shallow(<AddNote />);
    wrapper.find('.create-note').simulate('click');
    wrapper.setState({title: 'title', body: 'body'});

    const mockSuccessResponse = {id: '1', title: 'This is the created title', body: 'This is the created body.'};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);


    var submitEvent = new Event('submit');
    wrapper.instance().handleSubmit(submitEvent);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://5ec581652a4ba000163d2084.mockapi.io/api/v1/notes", {"body": "{\"title\":\"title\",\"body\":\"body\"}", "headers": {"Content-Type": "application/json"}, "method": "POST"});

    process.nextTick(() => { // after note is created, state is reset.
      expect(wrapper.state()).toEqual({
        title: '',
        body: '',
        isCreating: false
      });
    });

    global.fetch.mockClear();
    done();
  });

});
