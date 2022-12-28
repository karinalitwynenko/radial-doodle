var canvas;
var ctx;

window.onload = function () {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 1000);
    ctx.lineCap = "round";
    ctx.lineWidth = "8";

    ctx.translate(canvas.width / 2, canvas.height / 2);

    canvas.onmousedown = draw;
    canvas.onmouseup = function (e) {
        canvas.onmousemove = null;
    }
};

function draw(e) {
    if (e.button != 0)
        return;

    var canvasPosition = getAbsolutePosition(canvas);
    var constX = canvasPosition.x + canvas.width / 2;
    var constY = canvasPosition.y + canvas.height / 2;
    var lastX = e.clientX - constX;
    var lastY = e.clientY - constY;
    ctx.strokeStyle = getRandomColor();

    canvas.onmousemove = function (e) {
        var newX = e.clientX - constX;
        var newY = e.clientY - constY;

        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            ctx.rotate(45 * Math.PI / 180);
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(newX, newY);
            ctx.stroke();
        }
        ctx.restore();

        lastX = newX;
        lastY = newY;
    }

    canvas.onmouseleave = function (e) {
        var event = new MouseEvent('mouseup', { view: window, button: 0 });
        // dispatch a mouse up event
        canvas.dispatchEvent(event);
    }
}

function getRandomColor() {
    var digits = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += digits[Math.floor(Math.random() * 16)];

    return color;
}

// gets the element's distance from the client view edge 
function getAbsolutePosition(element) {
    var rect = element.getBoundingClientRect();

    // the upper left corner
    return {
        x: rect.left,
        y: rect.top
    };
}