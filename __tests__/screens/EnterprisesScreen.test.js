import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import EnterprisesScreen from '~/screens/EnterprisesScreen/';
import providersHoc from '../utils/providersHoc';

jest.useFakeTimers();

describe('EnterprisesScreen', () => {
  it('should render correctly', () => {
    const screen = providersHoc(<EnterprisesScreen />);
    const rendered = renderer.create(screen).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
