import auth from './auth';
import user from './user';
import repo from './repo';
import base from './base';
import { penderReducer } from 'redux-pender';

export default {
  base,
  auth,
  user,
  repo,
  pender: penderReducer,
};
