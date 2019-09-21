import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import './Archive.css'
class Archive extends Component {
  static contextType = AuthContext;

  state = {
    isOpen: false,
    pageNames: []
  }
  componentDidMount(){
    this.setState({pageNames:this.props.pageNames})
    document.addEventListener('mousedown',this.hankClick, false)
  }
  componentWillUnmount(){
    document.removeEventListener('mousedown', this.handleClick, false)
  }
  handleClick = (e) =>{
    if (this.node.contains(e.target)){
      return
    }
    this.toggleOpen()
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });

  }


  render() {
    const { isOpen } = this.state;

    const dropdownMenuClass = `dropdown-menu dropdown-menu-right ${isOpen && 'show'}`;

    return (
      <div className="nav-item dropdown">
        <button className="dropdown-toggle archBut" onClick={this.toggleOpen} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Archive

        </button>
        <div className={dropdownMenuClass} onMouseLeave={this.toggleOpen} aria-labelledby="navbarDropdown">
        {(this.props.pageNames.map(Pages => {
          
          return (
          <Link className='nav-link archiveLink' key={Pages} to={`/page/${Pages}`}>{Pages}</Link>
          )
        }))}
        </div>
      </div>
    );
  }
}

export default Archive;
