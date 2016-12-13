var mvMatrix = mat4.create();
var pMatrix = mat4.create();

var sceneObjects = [];
var orbits = [];

function initWebGL(){
  glContext = getGLContext('webgl-canvas');
  initProgram();
  initScene();
}

function  initScene(){
  //Declaration des planetes
  var earth = new Planet("Earth", 0.4, {r:0.14, g:0.29, b:0.65}, 0.0, 0.0, 0.0);
  //var moon = new Planet("Moon", 0.1, {r:1.0, g:0.1, b:0.8}, 0.0, 0.0, 0.0);
  //peuplage de la Scene
  sceneObjects.push(earth);
  //sceneObjects.push(moon);

  //var moonEarthOrbit = new Orbit(earth, moon, 1.5, 0.995);

  //orbits.push(moonEarthOrbit);

  glContext.clearColor(0.9, 0.9, 0.9, 1.0);
  glContext.enable(glContext.DEPTH_TEST);

  mat4.identity(pMatrix);

  glContext.viewport(0, 0, c_width, c_height);
  changeProjection();
  renderLoop();
}

function drawScene(){
  glContext.clear(glContext.COLOR_BUFFER_BIT | glContext.DEPTH_BUFFER_BIT);

  for(var i = 0; i < orbits.length; i++){
    orbits[i].tick();
  }
  mat4.identity(mvMatrix);

  rotateModelViewMatrixUsingQuaternion();

  for(i = 0; i < sceneObjects.length; i++){
    sceneObjects[i].draw(mvMatrix);
  }
}

var projection = 0;
function changeProjection(){
	if(projection)
	{
		//setting the projection in perspective
		mat4.perspective(pMatrix, degToRad(40), c_width / c_height, 0.1, 1000.0);
		projection = 0;
	}
	else
	{
		//setting the projection in orthogonal
		mat4.ortho(pMatrix, -1.2, 1.2, -1.2, 1.2, 1, 10);
		projection = 1;
	}

	//Sending the new projection matrix to the shaders
	glContext.uniformMatrix4fv(prg.pMatrixUniform, false, pMatrix);
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
