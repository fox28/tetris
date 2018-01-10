
var Square = function () {
    // 游戏矩阵
    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 0, 0]
    ];

    // 原点
    this.origin = {
        x:0,
        y:0
    }

    // 方向
    this.dir = 0;
}

// 下移
Square.prototype.down  = function () {
    this.origin.x += 1;
}
// 验证是否能够下移
Square.prototype.isDown = function (checkData) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return checkData(test, this.data);
}

// 左移
Square.prototype.left  = function () {
    this.origin.y -= 1;
}
// 验证是否能够左移
Square.prototype.isLeft = function (checkData) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y - 1;
    return checkData(test, this.data);
}

// 右移
Square.prototype.right  = function () {
    this.origin.y += 1;
}
// 验证是否能够右移
Square.prototype.isRight = function (checkData) {
    var test = {};
    test.x = this.origin.x;
    test.y = this.origin.y + 1;
    return checkData(test, this.data);
}


// 旋转
Square.prototype.rotate  = function (num) {
    if(!num){
        num = 1;
    }
    this.dir = (this.dir + num)%4;

    for(var i=0; i<this.data.length; i++) {
        for(var j=0; j<this.data[i].length; j++) {
            this.data[i][j] = this.rotates[this.dir][i][j];
        }
    }


}
// 验证是否能够旋转
Square.prototype.isRotate = function (checkData) {
    var d = (this.dir + 1) % 4;
    // 创造、旋转后的游戏矩阵，
    var test = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    for(var i=0; i<test.length; i++) {
        for(var j=0; j<test[i].length; j++) {
            test[i][j] = this.rotates[d][i][j];
        }
    }
    return checkData(this.origin, test);
}

