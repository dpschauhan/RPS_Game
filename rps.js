let userMove="";
let computerMove="";
let result="";
let game=JSON.parse(localStorage.getItem('game')) || {
    win :0,
    lose :0,
    tie : 0
};
let gameHistory=JSON.parse(localStorage.getItem('gameHistory')) || [];

function captureUserMove(move) {
    userMove=move;
}
rendergamesummary();
rendergamehistory();
function generateComputerMove(){
    CM=Math.floor(Math.random()*3);
    if(CM===0){
        computerMove='Rock';
    }
    else if(CM===1){
        computerMove='Paper';
    }
    else {
        computerMove='Scissor';
    }
}

function evaluatemoves(){
    if(userMove === computerMove){
        result ='Tie';
    }
    else if ((userMove==='Rock' && computerMove==='Scissor')||
    (userMove==='Paper' && computerMove==='Rock')||
    (userMove==='Scissor' && computerMove==='Paper'))
    {
        result = 'Win';
    }
    else {
        result='Lose'
    }
    var x = document.getElementById("snackbar");
    x.className = "show"; 
    document.getElementById("snackbar").innerHTML=result;
    setTimeout(function(){ x.className = x.className.replace("show", "") ; }, 1000);
}

function rendergamesummary() {
    var gameplayed=game.win+game.tie+game.lose;
    console.log(`userMove : ${userMove}
    computerMove : ${computerMove}
    Result : ${result} Gameplayed : ${gameplayed}`)
    console.log(game);

    document.getElementById('wins').innerHTML=game.win;
    document.getElementById('lose').innerHTML=game.lose;
    document.getElementById('tie').innerHTML=game.tie;
    document.getElementById('gameplayed').innerHTML=gameplayed;
    console.log(game);
    
}
function updategamescore() {
    if (result === 'Win'){
        game.win++;
    }
    else if (result==='Tie'){
        game.tie++;
    }
    else game.lose++;
    const gameHistoryItem = {userMove: userMove , computerMove: computerMove, result : result};
    gameHistory.push(gameHistoryItem);
    localStorage.setItem( 'game',JSON.stringify(game));
    localStorage.setItem( 'gameHistory', JSON.stringify(gameHistory));

    
}

function rendergamehistory () {
    let finalGameHistoryHTML = `<tr>
    <th>#</th>
    <th>User Move</th>
    <th>Computer Move</th>
    <th>Result</th>
</tr>`;
    console.log(`userMove: $(userMove) computerMove: ${computerMove} resu1t:${result}`);
    console.log(gameHistory) ;
    for (let i = 0; i < gameHistory.length; i++) {
        finalGameHistoryHTML+=`
        <tr>
        <td >${i+1}</td>
        <td >${gameHistory[i].userMove}</td>
        <td >${gameHistory[i].computerMove}</td>
        <td >${gameHistory[i].result}</td>
        </tr>
        `;
    }
    document.querySelector('#gameHistory').innerHTML =finalGameHistoryHTML;
}

getElementById('game').innerHTML

function resetscores() {
    gameHistory=[];
    game={win:0, lose:0, tie:0};
}