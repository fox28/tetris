/**
 * 2.7 功能：自动降落，底部变色，自动下一个，消行，游戏结束
 * 2.8 功能：开始方块也随机生成， 设置时间，设置分数，显示游戏结果
 * @constructor
 */
var Local = function () {
    // 创建游戏对象
    var game ;

    // 设置时间管理器
    var timer;
    var INTERVAL = 200;

    //显示时间变量
    var timeIndex = 0;
    var time = 0;

    // 绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (ev) {
            if(ev.keyCode == 38) {// up
                console.log("键盘绑定事件38")
                game.rotate();
            }else if(ev.keyCode == 39) {// right
                console.log("键盘绑定事件39")
                game.right();
            }else if(ev.keyCode == 40) {// down
                game.down();
            }else if(ev.keyCode == 37) {// left
                game.left();
            }else if(ev.keyCode == 32) {// fall
                game.fall();
            }
        }
    }

    var stop = function () {
        if(timer) {
            clearInterval(timer);
            timer = null
        }
        document.onkeydown = null;
    }

    /**
     * 随机生成方块的方向，范围0~3
     * @returns {number}
     */
    var generateDir = function () {
        return Math.ceil(Math.random()*4) -1;
    };

    /**
     * 随机生成方块的类型，范围0~6
     * @returns {number}
     */
    var generateType = function () {
        return Math.ceil(Math.random()*7) - 1;
    };

    /**
     * 设置时间函数
     */
    var timeFunction = function () {
        timeIndex += 1;
        if(timeIndex == 5) {
            timeIndex = 0;
            time+=1;
            game.setTime(time);
        }
    };

    /**
     * 自动降落的方法
     * 同时会调用方块降落底部变色方法, 消行，生成下一个方块，判断游戏是否结束等方法
     * game.fixed()
     */
    var move = function () {

        timeFunction(); // 显示时间

        if(!game.down()){
            game.fixed(); // 底部变色
            var rowNum = game.checkClearRow();
            if(rowNum) {
                game.setScore(rowNum); // 设置分数
            }
            var gameover = game.checkGameOver();
            if(gameover) {
                game.showResult(false); // 结束后显示"你输了"
                stop();
            }else {
                game.performNext(generateType(), generateDir())
            }

        }
    };
    var start = function () {
        game = new Game();

        // 创建数组对象，元素是div标签的DOM
        var doms = {
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next'),
            timeDiv:document.getElementById('time'),
            scoreDiv:document.getElementById('score'),
            resultDiv:document.getElementById('result')
        }


        // 会生成一个next方块，刷新在nextDiv中，此时gameDiv为空
        game.init(doms, generateType(), generateDir());

        // 启动绑定键盘键的事件
        bindKeyEvent();

        // 生成下一个方块，gameDiv中有数据
        game.performNext(generateType(),generateDir());

        // 自动降落
        timer = setInterval(move, INTERVAL);
    }

    // 导出API
    this.start = start ;
}