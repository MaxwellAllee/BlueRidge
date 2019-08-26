import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import 'react-dropdown/style.css'
import './pageForm.css'
class PageForm extends Component {
    static contextType = AuthContext;
    state = {
        location: "Select Option",
        availablePages: ["gallery", "test1", "test2"],
        allPages: [],
        selectedPage: -1,
        editMode: false,
        currentPage: {},
        currentId: "",
        currentStartingMiles: "",
        currentFinishMiles: "",
        currentSection: "",
        currentBlog: "",
        currentElevGain: "",
        currentElevLoss: ""
    };

    componentDidMount() {
        API.Pages.allPages().then(res => {
            console.log(res.data)
            this.setState({ allPages: res.data })
            let availPages = res.data.map(pages => pages.pageName)
            availPages.unshift("New Page")
            this.setState({ availablePages: availPages });

        })
    }
    handleInputChange = (event) => {
        const target = event.target;
        console.log(target)
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    sectChange = option => {
        this.setState({ currentSection: option.value })
    }
    _onSelect = option => {
        let selected = this.state.availablePages.indexOf(option.value)
        this.setState({ selectedPage: selected, editMode: true })
        console.log(this.state.allPages[selected - 1].id)
        selected && this.setState({
            currentPage: this.state.allPages[selected - 1],
            currentId: this.state.allPages[selected - 1].id,
            currentStartingMiles: this.state.allPages[selected - 1].startingMiles,
            currentFinishMiles: this.state.allPages[selected - 1].finishMiles,
            currentSection: this.state.allPages[selected - 1].section,
            currentBlog: this.state.allPages[selected - 1].blog,
            currentElevGain: this.state.allPages[selected - 1].elevGain,
            currentElevLoss: this.state.allPages[selected - 1].elevLoss
        })

    }


    render() {
        const defaultOption = this.state.location
        const pageNum = this.state.selectedPage
        const sect = ['SD', 'BR', 'SM']
        console.log(pageNum)
        return (
            <div className='PageForm'>
                <div className='jumbotron'>
                    <form>

                        {this.state.editMode ? (<div>
                            <label>
                                Starting Miles:
                                <input name="currentStartingMiles" className="form-control" type="number"
                                    value={this.state.currentStartingMiles}
                                    onChange={this.handleInputChange} />
                            </label>
                            <label>
                                Finishing Miles:
                                <input name="currentFinishMiles" className="form-control" type="number"
                                    value={this.state.currentFinishMiles}
                                    onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Section:
                                    <Dropdown id="dropDown"
                                    type='text'
                                    options={sect}
                                    onChange={this.sectChange}
                                    value={defaultOption} />
                            </label>
                            <br />
                            <label>
                                Notes:
                                <textarea name="currentBlog" style="{ width: 60vw; height:20vh;}"
                            } className="form-control" type="text"
                                    value={this.state.currentBlog}
                                onChange={this.handleInputChange} />
                            </label>

                        </div>) : (
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

