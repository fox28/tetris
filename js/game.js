
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

    // 检查（移动后的）点是否合法
    var checkDot = function (pos, x, y) {
        if(pos.x+x<0){ // 向上越界
            return false;
        }else if(pos.x+x >=gameData.length){ // 向下越界
            return false;
        }else if(pos.y+y<0){ // 向左越界
            return false;
        }else if(pos.y+y >=gameData[1].length){ // 向右越界
            return false;
        }else if(gameData[pos.x+x][pos.y+y] == 1) { // 已有降落方块
            return false;
        }else {
            return true;
        }

        // 简写 用 ||
    }

    var down = function () {
        clearData();
        current.down();
        // current.origin.x += 1;
        setData();
        refreshDiv(gameData, gameDivArr);
    }

    var init = function (doms) {

        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        // 初始化div的二维数组
        initDiv(gameDiv,gameData,gameDivArr);
        initDiv(nextDiv,nextData, nextDivArr);

        current = new Square();
        next = new Square();

        current.origin.x = 10;
        current.origin.y = 5;

        setData()


        refreshDiv(current.data, nextDivArr);
        refreshDiv(gameData, gameDivArr);
    }

    // 导出API
    this.init = init;
    this.down = down;
}