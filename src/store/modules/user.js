import * as userAPI from 'api/user';
import { createAction } from 'redux-actions';
import handleActions from 'redux-actions/lib/handleActions';
import { applyPenders } from 'redux-pender/lib/utils';
import produce from 'immer';

const GET_MY_INFO = 'user/GET_MY_INFO';

export const userActions = {
    getMyInfo: createAction(GET_MY_INFO, userAPI.getMyInfo)
};

const initialState = {
    user: null
};

const reducer = handleActions({

}, initialState);

export default applyPenders(reducer, [
    {
        type: GET_MY_INFO,
        onSuccess: (state, action) => {
            const { user } = action.payload.data;
            return produce(state, draft => {
                draft.user = user;
            })
        }
    }
]);