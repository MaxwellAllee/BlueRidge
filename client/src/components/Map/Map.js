import React, { Component } from 'react';
import './Map.css'
import sd1 from './maps/SD1.png'
import sd2 from './maps/SD2.png'
class Map extends Component {
  state = {
    isOpen: false,
    pageNames: [],
    section: 'SV',
    startMiles: '0',
    finishMiles: '75',
    map: '',
    colors: ''
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.mileage !== nextProps.mileage) {
      if(this.props.mileage[0]!== NaN){
      this.sectionalizer('SV', parseInt(this.props.mileage[0]), parseInt(this.props.mileage[1]))
      }
    }

  }
  sectionalizer = (section, start, finish) => {
    console.log(start, finish)
    if (section === 'SV') (this.shendoah(start, finish))
  }
  shendoah(start, finish) {
    const sub =[0,3,2,-0.5,-1.5,-1,31.5,23.5,19,12.5,3.5]
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0
    const subtractor = sub[Math.floor(finish/10)]
    console.log(Math.floor(parseInt(finish)/10))
    if (finish < 55) {

      offset = 3.5
      this.setState({ map: sd1 })
      mileTotal = 56
    }
    else {
      mileMapStart =49.5
      mileTotal = 106
      this.setState({ map: sd2 })

    }
    console.log(subtractor)
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractor)
  }
  subtracter(array, mile){
        if(mile%10){
          const low = array[Math.floor(mile)]
          const high = array[Math.floor(mile)+1]
        
        }
  }
  percentages(offset, start, finish, mileTotal, mapStart, subtractor) {
    let startPercent = 0
    let bottomPercent = 0
    console.log(subtractor)
    if(mapStart > start) start = 0
    if (start) {
      if (offset) {
        startPercent = (100 - offset) * (start / mileTotal) + offset
      }
      else {
        console.log('dog')
        startPercent = start / mileTotal*100
      }
    }
    if (offset) {
      bottomPercent = ((100 - offset) * (finish / mileTotal) + offset)-subtractor
    }
    else {
      console.log('cat')
      bottomPercent = (finish/mileTotal*100)-subtractor
    }

    this.setState({ colors: `black ${startPercent}%,red ${startPercent}%, red ${bottomPercent}%, black ${bottomPercent}%` })
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }


  render() {
    const areaStyle = this.state.colors
    console.log(this.state.colors)
    return (
      <div className="map">
        <div className='test' style={{ background: `linear-gradient(${areaStyle}` }}>
          <img src={this.state.map} className='imagetest' alt={sd1} style={{}} />
        </div>
      </div>
    );
  }
}

export default Map;
