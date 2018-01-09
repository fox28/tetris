
var Local = function () {
    // 创建游戏对象
    var game ;

    // 绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (ev) {
            if(ev.keyCode == 38) {// up

            }else if(ev.keyCode == 39) {// right
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

    var start = function () {
        game = new Game();

        // 创建数组对象，元素是div标签的DOM
        var doms = {
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next')
        }

        game.init(doms)

        // 启动绑定键盘键的事件
        bindKeyEvent();
    }

    // 导出API
    this.start = start ;
}