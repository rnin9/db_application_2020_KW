import { createAction } from 'redux-actions';

// const REQUEST_FRIEND = 'friendFunction/REQUEST_FRIEND';
// const REQUEST_DELETE = 'friendFunction/REQUEST_DELETE';
// const REQUEST_DENY = 'friendFunction/REQUEST_DENY';
// const REQUEST_ACCEPT = 'friendFunction/REQUEST_ACCEPT';
const REQUEST_HANDLE = 'friendFunction/REQUEST_HANDLE';

// export const requestFriend =createAction( REQUEST_FRIEND, userID=>userID)
// export const requestDelete = createAction( REQUEST_DELETE, userID=>({userID, id:id++}))
// export const requestDeny =  createAction(REQUEST_DELETE, head=>head)
// export const requestAccept = createAction( type:REQUEST_DELETE, head=>head)
export const requestHandle = createAction(REQUEST_HANDLE, head=>head)

const initalState ={
    head:0
};

export default function friendFunction(state = initalState, action){
    switch(action.type){
       case REQUEST_HANDLE:
            return{
                ...state,
                head: state.head+1,
            };   
        default:
            return state;
    }
}