import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender/lib/utils';
import * as repoAPI from 'api/repo';

const REPO_LIST = 'repo/REPO_LIST';

export const repoActions = {
  repoList: createAction(REPO_LIST, repoAPI.repoList),
};

const initialState = {
  list: [],
};

const reducer = handleActions({}, initialState);

export default applyPenders(reducer, [
  {
    type: REPO_LIST,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        const { data: repoList } = action.payload;
        draft.list = repoList;
      });
    },
  },
]);
