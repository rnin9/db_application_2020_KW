/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getFriendreq, requestReceived } from '../redux/_actions/friend_actions';

export default function (SpecificComponent) {
    function FriendReceivedCheck(props) {

        let friend = useSelector(state => state.friend);
        const dispatch = useDispatch();
        const id = localStorage.getItem('id')
        useEffect(()=>{
            // dispatch(getFriendList(id))
        }, [])

        return (
            <SpecificComponent friend={friend} />
        )
    }
    return FriendReceivedCheck
}


