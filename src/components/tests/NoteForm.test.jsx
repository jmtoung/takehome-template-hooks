import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import NoteForm from '../NoteForm';

describe('NoteForm', () => {
  it('renders noteForm component correctly.', async () => {
    const wrapper = shallow(<NoteForm
      title="Testing Title"
      body="Testing Body"
      text="Testing"
      handleChange={jest.fn}
      handleSubmit={jest.fn}
    />);

    expect(toJSON(wrapper)).toMatchSnapshot();

  });

  it('calls handleSubmit when form is submitted.', () => {
    const onSubmitFn = jest.fn();
    const wrapper = shallow(<NoteForm handleSubmit={onSubmitFn} />);
    const form = wrapper.find('Form');
    form.simulate('submit');
    expect(onSubmitFn).toHaveBeenCalledTimes(1);
  });
  
  it('calls handleChange when title input is changed.', () => {
    const onChangeFn = jest.fn();
    const wrapper = shallow(<NoteForm handleChange={onChangeFn} />);
    const input = wrapper.find('.title-input');
    input.simulate('change');
    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });
  
  it('calls handleChange when body input is changed.', () => {
    const onChangeFn = jest.fn();
    const wrapper = shallow(<NoteForm handleChange={onChangeFn} />);
    const input = wrapper.find('.body-input');
    input.simulate('change');
    expect(onChangeFn).toHaveBeenCalledTimes(1);
  });
});