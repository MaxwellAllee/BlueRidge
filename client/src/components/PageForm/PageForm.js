import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import moment from 'moment'
import AuthContext from '../../contexts/AuthContext';
import API from '../../lib/API';
import 'react-dropdown/style.css'
import './pageForm.css'
class PageForm extends Component {
    static contextType = AuthContext;
    state = {
        location: "Select",
        availablePages: ["gallery", "test1", "test2"],
        allPages: [],
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
    };

    componentDidMount () {
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
    handleSubmit = () => {

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
                this.setState({ duplicate: true })
                this._onSelect({ value: currentDate })
            }
        }

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
                            <h2>{this.state.currentPageName}</h2>
                            {this.state.duplicate && <div className="duplicate">New page not created. Page already exists for this day.</div>}
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
                            <br />
                            <label ><div className="offset">
                                Section:</div>
                                <Dropdown id="dropDown"
                                    type='text'
                                    options={sect}
                                    className="sectionDrop"
                                    onChange={this.sectChange}
                                    value={!this.state.selected ? this.state.currentSection : defaultOption} />
                            </label>
                            <br />
                            <label className="blog">
                                <div>Notes:</div>
                                <textarea name="currentBlog"
                                    className="form-control, boxStyle" type="text"
                                    value={this.state.currentBlog}
                                    onChange={this.handleInputChange} />
                            </label>
                            <button className="btn btn-primary btn-block cancel w-20" onClick={this.handleCancel}>Cancel</button>
                            <button className="btn btn-primary btn-block submit w-20" onClick={this.handleSubmit}>Submit</button>
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

