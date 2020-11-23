import {FRIEND_GET_REQUEST,
        FRIEND_REQUEST,
        FRIEND_REQUEST_DELETE,
        FRIEND_REQUEST_RECEIVED,
        FRIEND_GET_LIST,
        FRIEND_DELETE,
        FRIEND_REQUEST_HANDLE} from '../_actions/types'

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
        case FRIEND_GET_LIST:
            return{...state, friendreqrec:{
                    ...state.friendreqreq},
                    friendList:action.payload.friendList
            }
        case FRIEND_REQUEST_HANDLE:
            return{...state, friendreqrec:action.payload}
        default:
            return state;
    }
}