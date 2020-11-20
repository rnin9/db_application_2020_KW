import axios from 'axios'
import { FRIEND_GET_REQUEST,
         FRIEND_REQUEST,
         FRIEND_REQUEST_DELETE,
         FRIEND_REQUEST_RECEIVED,
         FRIEND_GET_LIST,
         FRIEND_ACCEPT,
         FRIEND_DENY,
         FRIEND_DELETE} from './types'

export function getFriendreq(id){
    const request = axios.get('/api/userFriend/request',{params:id})
    .then(res=>res.data);
    return {
        type:FRIEND_GET_REQUEST,
        payload: request
    }}

export function requestFriend(userID,friendID){
    let datas = {u_id:userID, f_id: friendID}
   const request = axios.post('/add/friend',{data:datas})
   .then(res=>res.data);
   return {
       type:FRIEND_REQUEST,
       payload:request
   }
}

export function requestDelete(userID,friendID){
    const datas = {u_id:userID, f_id:friendID}
    const request= axios.delete('/delete/friend/request',{data:datas})
    .then(res=>res.data);
    return {
        type:FRIEND_REQUEST_DELETE,
        payload:request
    }
}
export function requestReceived(friendID){
    const request=axios.get('/api/userFriend/request/received',{params:friendID})
    .then(res=>res.data);
    return{
        type:FRIEND_REQUEST_RECEIVED,
        payload:request
    }
}
