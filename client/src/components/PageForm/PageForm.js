import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import moment from 'moment'
import AuthContext from '../../contexts/AuthContext'
import API from '../../lib/API';
import 'react-dropdown/style.css'
import './pageForm.css'
class PageForm extends Component {
    static contextType = AuthContext;
    state = {
        location: "Select",
        availablePages: ["gallery"],
        allPages: [],
        selectedPage: -1,
        errMessage: "",
        editMode: false,
        currentPage: {},
        currentPageName: "",
        currentId: "",
        currentStartingMiles: "",
        currentFinishMiles: "",
        currentSection: "",
        currentBlog: "",
        currentElevGain: 0,
        currentElevLoss: 0,
        public : false,
        duplicate: false
    };

    componentDidMount() {
        API.Pages.sortPagesAuth(this.context.authToken).then(res =>{
            console.log(res.data)
            this.setState({ allPages: res.data })
            let availPages = res.data.map(pages => pages.pageName)
            availPages.unshift("New Page")
            this.setState({ availablePages: availPages });
        })
    }
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    sectChange = option => {
        this.setState({ currentSection: option.value })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        let errorMessage = ""
        const pageInfo = {
            pageName: this.state.currentPageName,
            startingMiles: this.state.currentStartingMiles,
            finishMiles: this.state.currentFinishMiles,
            section: this.state.currentSection,
            blog: this.state.currentBlog,
            elevGain: this.state.currentElevGain,
            elevLoss: this.state.currentElevLoss,
            public: this.state.public
        }
        console.log(isNaN(pageInfo.finishMiles))
        if (pageInfo.startingMiles === "" || isNaN(pageInfo.startingMiles)) {
            errorMessage = "Check starting mileage"
        }
        else if (pageInfo.finishMiles === "" || isNaN(pageInfo.finishMiles) || parseInt(pageInfo.finishMiles) < parseInt(pageInfo.startingMiles)) {
            errorMessage = "Check finishing mileage"
        }
        else if (!pageInfo.elevGain || isNaN(pageInfo.elevGain)) {
            errorMessage = "Check Elevatin Gain"
        }
        else if (!pageInfo.elevLoss || isNaN(pageInfo.elevLoss)) {
            errorMessage = "Check Elevatin Loss"
        }
        else if (!pageInfo.blog) {
            errorMessage = "Check Notes"
        }
        else if (!pageInfo.section || pageInfo.section === "Select") {
            errorMessage = "Check Section"
        }
        if (errorMessage) {
            this.setState({ errMessage: errorMessage, duplicate: true })
        }
        else {
            this.APIchange(pageInfo)
        }
    }
    APIchange = (pageInfo) => {
        this.state.currentId ? (
            API.Pages.update(pageInfo, this.state.currentId) ? (this.handleCancel()) : (this.setState({ duplicate: true, errMessage: "Nothing Updated" }))
        ) : (API.Pages.create(pageInfo) && this.handleCancel())
    }
    handleCancel = () => {
        this.setState(
            {
                selectedPage: -1,
                editMode: false,
                currentPage: {},
                currentPageName: "",
                currentId: "",
                currentStartingMiles: "",
                currentFinishMiles: "",
                currentSection: "",
                currentBlog: "",
                currentElevGain: "",
                currentElevLoss: "",
                duplicate: false
            }
        )
        this.componentDidMount()
    }
    _onSelect = option => {
        let selected = this.state.availablePages.indexOf(option.value)
        this.setState({ selectedPage: selected, editMode: true })

        if (selected) {
            this.setState({
                currentPage: this.state.allPages[selected - 1],
                currentPageName: this.state.allPages[selected - 1].pageName,
                currentId: this.state.allPages[selected - 1].id,
                currentStartingMiles: this.state.allPages[selected - 1].startingMiles,
                currentFinishMiles: this.state.allPages[selected - 1].finishMiles,
                currentSection: this.state.allPages[selected - 1].section,
                currentBlog: this.state.allPages[selected - 1].blog,
                currentElevGain: this.state.allPages[selected - 1].elevGain,
                currentElevLoss: this.state.allPages[selected - 1].elevLoss
            })
        }
        else {
            let currentDate = moment().format('l').split('/').join('-')
            if (!this.state.availablePages.includes(currentDate)) {
                this.setState({ currentPageName: currentDate })
            }
            else {
                this.setState({ duplicate: true, errMessage: "New page not created. Page already exists for this day." })
                this._onSelect({ value: currentDate })
            }
        }

    }


    render() {
        const defaultOption = this.state.location
        const sect = ['SD', 'BR', 'SM']
        return (
            <div className='PageForm'>
                <div className='jumbotron'>
                    <form>

                        {this.state.editMode ? (<div>
                            <h2>{this.state.currentPageName}</h2>
                            {this.state.duplicate && <div className="duplicate">{this.state.errMessage}</div>}
                            <div className="metricsGrid">
                                <label className="metrics">
                                    Starting Miles:
                                <input name="currentStartingMiles" className="form-control mileage" type="number"
                                        value={this.state.currentStartingMiles}
                                        onChange={this.handleInputChange} />
                                </label>
                                <label className="metrics">
                                    Finishing Miles:
                                <input name="currentFinishMiles" className="form-control mileage" type="number"
                                        value={this.state.currentFinishMiles}
                                        onChange={this.handleInputChange} />
                                </label>
                                <label className="metrics">
                                    Elevation Gain:
                                <input name="currentElevGain" className="form-control mileage" type="number"
                                        value={this.state.currentElevGain}
                                        onChange={this.handleInputChange} />
                                </label>
                                <label className="metrics">
                                    Elevation Loss:
                                <input name="currentElevLoss" className="form-control mileage" type="number"
                                        value={this.state.currentElevLoss}
                                        onChange={this.handleInputChange} />
                                </label>
                            </div>
                            <label ><div className="offset">
                                Section:</div>
                                <Dropdown id="dropDown"
                                    type='text'
                                    
                                    options={sect}
                                    className="sectionDrop"
                                    onChange={this.sectChange}
                                    value={!this.state.selected ? this.state.currentSection : defaultOption} />
                            </label>
                            <div className="custom-control custom-switch">
                                <input type="checkbox" 
                                name='public'
                                className="custom-control-input" 
                                id="customSwitch1"
                                checked={this.state.public}
                                onChange={this.handleInputChange}
                                />
                                    <label className="custom-control-label" htmlFor="customSwitch1">
                                        
                                    Publish</label>
                            </div>
                                <br />
                                <label className="blog">
                                    <div>Notes:</div>
                                    <textarea name="currentBlog"
                                        className="form-control, boxStyle" type="text"
                                        value={this.state.currentBlog}
                                        onChange={this.handleInputChange} />
                                </label>
                                <div className='cancelSubmit'>
                                    <button className="btn btn-primary cancel" onClick={this.handleCancel}>Cancel</button>
                                    <button className="btn btn-primary submit" onClick={(event) => this.handleSubmit(event)}>Submit</button>
                                </div>
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
            
