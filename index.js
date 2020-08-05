// Parking Lot Angled Stall Calculator

// This will use the JS Canvas to illustrate the parking stalls.

// Settings
const opt = {
    canvas: {
        width: 500,
        height: 1000,
        background: {
            color: "#080706"
        }
    },
    parkingArea: {
        height: 1,
        width: 1,
        topOffSet: 0.8,
        leftOffSet: 0.6,
        backgroundColor: "#080706"
    }
};

(function init() {
    const canvasElement = document.getElementById('renderCanvas')
    resizeTrigger(canvasElement);
    renderParkingStalls(canvasElement);
})();

function renderParkingStalls(canvasElement) {
    canvasSize(canvasElement)
    canvasElement.classList.add("canvasContainer");
    
    // Canvas context object
    const ctx = canvasElement.getContext("2d");
    
    // order of layers:
    background(ctx);
    parkingArea(ctx);
};

function canvasSize(canvas) {
    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(
        body.scrollHeight, 
        body.offsetHeight, 
        html.clientHeight,
        html.scrollHeight, 
        html.offsetHeight
    );
    const bodyH = height;
    const bodyW = document.body.clientWidth;

    // auto resize to window size.
    opt.canvas.width = bodyW * 0.5;
    opt.canvas.height = bodyH * 0.7;

    canvas.setAttribute("width", opt.canvas.width);
    canvas.setAttribute("height", opt.canvas.height);
    return canvas;
}

function background(canvasElement) {
    canvasElement.fillStyle = opt.canvas.background.color;
    canvasElement.fillRect(0, 0, opt.canvas.width, opt.canvas.height);
    return canvasElement;
};


function parkingArea(canvas) {
    const width = opt.canvas.width * opt.parkingArea.leftOffSet;
    const height = opt.canvas.height * opt.parkingArea.topOffSet;
    const topOffset = (opt.canvas.height - height)/2;
    const leftOffset = (opt.canvas.width - width)/2;
    
    opt.parkingArea.width = width;
    opt.parkingArea.height = height;

    canvas.fillStyle = opt.parkingArea.backgroundColor;
    dashedBorder(canvas, topOffset, leftOffset, width, height);
    
    canvas.fillRect(leftOffset, topOffset, width, height);

    canvas.beginPath();
    canvas.moveTo(leftOffset, topOffset);
    // canvas.moveTo(100, 100);
    canvas.strokeStyle = 'white';
    canvas.lineWidth = 5;
    canvas.lineTo(leftOffset + width, topOffset + height/7);
    canvas.setLineDash([0,0]);
    canvas.stroke();

    canvas.beginPath();
    canvas.moveTo(leftOffset, topOffset+100);
    // canvas.moveTo(100, 100);
    canvas.strokeStyle = 'white';
    canvas.lineTo(leftOffset + width, topOffset + (height/7)+100);
    canvas.setLineDash([0,0]);
    canvas.stroke();
    
    return canvas;
};

function dashedBorder(canvas, topOffSet, leftOffSet, width, height) {
    canvas.lineWidth = 2;
    canvas.strokeStyle = 'white';
    canvas.beginPath();
    canvas.rect(leftOffSet, topOffSet, width, height);    
    canvas.setLineDash([10, 10]);
    canvas.lineDashOffset = 0;
    canvas.stroke();
    return canvas;
}

function resizeTrigger(canvasElement) {
    let timeout
    window.addEventListener("resize", function (event) {
        // If there is a timer, cancel it.
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(function () {
            // Redraw the canvas on resize change.
            renderParkingStalls(canvasElement)
        })
    }, false);
};