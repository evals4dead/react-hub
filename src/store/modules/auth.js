import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';
import * as authAPI from 'api/auth';

const GET_ACCESS_TOKEN = 'auth/GET_ACCESS_TOKEN';
const LOGOUT = 'auth/LOGOUT';

export const authActions = {
  getAccessToken: createAction(GET_ACCESS_TOKEN, authAPI.getAccessToken),
  logout: createAction(LOGOUT, authAPI.logout)
};

const initialState = {
  loggedIn: false,
  accessToken: null,
  username: null,
  loggedOut: false
};

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: GET_ACCESS_TOKEN,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        const {
          data: { logged, username, accessToken },
        } = action.payload;
        if (logged) {
          draft.username = username;
          draft.accessToken = accessToken;
          draft.loggedIn = logged;
        }
      });
    },
  },
  {
    type: LOGOUT,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        draft.loggedOut = true;
      });
    }
  }
]);
