import {FRIEND_GET_REQUEST,
        FRIEND_REQUEST,
        FRIEND_REQUEST_DELETE,
        FRIEND_REQUEST_RECEIVED,
        FRIEND_GET_LIST,
        FRIEND_ACCEPT,
        FRIEND_DENY,
        FRIEND_DELETE} from '../_actions/types'

export default function(state={},action){
    switch(action.type){
        case FRIEND_GET_REQUEST:
            return{...state, friendreqData:action.payload, friendreqrec:{...state.friendreqrec}}    
        case FRIEND_REQUEST:
            return{...state, friendreqData:action.payload.friendreqInfo,  friendreqrec:{...state.friendreqrec}}
        case FRIEND_REQUEST_DELETE:
            return{...state, friendreqData:action.payload.friendreqInfo,  friendreqrec:{...state.friendreqrec}}
        case FRIEND_REQUEST_RECEIVED:
            return{...state, friendreqData:{
                    ...state.friendreqData},
                 friendreqrec:action.payload.friendreqrec
            }
        default:
            return state;
    }
}