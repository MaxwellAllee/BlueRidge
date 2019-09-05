import React, { Component } from 'react';
import './Map.css'
class Map extends Component {
  state = {
    isOpen: false,
    pageNames: [],
    map: '',
    colors: ''
  }
  componentDidMount(props) {

    this.sectionalizer(this.props.mileage.sect, parseInt(this.props.mileage.start), parseInt(this.props.mileage.finish))


  }
  componentWillReceiveProps(nextProps) {
     if (this.props !== nextProps) {
      const total = nextProps.mileage
      const sect = total.sect
      const start = total.start
      const finish = total.finish
      this.sectionalizer(sect, start, finish)
    
     }

  }
  sectionalizer = (section, start, finish) => {

  section === "SD" ? (this.shendoah(start, finish)):(section === 'BR'?
  (this.blueRidge(start, finish)):(section === 'SM'? this.setState({ map: 'sm' }):(console.log('other'))))
  
  }
  shendoah(start, finish) {

    const sub =[0,3,2,-0.5,-1.5,-1,-3.75,-4,0,0,0]
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0

    const subtractorEnd = sub[Math.floor(parseInt(finish)/10)]
    const subtractorBegining = start ? sub[Math.floor(start/10)] : 0

    if (finish < 55) {

      offset = 3.5
      this.setState({ map: 'SD1' })
      mileTotal = 56
    }
    else {
      mileMapStart =47.5
      mileTotal = 106
      this.setState({ map: 'SD2' })

    }
  
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractorEnd, subtractorBegining)
  }
  blueRidge(start, finish){
    const sub =[0,0,0,1.5,1.5,0,1.7,2.5,2.3,3.5,1.8,.8,.75,.5,.75,.7,-1,-2,-2,-2.3,-1.75,-2.5,-2.75,-4,-3.5,
      -3,-1.8,-.9,0,-1,-1.25,-1.8,-3.5,-5,-6.5,-7.25,-5.5, -6,-6,-7, -9,-10.75, -12,-10, -10, 0,6,0
    ] 
    let offset = 0
    let mileTotal = 0
    let mileMapStart = 0
    const subtractorEnd = sub[Math.floor(parseInt(finish)/10)]
    const subtractorBegining = start ? sub[Math.floor(start/10)] : 0
    if (finish < 157) {
      this.setState({ map: 'br1' })
      mileTotal = 157
    }
    else if (finish >= 157 && finish<305){
      this.setState({ map: 'br2' })
      mileTotal =305
      mileMapStart =155
    }
    else{
      this.setState({ map: 'br3' })
      mileTotal = 469
      mileMapStart =305
    }
    this.percentages(offset, start, finish, mileTotal, mileMapStart, subtractorEnd, subtractorBegining)
  }
  percentages(offset, start, finish, mileTotal, mapStart, subtractorEnd, subtractorBegining) {
   
    let startPercent = 0
    let bottomPercent = 0
    start-= mapStart
    finish -= mapStart
    mileTotal -= mapStart
    console.log(start, mileTotal, finish, mapStart)
    if(start<0) start = 0
    if (start) {
      if (offset) {
        startPercent = (100 - offset) * (start / mileTotal) + offset - subtractorBegining
      }
      else {
       
        startPercent = start / mileTotal*100// - subtractorBegining
      }
    }
    if (offset) {
      bottomPercent = ((100 - offset) * (finish / mileTotal) + offset)-subtractorEnd
    }
    else {
      
      bottomPercent = (finish/mileTotal*100)-subtractorEnd

    }

    this.setState({ colors: `black ${startPercent}%,red ${startPercent}%, red ${bottomPercent}%, black ${bottomPercent}%` })
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false)
  }


  render() {
    const areaStyle = this.state.colors
  
    return (
      <div className="map">
        {this.state.map? (
        <div className='test' style={{ background: `linear-gradient(${areaStyle}` }}>
          <img src={require(`./maps/${this.state.map}.png`)} className='imagetest' alt={this.state.map} style={{}} />
        </div>):
        (this.sectionalizer(this.props.mileage[2], parseInt(this.props.mileage[0]), parseInt(this.props.mileage[1])))}
      </div>
    );
  }
}

export default Map;
