import { createAction } from 'redux-actions';
import handleActions from 'redux-actions/lib/handleActions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';
import * as searchAPI from 'api/search';

const CHANGE_INPUT = 'search/CHANGE_INPUT';
const INITIALIZE = 'search/INITIALIZE';
const SEARCH_USER = 'search/SEARCH_USER';

export const searchActions = {
  changeInput: createAction(CHANGE_INPUT, payload => payload),
  initialize: createAction(INITIALIZE),
  searchUser: createAction(SEARCH_USER, searchAPI.searchUser),
};

const initialState = {
  input: '',
  user: {
    page: 1,
    perPage: 30,
    result: [],
    next: null,
    prev: null,
    last: null,
    first: null,
  },
};

const reducer = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      return produce(state, draft => {
        const { value } = action.payload;
        draft.input = value;
      });
    },
    [INITIALIZE]: (state, action) => initialState,
  },
  initialState
);

export default applyPenders(reducer, [
  {
    type: SEARCH_USER,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        console.log(action.payload.data);
      });
    },
  },
]);
