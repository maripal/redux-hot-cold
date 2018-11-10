import React from 'react';
import { shallow } from 'enzyme';

import {GuessList} from './guess-list';

describe('<GuessList />', () => {
  it('Renders without crashing', () => {
    shallow(<GuessList guesses={[]} />);
  });
});