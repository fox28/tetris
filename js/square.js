
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