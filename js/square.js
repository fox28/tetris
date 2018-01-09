
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

Square.prototype.down  = function () {
    this.origin.x += 1;
}

Square.prototype.isDown = function (checkData) {
    var test = {};
    test.x = this.origin.x + 1;
    test.y = this.origin.y;
    return checkData(test);
}