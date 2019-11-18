"use strict";

var canvas;
var gl;

var NumVertices  = 36;
//declare points array , color array , axis , theata array (for x , y , z ) and theata Location 

var points = [];
var colors = [];

var axis = 2;

var theata = [0, 0, 0];
var theataLoc;

var vertices = [
    vec4(-0.05, -0.05, 0.05, 1.0), //0
    vec4(-0.05, 0.05, 0.05, 1.0), //1
    vec4(0.05, 0.05, 0.05, 1.0), //2
    vec4(0.05, -0.05, 0.05, 1.0), //3
    vec4(-0.05, -0.05, -0.05, 1.0), //4
    vec4(-0.05, 0.05, -0.05, 1.0), //5
    vec4(0.05, 0.05, -0.05, 1.0), //6
    vec4(0.05, -0.05, -0.05, 1.0), //7
    
    vec4(-0.15, -0.2, 0.05, 1.0), //8
    vec4(-0.15, -0.1, 0.05, 1.0), //1
    vec4(-0.05, -0.1, 0.05, 1.0), //2
    vec4(-0.05, -0.2, 0.05, 1.0), //3
    vec4(-0.15, -0.2, -0.05, 1.0), //4
    vec4(-0.15, -0.1, -0.05, 1.0), //5
    vec4(-0.05, -0.1, -0.05, 1.0), //6
    vec4(-0.05, -0.2, -0.05, 1.0), //15

    vec4(-0.25, -0.35, 0.05, 1.0), //0
    vec4(-0.25, -0.25, 0.05, 1.0), //1
    vec4(-0.15, -0.25, 0.05, 1.0), //2
    vec4(-0.15, -0.35, 0.05, 1.0), //3
    vec4(-0.25, -0.35, -0.05, 1.0), //4
    vec4(-0.25, -0.25, -0.05, 1.0), //5
    vec4(-0.15, -0.25, -0.05, 1.0), //6
    vec4(-0.15, -0.35, -0.05, 1.0), //7

    vec4(-0.35, -0.5, 0.05, 1.0), //0
    vec4(-0.35, -0.4, 0.05, 1.0), //1
    vec4(-0.25, -0.4, 0.05, 1.0), //2
    vec4(-0.25, -0.5, 0.05, 1.0), //3
    vec4(-0.35, -0.5, -0.05, 1.0), //4
    vec4(-0.35, -0.4, -0.05, 1.0), //5
    vec4(-0.25, -0.4, -0.05, 1.0), //6
    vec4(-0.25, -0.5, -0.05, 1.0), //7

    vec4(-0.45, -0.65, 0.05, 1.0), //0
    vec4(-0.45, -0.55, 0.05, 1.0), //1
    vec4(-0.35, -0.55, 0.05, 1.0), //2
    vec4(-0.35, -0.65, 0.05, 1.0), //3
    vec4(-0.45, -0.65, -0.05, 1.0), //4
    vec4(-0.45, -0.55, -0.05, 1.0), //5
    vec4(-0.35, -0.55, -0.05, 1.0), //6
    vec4(-0.35, -0.65, -0.05, 1.0), //7

    vec4(-0.55, -0.8, 0.05, 1.0), //0
    vec4(-0.55, -0.7, 0.05, 1.0), //1
    vec4(-0.45, -0.7, 0.05, 1.0), //2
    vec4(-0.45, -0.8, 0.05, 1.0), //3
    vec4(-0.55, -0.8, -0.05, 1.0), //4
    vec4(-0.55, -0.7, -0.05, 1.0), //5
    vec4(-0.45, -0.7, -0.05, 1.0), //6
    vec4(-0.45, -0.8, -0.05, 1.0), //7

    vec4(-0.65, -0.95, 0.05, 1.0), //0
    vec4(-0.65, -0.85, 0.05, 1.0), //1
    vec4(-0.55, -0.85, 0.05, 1.0), //2
    vec4(-0.55, -0.95, 0.05, 1.0), //3
    vec4(-0.65, -0.95, -0.05, 1.0), //4
    vec4(-0.65, -0.85, -0.05, 1.0), //5
    vec4(-0.55, -0.85, -0.05, 1.0), //6
    vec4(-0.55, -0.95, -0.05, 1.0) //7
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

    //colorCube();
    for (var i = 0; i < vertices.length; i+=8) {
        colorCube(i);
    }

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

    render();
}

function colorCube(i)
{
    //call quad for each quad in the cube
    quad(0 + i, 1+i, 2+i, 3+i);
    quad(1+i, 0+i, 4+i, 5+i);
    quad(2+i, 3+i, 7+i, 6+i);
    quad(3+i, 0+i, 4+i, 7+i);
    quad(4+i, 5+i, 6+i, 7+i);
    quad(5+i, 6+i, 2+i, 1+i);

  /*  quad(8, 9, 10, 11);
    quad(9, 8, 12, 13);
    quad(10, 11, 15, 14);
    quad(11, 8, 12, 15);
    quad(12, 13, 14, 15);
    quad(13, 14, 10, 9);*/
}

function quad(a, b, c, d)
{
    //initiate the indix array for the 2 triangles of the quad

    var index = [a, b, c, a, c, d];
    
    //push in color array and points array

    for (var i = 0; i < index.length; i++) {
        points.push(vertices[index[i]]);
        colors.push(vertexColors[a % 8]);
    }

}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //increase theata for chosen axis
    theata[axis] += 0.01;

    //send theata values to vertex shader
    gl.uniform3fv(theataLoc, theata);

    for (var i = 0; i < 9; i++) {
        gl.drawArrays(gl.TRIANGLES, i * NumVertices, NumVertices);
    }

    requestAnimFrame( render );
}
