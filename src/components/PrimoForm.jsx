import React, { Component } from 'react'

const COSTPERROLL = 160;
const DAILYCOMMISIONGEMS = 60;
const MONTHLYPERDAY = 90;
//const MONTHLYINITIAL = 300;
const FIRST5STARPRIMOCOUNT = 14400;
const GURANTEEBANNER5STAR = 28800;
const SOFTPITYPRIMO = 12160;
const TWOTIMESOFTPITY = 24320;


function isNumeric(n) {
    return (!isNaN(parseFloat(n)) && isFinite(n)) || n === "";
};

export class PrimoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
             primogems : '' || localStorage.getItem('primo'),
             rolls : 0 || localStorage.getItem('rolls'), 
             fates : 0 || localStorage.getItem('fates'),
             pity: 0 || localStorage.getItem('pity'),
             monthly: (localStorage.getItem('monthly')  === 'true' ? true : false),
             daysTo5Star: localStorage.getItem('daysTo5Star') || 240,
             daysToBanner5Star: localStorage.getItem('daysToBanner5Star') || 480 ,
             isSoftPity: (localStorage.getItem('isSoftPity')  === 'true' ? true : false)
        }

    }


    handlePrimogemsChange = (event) => {
        if(isNumeric(event.target.value)){
            this.setState({
                primogems : event.target.value
            } , function() { localStorage.setItem( 'primo', this.state.primogems ); this.calculateRolls(event);})
        }
    }

    handlePityChange = (event) => {
        if(isNumeric(event.target.value)){
            this.setState({
                pity: event.target.value
            } , function(){ this.calculateRolls(event); localStorage.setItem( 'pity', this.state.pity);})
        }
    }
    
    handleFateChange = (event) => {
        if(isNumeric(event.target.value)){
            this.setState({
                fates : event.target.value
            }, function() {this.calculateRolls(event); localStorage.setItem( 'fates', this.state.fates);})
        }
    }

    handleSoftPityChange = (event) => {
        this.setState({
            isSoftPity : event.target.value
        }, function() {this.calculateRolls(event); localStorage.setItem( 'isSoftPity', this.state.isSoftPity);} )
        //console.log(localStorage.getItem('isSoftPity'));
    }


    handleMonthlyCardChange = (event) => {
        this.setState({
            monthly : event.target.value
        } ,  function() {this.calculateRolls(event); localStorage.setItem('monthly', this.state.monthly)})
    }

    calculateDays = (currentPrimo , hasMonthly , softPity, lastRoll5Star) => {
        let newDay = 0;

        let targetRolls = FIRST5STARPRIMOCOUNT;

        if(lastRoll5Star){
            targetRolls = GURANTEEBANNER5STAR;
        }

        if(softPity === 'true'){
            if(lastRoll5Star){
                targetRolls = TWOTIMESOFTPITY;
            }else{
                targetRolls = SOFTPITYPRIMO;
            }
        }
    
        let dailyPrimosGet = DAILYCOMMISIONGEMS;
        if (hasMonthly === 'true'){
            dailyPrimosGet += MONTHLYPERDAY
        }

        newDay = Math.max(0,Math.ceil((targetRolls - currentPrimo) / dailyPrimosGet));
        return newDay;
    }
    
    calculateRolls = event => {
        let currentPrimo = parseInt(this.state.primogems);
        currentPrimo = currentPrimo || 0;
        let pity = parseInt(this.state.pity);
        pity = pity || 0;
        let fates = parseInt(this.state.fates);
        fates = fates || 0;

        // calculate new primos based on pity, fates, and current primos
        let newPseudoPrimo = currentPrimo + ((pity + fates) * COSTPERROLL);

        let newDay =  this.calculateDays(newPseudoPrimo, this.state.monthly, this.state.isSoftPity, false);
        let newGurante5StarDay = this.calculateDays(newPseudoPrimo, this.state.monthly, this.state.isSoftPity, true);
        let newRolls = currentPrimo / COSTPERROLL;

        this.setState(
            {rolls : newRolls,
            daysTo5Star : newDay,
            daysToBanner5Star : newGurante5StarDay
         }, function(){ localStorage.setItem('rolls', this.state.rolls);
         localStorage.setItem('daysTo5Star', this.state.daysTo5Star);
         localStorage.setItem('daysToBanner5Star', this.state.daysToBanner5Star);
        }
        );
    }
    
    render() {
        return (
            <div>
                <div class="row">
                    <div class="col-1"></div>
                    <div class="col-5">
                        <div>
                            <label class="mx-2"> Primogems: </label>
                            <input type="text"
                            value = {this.state.primogems}
                            onChange={this.handlePrimogemsChange}
                            onKeyUp={this.calculateRolls}
                            />
                        </div>
                        <div>
                            <label class="mx-2"> Pity: </label>
                            <input type="text"
                            value = {this.state.pity}
                            onChange={this.handlePityChange}
                            onKeyUp={this.calculateRolls}
                            />
                        </div>
                        <div>
                            <label class="mx-2"> Fates:</label>
                            <input type="text"
                            value = {this.state.fates}
                            onChange={this.handleFateChange}
                            onKeyUp={this.calculateRolls}
                            />
                        </div>
                    </div>
                    <div class="col-4">
                        <p class="m-1">Welkin Moon</p>
                        <select onChange = {this.handleMonthlyCardChange} value = { this.state.monthly}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                        <p class="m-1">Soft Pity? (76 rolls)</p>
                        <select onChange = {this.handleSoftPityChange} value = { this.state.isSoftPity}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>
                <h5>You have : {`${this.state.rolls}`} rolls </h5>
                <h5>You are {`${this.state.daysTo5Star}`} days from a random 5 star</h5>
                <h5>You are {`${this.state.daysToBanner5Star}`} days from a guaranteed 5 star</h5>
            </div>

        )
    }
}

export default PrimoForm
