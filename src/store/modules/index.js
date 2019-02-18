import auth from './auth';
import user from './user';
import repo from './repo';
import { penderReducer } from 'redux-pender';

export default {
  auth,
  user,
  repo,
  pender: penderReducer,
};
