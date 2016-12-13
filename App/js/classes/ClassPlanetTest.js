class Planet{
  constructor(name, radius, color, x, y, z){
    this.name = name;
    this.radius = radius;
    this.color = color;

    this.x = x;
    this.y = y;
    this.z = z;

    this.vertexBuffer = null;
    this.indexBuffer = null;
    this.colorBuffer = null;

    this.mvMatrix = mat4.create();
    this.init();
  }

  init(){
    this.clearBuffers();
    this.indices = [];
    this.vertices = [];
    this.colors = [];

    //Init cube
    //vertices
    this.initvertices();
    this.initcolors();
    this.initindices();

    //We create the buffers on the GPU
		this.vertexBuffer = getVertexBufferWithVertices(this.vertices);
		this.colorBuffer = getVertexBufferWithVertices(this.colors);
		this.indexBuffer = getIndexBufferWithIndices(this.indices);
  }

  draw(mvMatrix){
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, mvMatrix, vec3.fromValues(this.x, this.y, this.z));
    mat4.multiply(mvMatrix, mvMatrix, mvMatrix)
    glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);

    //Transfert des vertices de la planete
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.vertexBuffer);
    glContext.vertexAttribPointer(prg.vertexPositionAttribute, 3, glContext.FLOAT, false, 0, 0);
    //Transfert couleur de la planete
    glContext.bindBuffer(glContext.ARRAY_BUFFER, this.colorBuffer);
    glContext.vertexAttribPointer(prg.colorAttribute, 4, glContext.FLOAT, false, 0, 0);
    //Transfert index de la planete
    glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    //Dessinons le cube en LINES
    glContext.drawElements(glContext.TRIANGLE_STRIP, this.indices.length, glContext.UNSIGNED_SHORT, 0);
  }

  initvertices(){

    this.vertices.push(-1.0, -1.0, 0.0);
    this.vertices.push(1.0, -1.0, 0.0);
    this.vertices.push(0.0, 1.0, 0.0);
  }

  initcolors(){
    this.colors.push(0.0,1.0,0.0,1.0);
    this.colors.push(0.0,1.0,0.0,1.0);
    this.colors.push(0.0,1.0,0.0,1.0);
  }

  initindices(){
    this.indices.push(0, 1, 2);
  }

  clearBuffers(){
    if(this.vertexBuffer !== null)
		{
			glContext.deleteBuffer(this.vertexBuffer);
		}
		if(this.colorBuffer !== null)
		{
			glContext.deleteBuffer(this.colorBuffer);
		}
		if(this.indexBuffer !== null)
		{
			glContext.deleteBuffer(this.indexBuffer);
		}
  }
}
