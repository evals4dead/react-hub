import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { applyPenders } from 'redux-pender';

const SET_SHOULD_CANCEL = 'base/SET_SHOULD_CANCEL';

export const baseActions = {
  setShouldCancel: createAction(SET_SHOULD_CANCEL, payload => payload),
};

const initialState = {
  shouldCancel: true,
};

const reducer = handleActions(
  {
    [SET_SHOULD_CANCEL]: (state, action) => {
      return produce(state, draft => {
        const { shouldCancel } = action.payload;
        draft.shouldCancel = shouldCancel;
      });
    },
  },
  initialState
);

export default applyPenders(reducer, []);
