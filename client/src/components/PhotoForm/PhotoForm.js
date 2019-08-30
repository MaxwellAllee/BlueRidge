import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import 'react-dropdown/style.css'
import './PhotoForm.css'
class PhotoForm extends Component {
    static contextType = AuthContext;
    state = {
        location: "Select Option",
        availablePages: [],
        fileName: "",
        error: ""
    };
    componentDidMount(){
        API.Pages.sortPages()
    .then(order=> {
        console.log(order)
        this.setState({availablePages:order.pageNames})})
    }
    getFile = (filePath) => {
        return filePath.substr(filePath.lastIndexOf('\\') + 1).split('.')[0];
    }
    handleFileChange = (event) => {
        console.log("checking")
        if (event || event.target || event.target.files || !event.target.files.length === 0) {
            this.setState({ fileName: event.target.files[0].name })

        }

    }
    _onSelect = option => {
        this.setState({ location: option.value })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.fileName.length, this.state.location.length)
        if (!this.state.location.length&&this.state.location !== "Select Option") {
            this.setState({ error: "Please Select A Location" })
        
        } else if (!this.state.fileName.length) {
            this.setState({ error: "Please Select A File" })
        } else {
            const file = document.getElementById("file").files[0]
            API.Photos.upload(file,this.state.location,this.context.authToken).then(
            res=>{
                this.setState({error:"",fileName:"",location:"Select Option"})
            }
            ).catch(err=>{
                console.log(err)
                this.setState({error:"Please Try Again"})
            })
            
        }
    }

    render() {

        const defaultOption = this.state.location
        return (
            <div className='PhotoForm'>
                <div className='card'>
                    <div className='card-body'>
                        {this.state.error && <div id="error">{this.state.error}</div>}
                        <form encType="multipart/form-data">
                            Please Select A Page
                        <Dropdown id="dropDown" options={this.state.availablePages} onChange={this._onSelect} value={defaultOption} />
                            <div>
                                Photo
                          </div>

                            <input type="file" name="file" id="file" className="inputfile" onChange={(event) => { this.handleFileChange(event) }} />
                            <label htmlFor="file"><i className="fas fa-upload"></i> Choose a file</label>


                            <div className="fileN">{this.state.fileName}</div>
                            <input type="submit" value="Submit" className="btn btn-primary btn-block subButton" onClick={(event) => { this.handleSubmit(event) }} />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotoForm;

