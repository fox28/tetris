
var Square = function () {

    this.data = [
        [0, 2, 0, 0],
        [0, 2, 0, 0],
        [0, 2, 2, 0],
        [0, 0, 0, 0]
    ];

    this.origin = {
        x:0,
        y:0
    }
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
    return checkData(test);
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
    return checkData(test);
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
    return checkData(test);
}