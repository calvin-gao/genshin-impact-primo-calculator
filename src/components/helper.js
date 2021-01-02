export const DAILYCOMMISIONGEMS = 60;
export const COSTPERROLL = 160;
export const MONTHLYPERDAY = 90;
//const MONTHLYINITIAL = 300;
export const FIRST5STARPRIMOCOUNT = 14400;
export const GURANTEEBANNER5STAR = 28800;
export const SOFTPITYPRIMO = 12160;
export const TWOTIMESOFTPITY = 24320;
export const REMOVENUMERIC = ['.',' ', '-', '+'];


export function isNumeric(n) {
    if ((!isNaN(parseFloat(n)) && isFinite(n)) || n === ""){
        let number = null;

        //quick cancel if trying to add float
        for (let i in n){
            if(REMOVENUMERIC.includes(n[i])){
                return false;
            }
        }

        if (n === ""){
            number = 0.0;
        }else{
            number = parseFloat(n);
        }

        if (number !== Math.ceil(number)){
            return false;
        }
        return true;
    }
    return false;
};
