import React, { Component } from 'react'

const COSTPERROLL = 160;
const DAILYCOMMISIONGEMS = 60;
const MONTHLYPERDAY = 90;
//const MONTHLYINITIAL = 300;
const FIRST5STARPRIMOCOUNT = 14400;
//const GURANTEEBANNER5STAR = 28800;
const SOFTPITYPRIMO = 12160;

export class PrimoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
             primogems : '',
             rolls : 0,
             monthly: false,
             daysTo5Star: 240,
             pity: 0,
             isSoftPity: false
        }
    }


    handlePrimogemsChange = (event) => {
        this.setState({
            primogems : event.target.value
        })
        this.calculateRolls(event);
    }

    handlePityChange = (event) => {
        this.setState({
            pity: event.target.value
        })
        this.calculateRolls(event);
    }

    handleSoftPityChange = (event) => {
        this.setState({
            isSoftPity : event.target.value
        }, function() {this.calculateRolls(event) })
    }

    handleMonthlyCardChange = (event) => {
        
        this.setState({
            monthly : event.target.value
        } ,  function() {this.calculateRolls(event) })
    }

    calculateDays = (currentPrimo , hasMonthly , pity, softPity) => {
        let newDay = 0;
        let targetRolls = FIRST5STARPRIMOCOUNT;
        if(softPity === 'true'){
            targetRolls = SOFTPITYPRIMO;
        }
        if(hasMonthly === 'true'){
            newDay = Math.max(0,Math.ceil((targetRolls - currentPrimo - (pity * COSTPERROLL)) /  (DAILYCOMMISIONGEMS + MONTHLYPERDAY)));
        }else{
            newDay = Math.max(0,Math.ceil((targetRolls - currentPrimo - (pity * COSTPERROLL)) /  (DAILYCOMMISIONGEMS)));
        }
        return newDay;
    }
    
    calculateRolls = event => {
        let currentPrimo = parseInt(this.state.primogems);
        currentPrimo = currentPrimo || 0;
        let pity = parseInt(this.state.pity);
        pity = pity || 0;
        let newRolls = currentPrimo / COSTPERROLL;

        let newDay =  this.calculateDays(currentPrimo , this.state.monthly, pity, this.state.isSoftPity);

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
                <div>
                    <label> Pity: </label>
                    <input type="text"
                    value = {this.state.pity}
                    onChange={this.handlePityChange}
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
                <p>Soft Pity? (76 rolls)</p>
                <select onChange = {this.handleSoftPityChange} value = { this.state.isSoftPity}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>
            </div>

        )
    }
}

export default PrimoForm
