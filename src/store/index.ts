/* eslint-disable no-underscore-dangle */
import { createStore } from 'redux';
import reducer from './reducer';

export type IState = ReturnType<typeof reducer>;

export default () => createStore(reducer);
