import {Game} from './game.js';
import {Player, CPU} from './participants.js'
import { Scissors,Rock,Paper } from './sign.js';
let choices = [new Rock(), new Paper(), new Scissors()];
let clickedSign = false;
let tutView = false;
$(document).ready( ()=>{
    
    let game = new Game();
    setPoints(game.player,game.cpu);
    tutOnclick();
    if(clickedSign==false){
        sci(game, clickedSign);
        pap(game, clickedSign);
        roc(game, clickedSign);
    }
    newGameClick(game);
    resetGame();
});

let tutOnclick = ()=>{
    $(".tut").on("click", ()=>{
        if(!tutView)
            $("body").append(tutorial());
        $("#close").on("click",() =>{
            $(".tutInfo").remove();
            tutView = false;
        });
        tutView = true;
    });
    
};

let tutorial = ()=>{
    let image = $("<img/>", {
        src:"./images/image-rules.svg",
        alt:"Tutorial Information",
        class:"imgRules"
    });
    let imageHolder = $("<div></div>", {
        class:"tutInfo"
    });
    let close = $("<img/>", {
        src:"./images/icon-close.svg",
        alt:"Tutorial Information",
        id:"close"
    });
    
    imageHolder.append(close);
    imageHolder.append(image);
    imageHolder.append("<span class=\"ruleTit\">RULES</span>");
    return imageHolder;
};
let reveal = ()=>{
    $(".vs").addClass("visible");
    $(".cpuBack").addClass("visible");
    $(".vs").addClass("slidefromTop");
    setTimeout(()=>{
        $(".cpuChoice").addClass("visible");
        $(".Winner").css("visibility", "visible");
        $(".Winner").addClass("visible")
    },1800);
};
let reset = ()=>{
    $(".vs").removeClass("visible");
    $(".cpuBack").removeClass("visible");
    $(".vs").removeClass("slidefromTop");
    $(".cpuChoice").removeClass("visible");
    $(".paper").removeClass("move");
    $(".rock").removeClass("move");
    $(".scissors").removeClass("move");
    $(".triangle").removeClass("dissolve");
    $(".rock").removeClass("dissolve");
    $(".paper").removeClass("dissolve");
    $(".scissors").removeClass("dissolve");
    $(".Winner").removeClass("visible");
    setTimeout(()=>{$(".Winner").css("visibility", "hidden");clickedSign = false; console.log("done")},1800);
    
};
let resetGame = ()=>{
    $(".playAgain").on("click",()=>{
        reset();
    });
};
let sci = (game)=>{
    $(".scissors").on("click",()=>{
        console.log(clickedSign);
        if(!clickedSign){
            PrintInfo(game.cpu, game.player, choices[2])
            clickedSign = true;
            $(".scissors").addClass("move");
            $(".triangle").addClass("dissolve");
            $(".rock").addClass("dissolve");
            $(".paper").addClass("dissolve");
            reveal();
        }
        
    });
};
let pap = (game)=>{
    $(".paper").on("click",()=>{
        console.log(clickedSign);
        if(!clickedSign){
            clickedSign = true;
            PrintInfo(game.cpu, game.player, choices[1])
            $(".scissors").addClass("dissolve");
            $(".triangle").addClass("dissolve");
            $(".rock").addClass("dissolve");
            $(".paper").addClass("move");
            reveal();
        }
    });
};
let roc = (game)=>{
    $(".rock").on("click",()=>{
    console.log(clickedSign);
        if(!clickedSign){
            clickedSign = true;
            PrintInfo(game.cpu, game.player, choices[0])
            $(".scissors").addClass("dissolve");
            $(".triangle").addClass("dissolve");
            $(".rock").addClass("move");
            $(".paper").addClass("dissolve");
            reveal();
        }
        
    });
};
let newGameClick = (game)=>{
    $(".resetGame").on("click", ()=>{
        newGame(game.player, game.cpu);
        setPoints(game.player,game.cpu);
    })
}
let newGame = (p,c)=>{
    localStorage.setItem("player", 0);
    localStorage.setItem("cpu", 0);
    p.points = 0;
    c.points = 0;
}
let PrintInfo = (cpu,player,plyThrown)=>{
    cpu.currentThrown = cpu.throwSign();
    let winner = Game.getWinner(player,cpu,plyThrown);
    let cpuHand = $("<img/>",{
        src:`images/icon-${cpu.currentThrown.sign}.svg`,
        alt:cpu.currentThrown.sign
    });
    let cpuHolder = $("<div></div>",{
        class:"cpuChoice"
    });
    cpuHolder.append(cpuHand);
    //........................................
    let wDiv = $("<div></div>",{
        class:"Winner"
    });
    let wSpan = $("<span></span>",{
        html:winner
    });
    wDiv.append(wSpan);
    wDiv.append("<button class=\"playAgain\">Play Again</button>"); 
    $(".chooseSign").append(wDiv);
    $(".chooseSign").append(cpuHolder);
    $(".playAgain").on("click",()=>{
        reset();
        setTimeout(()=>{
            $(".cpuChoice").remove();
            $(".Winner").remove();
        },1000);
    });
}

export let setPoints = (playerStat, cpu)=>{
    $(".PLAYER .diget").text(playerStat.points);
    $(".PLAYER .pl").text(playerStat.name);

    $(".CPU .diget").text(cpu.points);

};

export let getPoints = (name)=>{
    let val = localStorage.getItem(name);
    if(val)
        return val;
    else
        return 0;
};