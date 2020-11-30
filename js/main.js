var gBoard;
var gGameInterval;
var gNums
var gCounter
var gLength = 2;
var gTime

function init() {
    newGame()
}

function newGame() {
    gBoard = createBoard();
    renderBoard(gBoard);
    gCounter = 1
    renderNextNum() 
}


function cellClicked(clickedNum) {
    var value = + clickedNum.dataset.value

    if (gCounter === 1) {
        gTime = 0;
        startTimer()

    }
    if (gCounter === gLength ** 2) {
        snapModal();
        var elNextNum = document.querySelector('.time');
        elNextNum.innerText = "game time: "+gTime;

        clearInterval(gGameInterval);
    }

    if (gCounter === value) {   
        gCounter++
        renderNextNum();
        clickedNum.classList.add('pushed')
        
    }
}

function startTimer() {
    gGameInterval = setInterval(() => {
        gTime++;
    }, 1000);

}


function snapModal() {
    var elModal = document.querySelector(".modal");
    elModal.style.display = "block";
    setTimeout(function () {
        elModal.style.display = "none";
    }, 3000);
}

function changDifficulty(newLength){
    gLength = newLength;
    newGame();    
}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            strHtml += `<td  data-value="${board[i][j]}"  data-i="${i}" data-j="${j}"
            onclick="cellClicked(this)"
            class="cell cell${board[i][j]}">${board[i][j]}</td>`
        }
        strHtml += '</tr>'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHtml
}


function createBoard() {
    gNums = resetNums()
    var board = [];
    for (var i = 0; i < gLength; i++) {
        board.push([])
        for (var j = 0; j < gLength; j++) {
            board[i][j] = drawNum()
        }
    }
    return board;
} 

function resetNums() {
    var nums = []
    for (let i = 0; i < gLength ** 2; i++) {
        nums.push(i + 1)
    }
    return nums
}

function drawNum() {
    var idx = getRandomInt(0, gNums.length);
    return gNums.splice(idx, 1)[0];
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function renderNextNum() {
    var elNextNum = document.querySelector('.next-num');
    if (gCounter <= gLength**2) {
        
        next = gCounter 
        elNextNum.innerText = "next number: " + next;
    } else {
        elNextNum.innerText = 'e-n-d-g-a-m-e'
    }
}
