import React,{useState, useEffect} from 'react'
import axios from 'axios'
import InfoLeft from './InfoLeft'
import InfoStudent from './Category/InfoStudent'
import InfoEmployee from './Category/InfoEmployee'
import InfoProfessor from './Category/InfoProfessor'

function MyInfoPage(props){
   const userID = localStorage.getItem('id');
   const auth = localStorage.getItem('position')    // 권한별 다른 form으로,

   const [data, setData] = useState({               // function에서 state 사용
    id:'',
    name:'',
    photo:'',
    college:'',
    major:'',
    position:'',
    grade:'',
    gender:'',
    email:'',
    address:'',
    leaveofabsense:true

});
    useEffect(() =>{
    userdata(userID)
    }, [])

    const userdata = (uid)=> axios.get('/api/userInfo',{params:uid})
    .then(res=>{
        console.log(res)
       setData(prevdata=>({
            data:{
                ...prevdata,
                id:res.data[0].userID,
                name:res.data[0].userName,
                photo:res.data[0].userPhoto,
                college:res.data[0].userCollege,
                major:res.data[0].userMajor,
                position:res.data[0].userPosition,
                grade:res.data[0].userGrade,
                gender:res.data[0].userGender,
                email:res.data[0].userEmail,
                address:res.data[0].userAddress,
                password:res.data[0].userPassword,
                leaveofabsense:res.data[0].leaveOfAbsense
            }
        }))
    })
    .catch(err=>{
        console.log('err:',err);
    })
    return(
        <div className="mypage">
             <div className="my_left_info">        
                 <InfoLeft info={data}/>
             </div>
             <div className="my_right_info">
              {auth ==='학부생' || auth==='대학원' ? <InfoStudent  info={data}/>: auth==='교수' ? <InfoProfessor info={data}/>
              : <InfoEmployee  info={data}/>}
             </div>
        </div>
    );
}

export default MyInfoPage