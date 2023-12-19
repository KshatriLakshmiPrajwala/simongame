let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let started=false;//started will show whether the game is started or not
let level=0;
let highScore=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    //game will start only once
  if(started==false){
    console.log("game is started");
    started=true;
    levelUp();
  }
}); //we must ensure that pointer is not on console window

 function gameFlash(btn){
  btn.classList.add("flash");//when the classlist is added background color becomes white(styling is added in css)
  setTimeout(function(){
    btn.classList.remove("flash");
  },250);
 }

 function userFlash(btn){
  btn.classList.add("userflash");//background color changes to green when the user press
  setTimeout(function(){
    btn.classList.remove("userflash");
  },250);
 }
function levelUp(){
  userSeq=[];//when levelUp is called userSeq will reset to empty value bcz user should remember and enter the sequence from beginning
    level++;
    h2.innerText=`Level ${level}`;
    //random btn choose
    let randIdx=Math.floor(Math.random() * 3);//random index is choosen from 0 to 3
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);//game will flash randomly
}



function btnPress(){
 
 let btn=this;//the button that we pressed
 userFlash(btn);//flashes when button is pressed by user

 userColor=btn.getAttribute("id");
 userSeq.push(userColor);
 checkAns(userSeq.length-1);
}
function checkAns(idx){
  
  if(userSeq[idx]==gameSeq[idx]){
    if(userSeq.length==gameSeq.length)
    {
      setTimeout(levelUp,1000);//levelUp delays by 1sec
    }
  }else{
    if (level > highScore) {
      highScore = level; // Update the high score if the current level is higher
    }
    h2.innerHTML=`Game Over! Your score was <b>${level}</b><br> HighScore is <b>${highScore}</b> <br> Press any key to start`;
    document.querySelector("body").style.backgroundColor="red";//when user presses wrong background color changes to red
    setTimeout(function(){
      document.querySelector("body").style.backgroundColor="white";
    },1000);//afer 1 sec background color is set to white
    reset();//after completing game if we press any key the game is not starting so we need to reset the game
  }
}

let allBtns=document.querySelectorAll(".btn");//selecting all btns of index.html
for(btn of allBtns){
  btn.addEventListener("click",btnPress);
}

function reset(){
  started=false;
  gameSeq=[];
  userSeq=[];
  level=0;
}