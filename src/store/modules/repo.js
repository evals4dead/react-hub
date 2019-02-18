import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender/lib/utils';
import * as repoAPI from 'api/repo';

const REPO_LIST = 'repo/REPO_LIST';
const HOVER_PER_PAGE = 'repo/HOVER_PER_PAGE';
const SELECT_PER_PAGE = 'repo/SELECT_PER_PAGE';
const NEXT_REPO_LIST = 'repo/NEXT_REPO_LIST';

export const repoActions = {
  repoList: createAction(REPO_LIST, repoAPI.repoList),
  hoverPerPage: createAction(HOVER_PER_PAGE, payload => payload),
  selectPerPage: createAction(SELECT_PER_PAGE, payload => payload),
  nextRepoList: createAction(NEXT_REPO_LIST, repoAPI.repoList),
};

const initialState = {
  list: [],
  pagingInfo: {
    currentPage: 1,
    perPage: {
      visible: 10,
      hovered: false,
    },
  },
  nextList: [],
};

const reducer = handleActions(
  {
    [HOVER_PER_PAGE]: (state, action) => {
      return produce(state, draft => {
        const { hovered } = action.payload;
        draft.pagingInfo.perPage.hovered = hovered;
      });
    },
    [SELECT_PER_PAGE]: (state, action) => {
      return produce(state, draft => {
        const { perPage } = action.payload;
        draft.pagingInfo.perPage.visible = perPage;
        draft.pagingInfo.perPage.hovered = false;
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
        draft.pagingInfo.currentPage += 1;
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
