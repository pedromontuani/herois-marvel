import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import {
  rightPassword,
  rigthEmail,
  wrongEmails,
  wrongPassword
} from '../__mocks__/screens/SignInScreen.mock';
import { mockDispatch } from '../__mocks__/libs/ReactRedux.mock';
import SignInScreen from '~/screens/SignIn';
import providersHoc from '../utils/providersHoc';

describe('SignInScreen', () => {
  it('should render correctly', () => {
    const screen = providersHoc(<SignInScreen />);
    const rendered = renderer.create(screen).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('should not submit with wrong email and right password', async () => {
    const screen = providersHoc(<SignInScreen />);
    const { getByTestId } = render(screen);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(passwordInput, rightPassword);
    for await (const key of Object.keys(wrongEmails)) {
      fireEvent.changeText(emailInput, wrongEmails[key]);
      fireEvent.press(submitButton);
      await waitFor(() => expect(mockDispatch).not.toHaveBeenCalled());
    }
  });

  it('should not submit with right email and wrong password', async () => {
    const screen = providersHoc(<SignInScreen />);
    const { getByTestId } = render(screen);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(emailInput, rigthEmail);
    fireEvent.changeText(passwordInput, wrongPassword);
    fireEvent.press(submitButton);
    await waitFor(() => expect(mockDispatch).not.toHaveBeenCalled());
  });

  it('should submit with right email and password', async () => {
    const screen = providersHoc(<SignInScreen />);
    const { getByTestId } = render(screen);

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const submitButton = getByTestId('submit-button');

    fireEvent.changeText(emailInput, rigthEmail);
    fireEvent.changeText(passwordInput, rightPassword);
    fireEvent.press(submitButton);
    await waitFor(() => expect(mockDispatch).toHaveBeenCalled());
  });
});
