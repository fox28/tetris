

// 游戏矩阵 —— 相当于MVC中的M
var gameData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
];

var nextData = [
    [0, 2, 2, 0],
    [0, 2, 2, 0],
    [0, 2, 2, 0],
    [0, 0, 0, 0]
];

// DOM(div标签)的二维数组
var gameDivArr = [];
var nextDivArr = [];




// 初始化 DOM的二维数组
var initGameDiv = function () {
    for(var i=0; i<gameData.length; i++) {
        var div = [];
        for(var j=0; j<gameData[i].length; j++) {
            var newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = i*20 + 'px';
            newNode.style.left = j*20 + 'px';
            document.getElementById('game').appendChild(newNode);
            div.push(newNode);
        }
        gameDivArr.push(div);
    }
}


var initNextDiv = function () {
    for(var i=0; i<nextData.length; i++) {
        var div = [];
        for(var j=0; j<nextData[i].length; j++) {
            var newNode = document.createElement('div');
            newNode.className = 'none';
            newNode.style.top = i*20 + 'px';
            newNode.style.left = j*20 + 'px';
            document.getElementById('next').appendChild(newNode);
            div.push(newNode);
        }
        nextDivArr.push(div);
    }
}

// 刷新数据，通过游戏矩阵改变DOM二维数据的元素的className
var refreshDiv = function (data, divArr) {
    for(var i=0; i<data.length; i++) {
        for(var j=0; j<data[i].length; j++) {
            if(data[i][j] == 0) {
                divArr[i][j].className = 'none';
            }else if(data[i][j] == 1){
                divArr[i][j].className = 'done';
            }else if(data[i][j] == 2){
                divArr[i][j].className = 'current';
            }
        }
    }
}

// 设置数据
var setData = function () {
    for(var i=0; i<current.data.length; i++) {
        for(var j=0; j<current.data[i].length; j++) {
            gameData[current.origin.x+i][current.origin.y+j] = current.data[i][j];
        }
    }
}

// 初始化div的二维数组
initGameDiv();
initNextDiv();


// 刷新数据
refreshDiv(nextData, nextDivArr);
refreshDiv(gameData, gameDivArr);


