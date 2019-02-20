import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender/lib/utils';

const OPEN_MODAL = 'base/OPEN_MODAL';
const HIDE_MODAL = 'base/HIDE_MODAL';

export const baseActions = {
  openModal: createAction(OPEN_MODAL, payload => payload),
  hideModal: createAction(HIDE_MODAL, payload => payload),
};

const initialState = {
  modal: {
    visible: {
      search: false,
    },
  },
};

const reducer = handleActions(
  {
    [OPEN_MODAL]: (state, action) => {
      return produce(state, draft => {
        const { name } = action.payload;
        draft.modal.visible[name] = true;
      });
    },
    [HIDE_MODAL]: (state, action) => {
      return produce(state, draft => {
        const { name } = action.payload;
        draft.modal.visible[name] = false;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, []);
