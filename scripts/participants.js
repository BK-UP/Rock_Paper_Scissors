import {Rock, Paper, Scissors} from './sign.js';
import {getPoints} from './main.js'
export class Player{
    constructor(name){
        this.name = "Player";
        this.points = getPoints("player");
    }

    throwSign(signToThrow){
        return signToThrow;
    }
    getPoints(){
        return this.points;
    }
    setPoints(points){
        this.points = points;
    }
    incrementPoints(){
        this.points++;
    }

}
export class CPU{
    constructor(){
        this.name = "CPU";
        this.points = getPoints("cpu");
        this.currentThrown = null;
    }
    static choicesOfThrow = [new Rock(), new Paper(), new Scissors()];

    throwSign(){
        const choice  = Math.floor(Math.random()*3);
        let ch = (CPU.choicesOfThrow[choice]);
        return ch;
    }
    getPoints(){
        return this.points;
    }
    incrementPoints(){
        this.points++;
    }
    setPoints(points){
        this.points = points;
    }
}