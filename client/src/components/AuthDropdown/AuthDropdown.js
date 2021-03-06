import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';

import AuthContext from '../../contexts/AuthContext';

class Archive extends Component {
  static contextType = AuthContext;

  state = {
    isOpen: false
  }

  toggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });

  }

  handleLogout = () => {
    this.context.onLogout();
    this.props.onClick();
  }

  render() {
    const { user } = this.context;
    const { isOpen } = this.state;

    const dropdownMenuClass = `dropdown-menu dropdown-menu-right ${isOpen && 'show'}`;

    return (
      <div className="nav-item dropdown">
        <button className="btn btn-link dropdown-toggle" onClick={this.toggleOpen} id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <Gravatar className="rounded-circle" email={user.email} size={50} />

        </button>
        <div className={dropdownMenuClass} aria-labelledby="navbarDropdown">
        <Link className='dropdown-item' to='/addpage' onClick={this.toggleOpen}> Edit Page</Link>
          <Link className='dropdown-item' to='/addphoto' onClick={this.toggleOpen}>Edit Photos</Link>
          <div className="dropdown-item" onClick={this.handleLogout}>Logout</div>
        </div>
      </div>
    );
  }
}

export default Archive;
