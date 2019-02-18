import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender/lib/utils';
import * as repoAPI from 'api/repo';

const REPO_LIST = 'repo/REPO_LIST';
const CLICK_PER_PAGE = 'repo/CLICK_PER_PAGE';
const SELECT_PER_PAGE = 'repo/SELECT_PER_PAGE';
const SET_PAGE = 'repo/SET_PAGE';

export const repoActions = {
  repoList: createAction(REPO_LIST, repoAPI.repoList),
  clickPerPage: createAction(CLICK_PER_PAGE, payload => payload),
  selectPerPage: createAction(SELECT_PER_PAGE, payload => payload),
  setPage: createAction(SET_PAGE, payload => payload),
};

const initialState = {
  list: [],
  pagingInfo: {
    currentPage: 1,
    perPage: {
      visible: 10,
      clicked: false,
    },
  },
};

const reducer = handleActions(
  {
    [CLICK_PER_PAGE]: (state, action) => {
      return produce(state, draft => {
        const { clicked } = action.payload;
        draft.pagingInfo.perPage.clicked = clicked;
      });
    },
    [SELECT_PER_PAGE]: (state, action) => {
      return produce(state, draft => {
        const { perPage } = action.payload;
        draft.pagingInfo.perPage.visible = perPage;
        draft.pagingInfo.perPage.clicked = false;
      });
    },
    [SET_PAGE]: (state, action) => {
      return produce(state, draft => {
        const { page } = action.payload;
        draft.pagingInfo.currentPage = page;
      });
    },
  },
  initialState
);

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
