import React, { useState } from 'react';

const onSubmit = (e, createEvent, setValue) => {
  e.preventDefault();

  const formData = new window.FormData(e.currentTarget);

  if(formData.get('label') === '') return undefined;

  createEvent({
    label: formData.get('label'),
  });

  setValue('')
}

const onChange = (e, setValue) => {
  e.preventDefault();
  setValue(e.target.value);
}

const ToDoList = ({ events, createEvent }) => {
  const [value, setValue] = useState('');

  return (
    <div>
    <h1>Todos</h1>
    <ul>
    { events.map(event => (
      <li>
      {event.label} {event.duration}
      </li>
    ))}
    </ul>
    <form onSubmit={(e) => onSubmit(e, createEvent, setValue)}>
      <input type="text" name="label" value={value} onChange={(e) => onChange(e, setValue)} />
    </form>
    </div>
  )
}

export default ToDoList;
