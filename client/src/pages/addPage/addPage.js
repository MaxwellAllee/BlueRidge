import React, { Component } from 'react';


import PageForm from '../../components/PageForm/PageForm'

class addPages extends Component {
 

  state = {
    isLoading: true,
    error: "",
    mounted:false
  }

  

  render() {
    return  <PageForm/>
  }
}

export default addPages;