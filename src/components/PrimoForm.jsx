import React, { Component } from 'react'

export class PrimoForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             primogems : '',
             rolls : 0,
             
        }
    }

    handlePrimogemsChange = (event) => {
        this.setState({
            primogems : event.target.value
        })
    }

    calculateRolls = event => {
        let newRolls = parseInt(this.state.primogems) / 160;
        this.setState({rolls : newRolls});
        event.preventDefault()
    }
    
    render() {
        return (
            <form onSubmit = {this.calculateRolls}>
                <div>
                    <label> Primogems: </label>
                    <input type="text"
                     value={this.state.primogems}
                    onChange={this.handlePrimogemsChange}/>
                </div>
                <button type="submit">Submit</button>
                <h2>You have : {`${this.state.rolls}`} rolls </h2>
            </form>
        )
    }
}

export default PrimoForm
