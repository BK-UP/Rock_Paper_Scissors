export class Signs{
    getWeakness(){
        console.log("Has no weakness");// note for abstract class
        return null;
    }
    static getWinner(player, cpu){
        if(player.sign == cpu.sign)// if same draw
            return "draw";
        else if(player.getWeakness() == cpu.sign)
            return cpu;
        else
            return player;
    }

}
//......................................................................
export class Rock extends Signs{
    constructor(){
        super();
        this.sign = "rock";
        this.weakness = "paper";
    }
    getWeakness(){
        return this.weakness;
    }
}
//-------------------------------
export class Paper extends Signs{
    constructor(){
        super();
        this.sign = "paper";
        this.weakness = "scissors";
    }
    getWeakness(){
        return this.weakness;
    }
}
//-------------------------------
export class Scissors extends Signs{
    constructor(){
        super();
        this.sign = "scissors";
        this.weakness = "rock";
    }
    getWeakness(){
        return this.weakness;
    }
}
//...............................................