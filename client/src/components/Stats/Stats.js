import React, { Component } from 'react';
import './Stats.css'

class Stats extends Component {
  state = {
    isOpen: false,
    pageNames: []
  }
  componentDidMount(){
    console.log(this.props.mileage)
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.mileage !== nextProps.mileage) {
     
      console.log(nextProps.mileage)
    }
  }
  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false)
  }
  

  render() {
    let areaStyle = {}
    
    return (
      <div className="Stats">
        <div className='test' style={{}}>
        <img src={sd1} className='imagetest' alt={sd1} style={{'z-index':3}}/>
        </div>
      </div>
    );
  }
}

export default Stats;
