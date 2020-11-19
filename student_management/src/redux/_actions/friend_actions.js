import axios from 'axios'
import { FRIEND_GET_REQUEST,
         FRIEND_REQUEST,
         FRIEND_REQUEST_DELETE,
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

