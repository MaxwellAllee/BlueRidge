import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import 'react-dropdown/style.css'

class PageForm extends Component {
    static contextType = AuthContext;
    state = {
        location: "Select Option",
        availablePages: ["gallery", "test1", "test2"],
        allPages: [],
        selectedPage: -1,
        editMode: false,
        currentPage:{}
    };
   
    componentDidMount(){
        API.Pages.allPages().then(res=>{
          console.log(res.data)
          this.setState({allPages:res.data})
          let availPages = res.data.map(pages => pages.pageName)
          availPages.unshift("New Page")
          this.setState({availablePages: availPages});
          
      })}
      handleChange(event,field) {
          console.log(event.target.value)
        this.setState(prevState => ({
            currentPage: {                   
                ...prevState.currentPage,    
                field: event.target.value       
            }
        }))
      }
      _onSelect = option => {          
         this.setState({selectedPage:this.state.availablePages.indexOf(option.value), editMode: true})

         this.state.availablePages.indexOf(option.value) && this.setState({currentPage:this.state.allPages[this.state.availablePages.indexOf(option.value)-1]})
        
    }
    

    render() {
        const defaultOption = this.state.location
        const pageNum = this.state.selectedPage
        console.log(pageNum)
        return (
            <div className='PageForm'>
                <div className='jumbotron'>
                        <form>
                        {this.state.editMode ? (<div>
                            <input className="form-control" type="text" placeholder={pageNum ? "": "mileage"}value ={pageNum ? this.state.allPages[pageNum-1].startingMiles:""} onChange={this.handleChange} />
                        </div>):(
                        <Dropdown id="dropDown" 
                        options={this.state.availablePages} 
                        onChange={this._onSelect} 
                        value={defaultOption} />
                        )}
                        
                        </form>
                    
                </div>
            </div>
        )
    }
}

export default PageForm;

