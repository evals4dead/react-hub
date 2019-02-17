import auth from './auth';
import user from './user';
import {penderReducer} from 'redux-pender';

export default {
    auth,
    user,
    pender: penderReducer
}