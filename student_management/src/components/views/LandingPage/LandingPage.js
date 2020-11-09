import React, { Component } from 'react';
import axios from 'axios';

class LandingPage extends Component{

    constructor(props) {
        super(props)
        this.state = {
          name : '',
          list : [],
          update : false,
        }    
      }

         componentDidMount() {
          this._getData();
        }
      
        _getData = async () => {
          const res = await axios.get('/get/data');
          if(res.data[0] === undefined) {
            let cover = [];
            cover.push(res.data);
            return this.setState({ list : cover })
          }
          this.setState({ list : res.data });
        }
    
    render(){
        const { list } = this.state;
        return(
            <div className="LandingPage">
                <br /> <br />
          <div style={{ height : '250px', overflow : 'auto' }}>
            <h4 style={{ color : '#ababab'}}> Users List </h4>

              <div style={{ border : 'solid 1px black', width : '50%', marginLeft : '25%', textAlign : 'left' }}>
                <div style={{ display : 'grid', gridTemplateColumns : '32% 35% 30%', textAlign : 'center' }}>
                  <div> Number </div>
                  <div> Name </div>
                  <div> Other </div>
                </div>
              </div>

            {list.length !== 0
              ? list.map( (el, key) => {
                return(
                  <div key={key} style={{ display : 'grid', lineHeight : '40px', gridTemplateColumns : '32% 35%', width : '50%', marginLeft : '25%'}}>
                    <div> {el.userID} </div>
                    <div> {el.userName} </div>
                  </div>
                )
              })
            
              : null}
          </div>
            </div>
        )};
}

export default LandingPage;