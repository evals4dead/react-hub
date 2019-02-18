import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender/lib/utils';
import * as repoAPI from 'api/repo';

const REPO_LIST = 'repo/REPO_LIST';
const CLICK_PER_PAGE = 'repo/CLICK_PER_PAGE';
const SELECT_PER_PAGE = 'repo/SELECT_PER_PAGE';
const SET_PAGE = 'repo/SET_PAGE';
const NEXT_REPO_LIST = 'repo/NEXT_REPO_LIST';
const SHOW_NEXT_REPO_LIST = 'repo/SHOW_NEXT_REPO_LIST';

export const repoActions = {
  repoList: createAction(REPO_LIST, repoAPI.repoList),
  clickPerPage: createAction(CLICK_PER_PAGE, payload => payload),
  selectPerPage: createAction(SELECT_PER_PAGE, payload => payload),
  setPage: createAction(SET_PAGE, payload => payload),
  nextRepoList: createAction(NEXT_REPO_LIST, repoAPI.repoList),
  showNextRepoList: createAction(SHOW_NEXT_REPO_LIST, payload => payload),
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
  nextList: [],
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
    [SHOW_NEXT_REPO_LIST]: (state, action) => {
      return produce(state, draft => {
        const { nextList } = action.payload;
        draft.list = nextList;
        draft.nextList = [];
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
  {
    type: NEXT_REPO_LIST,
    onSuccess: (state, action) => {
      return produce(state, draft => {
        const { data: repoList } = action.payload;
        draft.nextList = repoList;
      });
    },
  },
]);
