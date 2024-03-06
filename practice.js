let gameseq=[];
let userseq=[];
let btns = ["red","cyan","orange","blue"];

let started = false;
let level = 0;
let hlevel = 0;
let h2 = document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(!started){
        console.log("game started");
        started=true;
        levelup();
    }
})

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 100);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 100);
}

function levelup(){
    userseq=[];
    level++;
    hlevel = Math.max(level,hlevel);
    h2.innerHTML=`Level ${level}<br> Highest level reached in the current game ${hlevel}`;

    let ranidx = Math.floor(Math.random() * btns.length);
    let randcolor = btns[ranidx];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameflash(randbtn);
}

function checkans(index){
    if(userseq[index] === gameseq[index]){
        if(userseq.length === gameseq.length){
            document.querySelector("body").style.backgroundColor="green";
            setTimeout(function(){ 
                document.querySelector("body").style.backgroundColor="white";}
            ,120);
           
            setTimeout(levelup, 1000);
        }
    }
    else{
        h2.innerHTML = `Game Over! YOUR SCORE WAS <b>${level}</b><br> Press any key to restart`; 
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){ 
            document.querySelector("body").style.backgroundColor="white";}
        ,120);
        reset();
    }
}

function btnpress(){
    let btn = this;
    userflash(btn);
    let usercolor = btn.getAttribute("id");

    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for(let btn of allbtn){
    btn.addEventListener("click", btnpress);
}

function reset(){
    gameseq = [];
    userseq = [];
    started = false;
    level = 0;
}

//j