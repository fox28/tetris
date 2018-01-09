
var Game = function () {

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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var nextData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    // DOM(div标签)的二维数组
    var gameDivArr = [];
    var nextDivArr = [];

    // game, next 的container
    var gameDiv;
    var nextDiv;


    // 当前方块
    var current;
    // 下一个方块
    var next;


    // 初始化 DOM的二维数组
    var initDiv = function (container,data,divArr) {
        for(var i=0; i<data.length; i++) {
            var div = [];
            for(var j=0; j<data[i].length; j++) {
                var newNode = document.createElement('div');
                newNode.className = 'none';
                newNode.style.top = i*20 + 'px';
                newNode.style.left = j*20 + 'px';
                container.appendChild(newNode);
                div.push(newNode);
            }
            divArr.push(div);
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
                if(checkDot(current.origin,i,j)) {
                    gameData[current.origin.x+i][current.origin.y+j] = current.data[i][j];
                }

            }
        }
    }

    // 清除数据
    var clearData = function () {
        for(var i=0; i<current.data.length; i++) {
            for(var j=0; j<current.data[i].length; j++) {
                if(checkDot(current.origin,i,j)) {
                    if(current.data[i][j] != 0){
                        gameData[current.origin.x + i][current.origin.y+j] = 0;
                    }
                }
            }
        }
    }

    // 核对是否可以移动（下移，翻转等）
    var checkData = function (pos) {
        for(var i=0; i<current.data.length; i++) {
            for(var j=0; j<current.data[i].length; j++) {
                if(current.data[i][j] != 0) {
                    if(!checkDot(pos, i, j)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    // 检查（移动后的）点是否合法
    var checkDot = function (pos, x, y) {

        // 简写 用 ||
        if(pos.x+x<0 || pos.x+x >=gameData.length || pos.y+y<0 || pos.y+y >=gameData[1].length){
            return false;
        }else if(gameData[pos.x+x][pos.y+y] == 1) { // 已有降落方块
            return false;
        }else {
            return true;
        }
    }

    // 下移
    var down = function () {
        if(current.isDown(checkData)) {
            clearData();
            current.down();
            setData();
            refreshDiv(gameData, gameDivArr);
            return true;
        }else {
            return false;
        }
    }

    // 左移
    var left = function () {
        if(current.isLeft(checkData)) {
            clearData();
            current.left();
            setData();
            refreshDiv(gameData, gameDivArr);
        }
    }

    // 右移
    var right = function () {
        if(current.isRight(checkData)) {
            clearData();
            current.right();
            setData();
            refreshDiv(gameData, gameDivArr);
        }
    }

    var init = function (doms) {

        // 获得game和next的div标签的DOM
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;

        // 初始化div的二维数组
        initDiv(gameDiv,gameData,gameDivArr);
        initDiv(nextDiv,nextData, nextDivArr);

        // 实例化方块
        current = new Square();
        next = new Square();

        current.origin.x = 10;
        current.origin.y = 5;

        setData()


        // 刷新数据
        refreshDiv(current.data, nextDivArr);
        refreshDiv(gameData, gameDivArr);
    }

    // 导出API
    this.init = init;
    this.down = down;
    this.left = left;
    this.right = right;
    this.fall = function () { while(down()); }
}