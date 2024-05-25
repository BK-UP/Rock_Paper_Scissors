import {Player, CPU} from './participants.js';
import {setPoints} from './main.js'
export class Game{
    constructor(name = "player"){
        this.player = new Player(name); 
        this.cpu = new CPU();
        Game.setCookiePoints("player", 0);
        Game.setCookiePoints("cpu", 0);
    }
    static setCookiePoints(name, points){
        localStorage.setItem(name, points);
    }
    static getWinner(p,c/*.thrownSign()*/,playersHand){
        //console.log(p,c);
        if(p.throwSign(playersHand).sign == c.currentThrown.sign)
            return "Its A Draw";

        else if(p.throwSign(playersHand).getWeakness() == c.currentThrown.sign){
            c.incrementPoints();
            Game.setCookiePoints("cpu", c.points);
            Game.setCookiePoints("player", p.points);
            setTimeout(()=>{setPoints(p,c);},1800);
            return c.name +" has Won!"
        }
        else{
            p.incrementPoints();
            Game.setCookiePoints("player", p.points);
            Game.setCookiePoints("cpu", c.points);
            setTimeout(()=>{setPoints(p,c);},1800);
            let playerName = p.name.charAt(0).toUpperCase() + p.name.slice(1);
            return playerName +" has Won!"
        }
    }
    
} 





/*export function getPoints(name) {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split(';');
    for (let cookie of cookiesArray) {
        const trimmedCookie = cookie.trim();
        const [cookieName, cookieValue] = trimmedCookie.split('=');

        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }

}





/*static setCookiePoints(name, points){
        const date = new Date();
        date.setTime(date.getTime() + (30 * 60 * 1000));// 30 for 30mins
        let expires = "; expires=" + date.toUTCString();
        document.cookie = name + "="+(points||"0")+expires+"; path=/";
    }*/