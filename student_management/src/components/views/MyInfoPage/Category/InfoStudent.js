import React from 'react'
import './InfoStudent.css'


function InfoStudent(){

    return(
        <div className="right_page">
            <h3>information</h3>
            <div className="info_data">
                <div className="data">
                    <h4>단과대학</h4>
                    <p>소프트웨어융합대학</p>
                </div>
                <div className="data">
                    <h4>전공</h4>
                    <p>컴퓨터정보공학부</p>
                </div>
            </div>
            <div className="info_data2">
                <div className="data">
                    <h4>학적상태</h4>
                    <p>재학</p>
                </div>
                <div className="data">
                    <h4>phone</h4>
                    <p>010-1234-5697</p>
                </div>
            </div>
            <div className="info_data3">
                <div className="data">
                    <h4>Email</h4>
                    <p>rkdalswn1209@naver.com</p>
                </div>
                <div className="data">
                    <h4>주소</h4>
                    <p>경기도 부천시 원미구</p>
                </div>
            </div>
        </div>
    );
}


export default InfoStudent