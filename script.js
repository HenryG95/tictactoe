const board = (function () {
    let boardArray = [0,0,0,0,0,0,0,0,0]
    let turn = true;
    let pad = document.querySelectorAll('.pad');
    let board = document.querySelector('#board');
    let fakeBoard = document.querySelector('#fakeBoard');
    pad.forEach(item => {
            item.addEventListener('click',() => {
                insert(parseInt(item.getAttribute('id')));
                draw();
                check();
            });
    });
    function drawFake () {
        let fakePad = document.querySelectorAll('.fakePad');
        for(let i = 0; i<boardArray.length;i++) {
            if(boardArray[i] == 1) {
                fakePad[i].innerHTML = '<h1 id="x">X<h1>';
            } else if(boardArray[i] == 2) {
                fakePad[i].innerHTML = '<h1 id="o">O<h1>';
            } else if(boardArray[i] == 0){
                fakePad[i].innerHTML = '';
            }
        }
    }
    function draw () {
        let pad = document.querySelectorAll('.pad');
        for(let i = 0; i<boardArray.length;i++) {
            if(boardArray[i] == 1) {
                pad[i].innerHTML = '<h1 id="x">X<h1>';
            } else if(boardArray[i] == 2) {
                pad[i].innerHTML = '<h1 id="o">O<h1>';
            } else if(boardArray[i] == 0){
                pad[i].innerHTML = '';
            }
        }
    }
    
    function reset() {
        board.style.display = 'grid';
        fakeBoard.style.display = 'none';
        winner.body.removeChild(winner.div);
        boardArray = [0,0,0,0,0,0,0,0,0];
        draw();
    }

    function end(number) {
        board.style.display = 'none';
        fakeBoard.style.display = 'grid';
        drawFake();
        if(number == 1) {
            winner.div.innerHTML = 'Player 1 Wins The Game!'
        } else if(number == 2) {
            winner.div.innerHTML = 'Player 2 Wins The Game!'
        } else if(number == 0) {
            winner.div.innerHTML = "It's a Tie!"
        }
        turn = !turn;
        winner.div.appendChild(winner.button);
        winner.body.appendChild(winner.div);

    }

    function checkWinner (player) {
        let positionWin = [[0,4,8],[0,3,6],[0,1,2],[2,4,6],[2,5,8],[6,7,8],[3,4,5],[1,4,7]];
        for(let i=0;i < positionWin.length;i++) {
            if(boardArray[positionWin[i][0]] == player 
               && boardArray[positionWin[i][1]] == player 
               && boardArray[positionWin[i][2]] == player
            ) {
                end(player);
            }
        }
    }

    function check () {
        if(boardArray.every(item => item != 0)) {
            end(0);
        }
        checkWinner(1);
        checkWinner(2);

    }

    function insert (position) {
        if(boardArray[position] != 0) {
            console.log("You can't play there")
        } else {
            if(turn == true) {
            boardArray[position] = 1;
            } else {
            boardArray[position] = 2;
            }
            turn = !turn;
        }
    };

    return {
        reset
    };
})();

const winner = (function() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    const button = document.createElement('button');
    div.setAttribute('class','winner');
    button.setAttribute('class','winner');
    button.innerHTML = 'Play Again?';
    button.addEventListener('click',() => {
        board.reset();
    })

    return {
        body,div,button
    }

})();
