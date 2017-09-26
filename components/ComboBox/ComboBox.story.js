import React from 'react';
import { storiesOf, action } from '@storybook/react';
import ComboBox from './ComboBox';

storiesOf('ComboBox', module).addWithInfo('Default', `ComboBox`, () => (
  <ComboBox />
));
