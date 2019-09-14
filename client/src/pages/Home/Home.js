import React, { Component } from 'react';
import bikephoto from './bike.jpg'
import './Home.css'
class HomePage extends Component {
  state = {
    mounted: false
  }
  componentDidMount() {
    this.setState({ mounted: true })
  };
  render() {

    return (
      <div className='Home'>
        <div className="content-grid-container">
          <div className="content-grid-item"></div>
          <div className="content-grid-item text-area">
            <img src=bikephoto
              alt="random biker" id="guy" />
            <div className="text">
              <p>Welcome!  The purpose of this website is to chronicle my trip biking the southern appalachians and expand my web dev skills. The start of the trip will be at the north entrance of the Shenandoah National Park. The route will continue along the Blue Ridge Parkway, with a possible jaunt through the Great Smoky Mountain National Park. I have been preparing for this trip for about six months and am super excited the start is finally here!
</p><p>
The plan for this website is for it be updated each day along the journey with photos and stats. Just as the success of the trip is not guaranteed, keeping the website up or current is not guaranteed.  I will try my best and I appreciate all your best wishes!
<br/>
-Max  
</p>



            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
