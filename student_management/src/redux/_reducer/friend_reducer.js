import {FRIEND_GET_REQUEST,
        FRIEND_REQUEST,
        FRIEND_REQUEST_DELETE,
        FRIEND_GET_LIST,
        FRIEND_ACCEPT,
        FRIEND_DENY,
        FRIEND_DELETE} from '../_actions/types'

export default function(state={},action){
    switch(action.type){
        case FRIEND_GET_REQUEST:
            return{...state, friendreqData:action.payload}
        case FRIEND_REQUEST:
            return{...state, friendreqData:action.payload.friendreqInfo}
        case FRIEND_REQUEST_DELETE:
            return{...state, friendreqData:action.payload.friendreqInfo}
        default:
            return state;
    }
}