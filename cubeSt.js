"use strict";

var canvas;
var gl;

var NumVertices  = 36;
//declare points array , color array , axis , theata array (for x , y , z ) and theata Location 

var points=[];
var colors = [];

var axis = 0;
var theata = [0, 0, 0];
var theataLoc;



var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

var vertexColors = [
    [ 0.0, 0.0, 0.0, 1.0 ],  // black
    [ 1.0, 0.0, 0.0, 1.0 ],  // red
    [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
    [ 0.0, 1.0, 0.0, 1.0 ],  // green
    [ 0.0, 0.0, 1.0, 1.0 ],  // blue
    [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
    [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
    [ 1.0, 1.0, 1.0, 1.0 ]   // white
];


window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    colorCube();

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //get theata location

    theataLoc = gl.getUniformLocation(program, "theata");

    //event listeners for buttons

    document.getElementById("xButton").onclick = function ()
    {

        axis = 0;

    }

    document.getElementById("yButton").onclick = function () {

        axis = 1;

    }

    document.getElementById("zButton").onclick = function () {

        axis = 2;

    }
    
    render();
}

function colorCube()
{
    //call quad for each quad in the cube

    quad(0,1,2,3);
    quad(1,0,4,5);
    quad(2,3,7,6);
    quad(3,0,4,7);
    quad(4,5,6,7);
    quad(5,6,2,1);
}

function quad(a,b,c,d)
{
    

    //initiate the indix array for the 2 triangles of the quad

    var index = [a, b, c, a, c, d];
    
    //push in color array and points array

    for(var i=0;i<index.length;i++)
    {

        points.push(vertices[index[i]]);
        colors.push(vertexColors[a]);


    }


}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //increase theata for chosen axis
    
    theata[axis] += 0.01;

    //send theata values to vertex shader
    
    gl.uniform3fv(theataLoc, theata);

    gl.drawArrays( gl.TRIANGLES, 0, NumVertices );

    requestAnimFrame( render );
}
