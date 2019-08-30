import React, { Component } from 'react';
import './Map.css'
import sd1 from './maps/SD1.png'
import sd2 from './maps/SD2.png'
class Map extends Component {
  state = {
    isOpen: false,
    pageNames: [],
    section: 'SV',
    startMiles: '20',
    finishMiles: '70',
    map: '',
    colors: ''
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    if (this.props.mileage !== nextProps.mileage) {
      this.sectionalizer('SV', parseInt(this.state.startMiles), parseInt(this.state.finishMiles))

    }

  }
  sectionalizer = (section, start, finish) => {

    if (section === 'SV') (this.shendoah(start, finish))
  }
  shendoah(start, finish) {
    const sub =[0,0,0,0,0,31,23,19,]
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0
    let subtractor = 0
    if (finish < 55) {

      offset = 3.5

      this.setState({ map: sd1 })
      mileTotal = 56
    }
    else {
      mileMapStart =49.5
      mileTotal = 106
      subtractor = 23
      this.setState({ map: sd2 })

    }
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractor)
  }
  percentages(offset, start, finish, mileTotal, mapStart, subtractor) {
    let startPercent = 0
    let bottomPercent = 0
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
