import React from "react";
import './Stats.css'
import up from './up.png'
import down from './down.png'
import start from './start.png'
function Stats(props){

    return (
      
      <div className='Stats'>
        <div className='jumbotron'>
          <div className='head'>This days stats:</div>
          <div className='statGrid'>
            <div className="element">Elevation Gain <img src={up} alt="up" height="20px" width="20px"/> : {props.elevGain}</div>
            <div className="element">Elevation Loss <img src={down} alt="down" height="20px" width="20px"/> : {props.elevLoss}</div>
            <div className="element">Start Mile <img src={start} alt="start" height="20px" /> : {props.startingMiles}</div>
            <div className="element">Finish Mile <i className="fas fa-flag-checkered"/> : {props.finishMiles}</div>
            <div className="element">Todays Total : {props.total}</div>
            <div className="element">To Date Total : {props.grtotal}</div>
            <div className="element sect">Section : {props.section === 'SD'?(<span>Shendoah National Park</span>):(
              props.section === 'BR' && props.startingMiles === 0 ?(<span>Shendoah National Park & Blue Ridge Parkway</span>):(
                props.section ==='BR'?(<span>Blue Ridge Parkway</span>):(<span>Smokey Mountain National Park</span>))
            )}</div>
          </div>

        </div>
      </div>
    )
  }

export default Stats;

