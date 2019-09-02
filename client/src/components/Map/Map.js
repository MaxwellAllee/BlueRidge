import React, { Component } from 'react';
import './Map.css'
import sd1 from './maps/SD1.png'
import sd2 from './maps/SD2.png'
import br1 from './maps/br1.png'
class Map extends Component {
  state = {
    isOpen: false,
    pageNames: [],

    map: '',
    colors: ''
  }
  componentDidMount() {

  }
  componentWillReceiveProps(nextProps) {
    console.log((this.props.mileage[0]), parseInt(this.props.mileage[1]))
    if (this.props.mileage !== nextProps.mileage) {
      if(this.props.mileage[0]!== NaN){
      this.sectionalizer(this.props.mileage[2], parseInt(this.props.mileage[0]), 150)
      }
    }

  }
  sectionalizer = (section, start, finish) => {
    console.log(section)
  section === 'SD' ? (this.shendoah(start, finish)):(section === 'BR'?(this.blueRidge(start, finish)):(console.log('other')))
  
  }
  shendoah(start, finish) {
    console.log(start,finish)
    const sub =[0,3,2,-0.5,-1.5,-1,31.5,23.5,19,12.5,3.5]
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0
    const subtractorEnd = sub[Math.floor(finish/10)]
    const subtractorBegining = start ? sub[Math.floor(start/10)] : 0
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
    console.log(subtractorBegining)
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractorEnd, subtractorBegining)
  }
  blueRidge(start, finish){
    console.log(start,finish)
    const sub =[0,0,0,1.5,1.5,0,1.7,2.5,2.3,3.5,1.8,.8,.75,.5,.75,1]
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0
    const subtractorEnd = sub[Math.floor(finish/10)]
    const subtractorBegining = start ? sub[Math.floor(start/10)] : 0
    console.log(Math.floor(parseInt(finish)/10))
    if (finish < 157) {
      this.setState({ map: br1 })
      mileTotal = 157
    }
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractorEnd, subtractorBegining)
  }
  percentages(offset, start, finish, mileTotal, mapStart, subtractorEnd, subtractorBegining) {
    let startPercent = 0
    let bottomPercent = 0
    console.log(finish)
    if(mapStart > start) start = 0
    if (start) {
      if (offset) {
        startPercent = (100 - offset) * (start / mileTotal) + offset - subtractorBegining
      }
      else {
        console.log('dog')
        startPercent = start / mileTotal*100 - subtractorBegining
      }
    }
    if (offset) {
      bottomPercent = ((100 - offset) * (finish / mileTotal) + offset)-subtractorEnd
    }
    else {
      console.log('cat')
      bottomPercent = (finish/mileTotal*100)-subtractorEnd

    }
    console.log(startPercent, bottomPercent)
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
