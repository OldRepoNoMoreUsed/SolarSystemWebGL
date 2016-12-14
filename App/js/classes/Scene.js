var blue = {r:0.0, g:0.0, b:1.0};
var red = {r:1.0, g:0.0, b:0.0};
var green = {r:0.0, g:1.0, b:0.0};

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var translationVec = vec3.create();

var sceneObjects = [];
var orbits = [];

function initWebGL(){
  glContext = getGLContext('webgl-canvas');
  initProgram();
  initCamera();
  initScene();
}

function initCamera(){
  mat4.perspective(pMatrix, degToRad(60.0), c_width/c_height, 0.1, 1000.0);
  glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
}

function  initScene(){
  //Declaration des planetes
  var soleil = new Planet("Sun", 0.3, 0.0, 0.0, -5.0, red);
  var mercury = new Planet("Mercury", 0.1, 0.3, 0.0, -5.0, blue);
  var venus = new Planet("Venus", 0.1, 2.0, 0.0, -5.0, blue);
  var truc = new Planet("as", 0.05, 0.9, 0.0, -5.0, red);

  //peuplage de la Scene
  sceneObjects.push(soleil);
  sceneObjects.push(mercury);
  sceneObjects.push(venus);
  sceneObjects.push(truc);

  var soleilMercuryOrbit = new Orbit(soleil, mercury, 1.5, 0.995);
  var soleilVenusOrbit = new Orbit(soleil, venus, 3.0, 0.995);
  var venusTruc = new Orbit(venus, truc, 0.5, 0.995);
  orbits.push(soleilMercuryOrbit);
  orbits.push(soleilVenusOrbit);
  orbits.push(venusTruc);

  glContext.enable(glContext.DEPTH_TEST);
  glContext.clearColor(0.0, 0.0, 0.0, 1.0);


  mat4.identity(pMatrix);
  glContext.viewport(0, 0, c_width, c_height);

  initCamera();

  renderLoop();
}

function drawScene(){

  glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);

  //glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

  for(var i = 0; i < orbits.length; i++){
    orbits[i].tick();
  }

  for(i = 0; i < sceneObjects.length; i++){
    mat4.identity(mvMatrix);
    mat4.multiply(mvMatrix, sceneObjects[i].mvMatrix, mvMatrix );
    rotateModelViewMatrixUsingQuaternion();
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
