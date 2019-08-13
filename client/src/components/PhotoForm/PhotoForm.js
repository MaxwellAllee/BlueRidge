import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import './PhotoForm.css'
class PhotoForm extends Component {
    state = {
        availablePages: ["gallery", "test1", "test2"],
        fileName:""
    };

    handleInputChange = event => {

    }

    handleSubmit = event => {



        event.preventDefault();
    }

    render() {


        return (
            <div className='PhotoForm'>
                <div className='card'>
                    <div className='card-body'>
                        <form method="POST" encType="multipart/form-data">
                            Please Select A Page
                        <Dropdown options={this.state.availablePages} onChange={this._onSelect} value={this.state.availablePages[0]} placeholder="Select an option" />
                            Photo
                            <div className="mb-3">

                                <input type="file" name="file" id="file" className="inputfile" />
                                <label for="file"><i class="fas fa-upload"></i> Choose a file</label>
                            </div>
                                {this.state.fileName}
                            <input type="submit" value="Submit" className="btn btn-primary btn-block subButton" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotoForm;

