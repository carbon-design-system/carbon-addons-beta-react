import React from 'react';
import { storiesOf, action } from '@storybook/react';
import Typeahead from './Typeahead';

const items = [
  {
    label: 'Apple',
    value: 'apple',
  },
  {
    label: 'Banana',
    value: 'banana',
  },
  {
    label: 'Oranges',
    value: 'oranges',
  },
  {
    label: 'Pear',
    value: 'pear',
  },
  {
    label: 'Peanut',
    value: 'peanut',
  },
  {
    label: 'Watermelon',
    value: 'watermelon',
  },
];

const onChange = evt => {
  console.log(evt);
};

storiesOf('Typeahead', module).addWithInfo('Default', `Typeahead`, () => (
  <Typeahead id="test" onChange={onChange} items={items} />
));
