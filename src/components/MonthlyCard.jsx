import React, { Component } from 'react'

export class MonthlyCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            checked : false,
            daysTo5Star: 240
        }
    }

    handleMonthlyCardChange = (event) => {
        this.setState({
            checked : event.target.value
        })
    }

    
    render(){
        return(
        <div>
            <p>Monthly Card</p>
            <select>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
        </div>
        );
    }

}
