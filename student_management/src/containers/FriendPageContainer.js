import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FriendPage from '../components/views/FriendPage/FriendPage';
import {requestHandle} from '../store/modules/friendFunction'

class FriendPageContainer extends Component{
    requestHandle=(head)=>{
        const {requestHandle} = this.props;
        requestHandle(head);
    }
    render(){
        const { head } = this.props;
        return(
            <FriendPage
            handleAdd={this.requestHandle}
            head={head}/>
        )
    }
}

    const mapStateToProps = ({ friend }) => ({
        head: friend.head,
    });

    const mapDispatchToProps = { requestHandle }
    
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FriendPageContainer);
