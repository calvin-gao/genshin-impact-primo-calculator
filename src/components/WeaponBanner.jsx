import React, { Component } from 'react';
import * as helper from "./helper.js";

export class WeaponBanner extends Component{
    constructor(props) {
        super(props)
        this.state = {
             primogems : localStorage.getItem('WeaponPrimo') || '',
             fates : localStorage.getItem('WeaponFates') || 0,
             pity: localStorage.getItem('WeaponPity') || 0,
             rolls : 0, 
             daysTo5Star: 240
        };
    }
    
    componentDidMount = () => {
        this.calculateRolls(null);
    }

    handlePrimogemsChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                primogems : event.target.value
            } , function() { localStorage.setItem( 'WeaponPrimo', this.state.primogems ); this.calculateRolls(event);})
        }
    }

    handlePityChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                pity: event.target.value
            } , function(){ this.calculateRolls(event); localStorage.setItem( 'WeaponPity', this.state.pity);})
        }
    }
    
    handleFateChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                fates : event.target.value
            }, function() {this.calculateRolls(event); localStorage.setItem( 'WeaponFates', this.state.fates);})
        }
    }


    calculateDays = (currentPrimo , hasMonthly) => {
        let newDay = 0;

        let dailyPrimosGet = helper.DAILYCOMMISIONGEMS;
        if (hasMonthly === 'true'){
            dailyPrimosGet += helper.MONTHLYPERDAY
        }
        console.log(Math.ceil((helper.WEAPONBANNER5STAR - currentPrimo) / dailyPrimosGet));

        newDay = Math.max(0,Math.ceil((helper.WEAPONBANNER5STAR - currentPrimo) / dailyPrimosGet));
        return newDay;
    }
    
    calculateRolls = (event) => {
        let currentPrimo = parseInt(this.state.primogems);
        currentPrimo = currentPrimo || 0;
        let pity = parseInt(this.state.pity);
        pity = pity || 0;
        let fates = parseInt(this.state.fates);
        fates = fates || 0;

        // calculate new primos based on pity, fates, and current primos
        let newPseudoPrimo = currentPrimo + ((pity + fates) * helper.COSTPERROLL);

        let newDay =  this.calculateDays(newPseudoPrimo, localStorage.getItem('monthly'));
        let newRolls = currentPrimo / helper.COSTPERROLL;

        this.setState(
            {rolls : newRolls,
            daysTo5Star : newDay
            }
        );
    }
    
    render(){
        return(
            <div>
                <div>
                    <label className="mx-2"> Primogems: </label>
                    <input type="text"
                    value = {this.state.primogems}
                    onChange={this.handlePrimogemsChange}
                    onKeyUp={this.calculateRolls}
                    />
                </div>
                <div>
                    <label className="mx-2"> Pity: </label>
                    <input type="text"
                    value = {this.state.pity}
                    onChange={this.handlePityChange}
                    onKeyUp={this.calculateRolls}
                    />
                </div>
                <div>
                    <label className="mx-2"> Fates:</label>
                    <input type="text"
                    value = {this.state.fates}
                    onChange={this.handleFateChange}
                    onKeyUp={this.calculateRolls}
                    />
                </div>   

                <h5>You have : {`${this.state.rolls}`} rolls </h5>
                <h5>You are {`${this.state.daysTo5Star}`} days from a 5 star weapon</h5>           
            </div>
        )
    }

}

export default WeaponBanner;