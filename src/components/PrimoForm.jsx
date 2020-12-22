import React, { Component } from 'react'
import { MonthlyCard } from './MonthlyCard';

const COSTPERROLL = 160;
const DAILYCOMMISIONGEMS = 60;
const MONTHLYPERDAY = 90;
//const MONTHLYINITIAL = 300;
const FIRST5STARPRIMOCOUNT = 14400;
const GURANTEEBANNER5STAR = 28800;

export class PrimoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
             primogems : '',
             rolls : 0,
             monthly: false,
             daysTo5Star: 240
        }
    }


    handlePrimogemsChange = (event) => {
        this.setState({
            primogems : event.target.value
        })
        this.calculateRolls(event);
    }

    handleMonthlyCardChange = (event) => {
        
        this.setState({
            monthly : event.target.value
        } ,  function() {this.calculateRolls(event) })
    }

    calculateDays = (currentPrimo , hasMonthly) => {
        let newDay = 0;
        if(hasMonthly === 'true'){
            newDay = Math.max(0,Math.ceil((FIRST5STARPRIMOCOUNT - currentPrimo) /  (DAILYCOMMISIONGEMS + MONTHLYPERDAY)));
        }else{
            newDay = Math.max(0,Math.ceil((FIRST5STARPRIMOCOUNT - currentPrimo) /  (DAILYCOMMISIONGEMS)));
        }
        return newDay;
    }
    
    calculateRolls = event => {
        let currentPrimo = parseInt(this.state.primogems);
        currentPrimo = currentPrimo || 0;
        let newRolls = currentPrimo / COSTPERROLL;
        let newDay =  this.calculateDays(currentPrimo , this.state.monthly);

        this.setState(
            {rolls : newRolls,
            daysTo5Star : newDay,
         }
        );

        
    }
    
    render() {
        return (
            <div>
                <div>
                    <label> Primogems: </label>
                    <input type="text"
                    value = {this.state.primogems}
                    onChange={this.handlePrimogemsChange}
                    onKeyUp={this.calculateRolls}
                    />
                </div>
                <h2>You have : {`${this.state.rolls}`} rolls </h2>
                <h2>You are {`${this.state.daysTo5Star}`} days from a 5 star</h2>
                <p>Monthly Card</p>
                <select onChange = {this.handleMonthlyCardChange} value = { this.state.monthly}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>

        )
    }
}

export default PrimoForm
