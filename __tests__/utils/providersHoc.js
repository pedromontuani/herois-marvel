import React from 'react';
import { Provider } from 'react-redux';
import store from '~/store';

export default component => <Provider store={store}>{component}</Provider>;
