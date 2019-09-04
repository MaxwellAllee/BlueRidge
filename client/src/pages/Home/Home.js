import React, { Component } from 'react';


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
            <img src="https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              alt="random biker" id="guy" />
            <div className="text">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Blandit cursus risus at ultrices mi tempus. Elit
                  sed
                  vulputate mi sit amet mauris commodo quis. Neque viverra justo nec ultrices dui sapien eget mi
                  proin. Amet luctus venenatis lectus magna fringilla urna porttitor. Id interdum velit laoreet id
                  donec ultrices tincidunt arcu non. Elementum facilisis leo vel fringilla est. Quam nulla
                  porttitor
                  massa id neque aliquam vestibulum morbi blandit. Egestas fringilla phasellus faucibus
                  scelerisque.
                  Adipiscing tristique risus nec feugiat in fermentum posuere. Id leo in vitae turpis. Pharetra
                  sit
                            amet aliquam id diam.</p>
              <p>
                Nibh cras pulvinar mattis nunc sed blandit. Id faucibus nisl tincidunt eget nullam. Aliquam
                faucibus
                purus in massa tempor. Vitae congue mauris rhoncus aenean. Eu nisl nunc mi ipsum. Et netus et
                malesuada fames ac turpis egestas. Ac turpis egestas maecenas pharetra. Nunc eget lorem dolor
                sed.
                Pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu. Vitae tempus quam
                pellentesque nec nam. In eu mi bibendum neque egestas congue quisque. Vel quam elementum
                pulvinar
                etiam non quam. Vitae proin sagittis nisl rhoncus mattis. Sed viverra tellus in hac. Massa vitae
                tortor condimentum lacinia quis vel eros. Dapibus ultrices in iaculis nunc sed augue lacus.
                Ultrices
                            gravida dictum fusce ut placerat. Volutpat commodo sed egestas egestas fringilla.</p>



            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default HomePage;
