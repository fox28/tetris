/**
 * 2.8 功能：自动降落，底部变色，自动下一个，消行，游戏结束
 * @constructor
 */
var Local = function () {
    // 创建游戏对象
    var game ;

    var timer;

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


    var generateDir = function () {
        return Math.ceil(Math.random()*4) -1;
    };
    var generateType = function () {
        return Math.ceil(Math.random()*7) - 1;
    };

    var move = function () {
        if(!game.down()){
            game.fixed(); // 底部变色
            game.checkClearRow();
            var gameover = game.checkGameOver();
            if(gameover) {
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
            nextDiv:document.getElementById('next')
        }

        game.init(doms)

        timer = setInterval(move, 200);

        // 启动绑定键盘键的事件
        bindKeyEvent();
    }

    // 导出API
    this.start = start ;
}