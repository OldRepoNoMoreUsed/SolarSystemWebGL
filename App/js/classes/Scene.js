var blue = {r:0.0, g:0.0, b:1.0};
var red = {r:1.0, g:0.0, b:0.0};
var green = {r:0.0, g:1.0, b:0.0};

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var translationVec = vec3.create();
var translateZ = 0;
var translateX = 0;
var translateY = 0;
var nearBound = 0.1;
var farBound = 10000;

var sceneObjects = [];
var orbits = [];

function initWebGL(){
  glContext = getGLContext('webgl-canvas');
  initProgram();
  initCamera();
  initScene();
}

function initCamera(){
  mat4.perspective(pMatrix, degToRad(60.0), c_width/c_height, nearBound, farBound);
  glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
}

function  initScene(){
  //declaration du systeme
  var SolarSystem = new System("SystemeSolaire");
  sceneObjects.push(SolarSystem);
  //Declaration des planetes
  // var soleil = new Planet("Sun", 100, 0.0, 0.0, -1000, red);
  // var mercury = new Planet("Mercury", 0.35, 0.0, 0.0, -10.0, blue);
  // var venus = new Planet("Venus", 0.87, 0.0, 0.0, -15.0, blue);
  // var earth = new Planet("Terre", 0.91, 0.0, 0.0, -20.0, blue);
  // var mars = new Planet("Mars", 0.48, 0.0, 0.0, -25.0, blue);
  // var jupiter = new Planet("Jupiter", 10, 0.0, 0.0, -30.0, blue);
  // var saturn = new Planet("Saturne", 8.33, 0.0, 0.0, -35.0, blue);
  // var uranus = new Planet("Uranus", 3.53, 0.0, 0.0, -40.0, blue);
  // var neptune = new Planet("Neptune", 3.63, 0.0, 0.0, -10, green);
  //
  // //peuplage de la Scene
  // sceneObjects.push(soleil);
  // sceneObjects.push(mercury);
  // sceneObjects.push(venus);
  // sceneObjects.push(earth);
  // sceneObjects.push(mars);
  // sceneObjects.push(jupiter);
  // sceneObjects.push(saturn);
  // sceneObjects.push(uranus);
  // sceneObjects.push(neptune);


  // var soleilMercuryOrbit = new Orbit(soleil, mercury, 10, 0.99);
  // var soleilVenusOrbit = new Orbit(soleil, venus, 15.0, 0.995);
  // var soleilEarthOrbit = new Orbit(soleil, earth, 20.0, 0.992);
  // var soleilMarsOrbit = new Orbit(soleil, mars, 25.0, 0.988);
  // var soleilJupiterOrbit = new Orbit(soleil, jupiter, 30.0, 0.985);
  // var soleilSaturnOrbit = new Orbit(soleil, saturn, 35.0, 0.982);
  // var soleilUranusOrbit = new Orbit(soleil, uranus, 40.0, 0.980);
  // var soleilNeptuneOrbit = new Orbit(soleil, neptune, 45.0, 0.978);
  //
  // orbits.push(soleilMercuryOrbit);
  // orbits.push(soleilVenusOrbit);
  // orbits.push(soleilEarthOrbit);
  // orbits.push(soleilMarsOrbit);
  // orbits.push(soleilJupiterOrbit);
  // orbits.push(soleilSaturnOrbit);
  // orbits.push(soleilUranusOrbit);
  // orbits.push(soleilNeptuneOrbit);

  glContext.enable(glContext.DEPTH_TEST);
  glContext.clearColor(0.0, 0.0, 0.0, 1.0);

  mat4.identity(pMatrix);
  glContext.viewport(0, 0, c_width, c_height);

  initCamera();

  renderLoop();
}

function drawScene(){

  glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);
  initCamera();
  //glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);


  // for(var i = 0; i < orbits.length; i++){
  //   orbits[i].tick();
  // }

  for(i = 0; i < sceneObjects.length; i++){
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, vec3.fromValues(translateX, translateY, translateZ));
    mat4.multiply(mvMatrix, sceneObjects[i].mvMatrix, mvMatrix );
    rotateModelViewMatrixUsingQuaternion(true);
    glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
    sceneObjects[i].draw();
  }
}

function initShaderParameters(prg){
  //Linking of the attribute "vertex position"
  prg.vertexPositionAttribute = glContext.getAttribLocation(prg, "aVertexPosition");
	glContext.enableVertexAttribArray(prg.vertexPositionAttribute);
	//Linking of the attribute "color"
	prg.colorAttribute = glContext.getAttribLocation(prg, "aColor");
	glContext.enableVertexAttribArray(prg.colorAttribute);
	//Linking of the uniform [mat4] for the projection matrix
	prg.pMatrixUniform = glContext.getUniformLocation(prg, 'uPMatrix');
	//Linking of the uniform [mat4] for the movement matrix
	prg.mvMatrixUniform = glContext.getUniformLocation(prg, 'uMVMatrix');
}

window.onkeydown = function(e) {
  var key = e.which || e.keyCode;
    switch(key){
        case 87: // w
            translateZ += 10.0;
            //cos
            //sin
            break;
        case 83: // s
            translateZ -= 10.0;
            break;
        case 65: //A
            rotY -= Math.sin(Math.PI/2);
            rotX -= Math.cos(Math.PI/2);
            translateX += Math.sin(Math.PI/2);
            break;
        case 68:
            rotY += 1;
            translateX -= Math.sin(Math.PI/2);
            break;
        case 70: //f
            break;
        case 82: //r
            break;
        default:
    }
};
