import { createAction, handleActions } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';
import * as authAPI from 'api/auth';

const SET_LOGGED_IN = 'auth/SET_LOGGED_IN';
const GET_ACCESS_TOKEN = 'auth/GET_ACCESS_TOKEN';

export const authActions = {
  setLoggedIn: createAction(SET_LOGGED_IN, payload => payload),
  getAccessToken: createAction(GET_ACCESS_TOKEN, authAPI.getAccessToken),
};

const initialState = {
  loggedIn: false,
  accessToken: null,
  username: null,
};

const reducer = handleActions(
  {
    [SET_LOGGED_IN]: (state, action) => {
      return produce(state, draft => {
        const { loggedIn } = action.payload;
        draft.loggedIn = loggedIn;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: GET_ACCESS_TOKEN,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        const {
          data: { logged, username },
        } = action.payload;
        if (logged) {
          draft.username = username;
          draft.loggedIn = logged;
        }
      });
    },
  },
]);
