
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function resize_canvas() {
    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var radius = 32;
var lineWidth = 4;
var gravity = 0.1;
var dampening = 0.995;
var mousePullStrength = 0.005;
var animate = false;

var mouse = {
    x: 0,
    y: 0,
    down: false
};

var circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0, // 'v' stands for 'velocity'
    vy: 0
};
var mat22node = {
    x: 100,
    y: 100,
    name: null,
    in: [],
    out: []
};

function executeFrame() {
    if (animate)
        requestAnimFrame(executeFrame);
    //incrementSimulation();
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawBox();
    drawNode(mat22node);
    
}

function incrementSimulation() {
    // Pull the circle toward the mouse
    if (mouse.down) {

    }
}

function drawBox() {
    c.lineWidth = 1;
    c.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);
}

function drawCircle() {
    c.beginPath();
    c.arc(circle.x, circle.y, radius - lineWidth / 2, 0, 2 * Math.PI, false);
    c.fillStyle = '00F0FF';
    c.fill();
    c.lineWidth = 4;
    c.strokeStyle = 'black';
    c.stroke();
}

function drawLineToMouse() {
    c.lineWidth = 2;
    c.moveTo(circle.x, circle.y);
    c.lineTo(mouse.x, mouse.y);
    c.stroke();
}

canvas.addEventListener('mousedown', function (e) {
    mouse.down = true;
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});

canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});

canvas.addEventListener('mouseup', function (e) {
    mouse.down = false;
});

// Start animating when the mouse enters the canvas
canvas.addEventListener('mouseover', function (e) {
    animate = true;
    executeFrame();
});

// Stop animating when the mouse exits the canvas
canvas.addEventListener('mouseout', function (e) {
    mouse.down = false;
    animate = false;
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault()
});
canvas.addEventListener('drop', (e) => {
    e.dataTransfer.files[0].text().then(s => {
        node_add(JSON.parse(s));
    });
    e.preventDefault();
});

function node_add(node_json) {
    mat22node.name = node_json.name;
    for (let i = 0; i < node_json.input.length; i++) {
        const element = node_json.input[i];
        mat22node.in[i] = node_json.input[i].name;
    }

    for (let i = 0; i < node_json.output.length; i++) {
        const element = node_json.output[i];
        mat22node.out[i] = node_json.output[i].name;
    }

    console.log(mat22node);
}

function drawNode(node) {
    let name_width_px = c.measureText(node.name).width;
    let name_height_px = c.measureText(node.name);
    let name_position = [ node.x + 8, node.y ];
    let separator_position = [ node.x, node.y + 8 ];
    let max_xputs = (node.in.length > node.out.length) ? node.in.length : node.out.length;
    let node_bounds = [ node.x, node.y - 24 - 4, name_width_px + 16, 36 + (max_xputs * 32) ];


    // Compute the height of the node border
    {
        
    }


    // Draw the node
    {

        // Draw the title
        {

            // Draw the title text
            c.font = "24px Arial";
            c.fillText(node.name, name_position[0], name_position[1]);
            
            // Draw the separator
            c.moveTo(separator_position[0], separator_position[1]);
            c.lineTo(node.x + name_width_px + 16, node.y + 8);
            c.stroke();
        }

        // Draw the node border
        c.strokeRect(node_bounds[0],node_bounds[1],node_bounds[2],node_bounds[3]);
    }
}


// Draw the initial scene once, so something
// is displayed before animation starts.
executeFrame();