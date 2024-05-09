
// Global
let c = null;
var animate = false;
let mouse = {
    x: 0,
    y: 0,
    down: false
};
let mat22node = {
    x: 100,
    y: 100,
    name: null,
    in: [],
    out: []
};
let draw_frame = (
    function () {
        return function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    }
)();

/** !
 * Resize the canvas to fit the browser window
 * 
 * @param void
 * 
 * @return void
 */
function resize_canvas ( ) {

    // Initialized data
    let canvas = document.getElementById("canvas");

    // Update the width
    canvas.width = window.innerWidth;

    // Update the height
    canvas.height = window.innerHeight;

    // Store the context
    c = canvas.getContext("2d");

    // Done
    return;
}

/** !
 * Initialize the graph editor
 * 
 * @param void
 * 
 * @return void
 */
function init ( ) {

    // Mouse down
    canvas.addEventListener('mousedown', function (e) {
        mouse.down = true;
        mouse.x = e.pageX;
        mouse.y = e.pageY;
    });
    
    // Mouse move
    canvas.addEventListener('mousemove', function (e) {

        // Update mouse X
        mouse.x = e.pageX;

        // Update mouse Y
        mouse.y = e.pageY;
    });
    
    // Mouse up
    canvas.addEventListener('mouseup', function (e) {

        // Clear the mouse flag
        mouse.down = false;
    });
    
    // Hover
    canvas.addEventListener('mouseover', function (e) {

        // Set the animate flag
        animate = true;

        // Draw the canvas
        draw();
    });
    
    // Exit 
    canvas.addEventListener('mouseout', function (e) {
        
        // Clear the mouse flag
        mouse.down = false;

        // Clear the animate flag
        animate = false;
    });
    
    // Drag 
    canvas.addEventListener('dragover', (e) => {
        
        // Do nothing
        e.preventDefault()
    });
    
    // Drop
    canvas.addEventListener('drop', (e) => {
        
        // Get the text of the file
        e.dataTransfer.files[0].text()

        // TODO: Document a bit better
        .then(s => {
            node_add(JSON.parse(s));
        });

        // Nothing else
        e.preventDefault();
    });

    // Done
    return;
}

/** !
 * Draw the canvas
 * 
 * @param void
 * 
 * @return void
 */
function draw ( ) {

    // State check
    if ( animate ) draw_frame(draw);

    // Process input
    process_input();

    // Draw
    {
        // Clear the screen
        c.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the border
        draw_border();

        // Draw a node
        draw_node(mat22node);

        // TODO: Draw each node
        //

        // TODO: Draw each connection
        //
    }

    // Done
    return;
}

/** !
 * Process input
 * 
 * @param void
 * 
 * @return void
 */
function process_input ( ) {
    
    // TODO: Process input
    //

    if ( mouse.down ) {
        // ...
    }

    // Done
    return;
}

/** !
 * Draw the border
 * 
 * @param void
 * 
 * @return void
 */
function draw_border ( ) {

    // 2 px border
    c.lineWidth = 2;

    // Draw the border
    c.strokeRect(0.5, 0.5, canvas.width - 1, canvas.height - 1);

    // Done
    return;
}

/** !
 * Add a node to the graph
 * 
 * @param node_json the json of the node
 * 
 * @return void
 */
function node_add ( node_json ) {

    // Store the name of the node
    mat22node.name = node_json.name;

    // Store each input property
    for (let i = 0; i < node_json.input.length; i++) 
        mat22node.in[i] = node_json.input[i].name;

    // Store each output property
    for (let i = 0; i < node_json.output.length; i++) 
        mat22node.out[i] = node_json.output[i].name;

    // Print the node to standard out
    console.log(mat22node);

    // Done
    return;
}

/** !
 * Draw a node on the graph
 * 
 * @param node the node object
 * 
 * @return void
 */
function draw_node ( node ) {

    // Initialized data
    let name_width_px      = c.measureText(node.name).width;
    let name_height_px     = c.measureText(node.name);
    let name_position      = [ node.x + 8, node.y ];
    let separator_position = [ node.x, node.y + 8 ];
    let max_xputs          = (node.in.length > node.out.length) ? node.in.length : node.out.length;
    let node_bounds        = [ node.x, node.y - 24 - 4, name_width_px + 16, 36 + (max_xputs * 32) ];

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

    // Done
    return;
}

// Initialize the node editor
init();

// Resize the canvas
resize_canvas();

// Draw 
draw();