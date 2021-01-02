import React, { Component } from 'react';
import * as helper from "./helper.js";

export class StandardBanner extends Component{
    constructor(props) {
        super(props)
        this.state = {
             primogems : localStorage.getItem('StandardPrimo') || '',
             fates : localStorage.getItem('StandardFates') || 0,
             pity: localStorage.getItem('StandardPity') || 0,
             monthly: (localStorage.getItem('monthly')  === 'true' ? true : false),
             isSoftPity: (localStorage.getItem('isSoftPity')  === 'true' ? true : false),
             rolls : 0, 
             daysTo5Star: 240,
        };
    }

    componentDidMount = () => {
        this.calculateRolls(null);
    }


    handlePrimogemsChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                primogems : event.target.value
            } , function() { localStorage.setItem( 'StandardPrimo', this.state.primogems ); this.calculateRolls(event);})
        }
    }

    handlePityChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                pity: event.target.value
            } , function(){ this.calculateRolls(event); localStorage.setItem( 'StandardFates', this.state.pity);})
        }
    }
    
    handleFateChange = (event) => {
        if(helper.isNumeric(event.target.value)){
            this.setState({
                fates : event.target.value
            }, function() {this.calculateRolls(event); localStorage.setItem( 'StandardPity', this.state.fates);})
        }
    }

    handleSoftPityChange = (event) => {
        this.setState({
            isSoftPity : event.target.value
        }, function() {this.calculateRolls(event); localStorage.setItem( 'isSoftPity', this.state.isSoftPity);} )
    }


    calculateDays = (currentPrimo , hasMonthly , softPity, lastRoll5Star) => {
        let newDay = 0;

        let targetRolls = helper.FIRST5STARPRIMOCOUNT;

        if(lastRoll5Star){
            targetRolls = helper.GURANTEEBANNER5STAR;
        }

        if(softPity === 'true'){
            if(lastRoll5Star){
                targetRolls = helper.TWOTIMESOFTPITY;
            }else{
                targetRolls = helper.SOFTPITYPRIMO;
            }
        }
    
        let dailyPrimosGet = helper.DAILYCOMMISIONGEMS;
        if (hasMonthly === 'true'){
            dailyPrimosGet += helper.MONTHLYPERDAY
        }

        newDay = Math.max(0,Math.ceil((targetRolls - currentPrimo) / dailyPrimosGet));
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

        let newDay =  this.calculateDays(newPseudoPrimo, this.state.monthly, this.state.isSoftPity, false);
        let newRolls = currentPrimo / helper.COSTPERROLL;

        this.setState(
            {rolls : newRolls,
            daysTo5Star : newDay,
            }
        );
    }

    render(){
        return(
            <div>
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
                </div>

                <h5>You have : {`${this.state.rolls}`} rolls </h5>
                <h5>You are {`${this.state.daysTo5Star}`} days from a random 5 star</h5>   
            </div>
        )
    }
}

export default StandardBanner