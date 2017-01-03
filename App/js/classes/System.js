class System{
  constructor(name){
    this.systemObjects = [];
    this.systemOrbits = [];

    this.mvMatrix = mat4.create();

    var soleil = new Planet("Sun", 100, 0.0, 0.0, -1000, red);
    var mercury = new Planet("Mercury", 0.35, 0.0, 0.0, -10.0, blue);
    var venus = new Planet("Venus", 0.87, 0.0, 0.0, -15.0, blue);
    var earth = new Planet("Terre", 0.91, 0.0, 0.0, -20.0, blue);
    var mars = new Planet("Mars", 0.48, 0.0, 0.0, -25.0, blue);
    var jupiter = new Planet("Jupiter", 10, 0.0, 0.0, -30.0, blue);
    var saturn = new Planet("Saturne", 8.33, 0.0, 0.0, -35.0, blue);
    var uranus = new Planet("Uranus", 3.53, 0.0, 0.0, -40.0, blue);
    var neptune = new Planet("Neptune", 3.63, 0.0, 0.0, -10, green);

    this.systemObjects.push(soleil);
    this.systemObjects.push(mercury);
    this.systemObjects.push(venus);
    this.systemObjects.push(earth);
    this.systemObjects.push(mars);
    this.systemObjects.push(jupiter);
    this.systemObjects.push(saturn);
    this.systemObjects.push(uranus);
    this.systemObjects.push(neptune);

    var soleilMercuryOrbit = new Orbit(soleil, mercury, 10, 0.99);
    var soleilVenusOrbit = new Orbit(soleil, venus, 15.0, 0.995);
    var soleilEarthOrbit = new Orbit(soleil, earth, 20.0, 0.992);
    var soleilMarsOrbit = new Orbit(soleil, mars, 25.0, 0.988);
    var soleilJupiterOrbit = new Orbit(soleil, jupiter, 30.0, 0.985);
    var soleilSaturnOrbit = new Orbit(soleil, saturn, 35.0, 0.982);
    var soleilUranusOrbit = new Orbit(soleil, uranus, 40.0, 0.980);
    var soleilNeptuneOrbit = new Orbit(soleil, neptune, 45.0, 0.978);

    this.systemOrbits.push(soleilMercuryOrbit);
    this.systemOrbits.push(soleilVenusOrbit);
    this.systemOrbits.push(soleilEarthOrbit);
    this.systemOrbits.push(soleilMarsOrbit);
    this.systemOrbits.push(soleilJupiterOrbit);
    this.systemOrbits.push(soleilSaturnOrbit);
    this.systemOrbits.push(soleilUranusOrbit);
    this.systemOrbits.push(soleilNeptuneOrbit);
  }

  draw(){
    for(i = 0; i < orbits.length; i++){
      this.systemOrbits[i].tick();
    }

    for(i = 0; i < this.systemObjects.length; i++){
      alert(this.systemObjects.length);
      mat4.identity(mvMatrix);
      mat4.translate(mvMatrix, mvMatrix, vec3.fromValues(translateX, translateY, translateZ));
      mat4.multiply(mvMatrix, systemObjects[i].mvMatrix, mvMatrix );
      rotateModelViewMatrixUsingQuaternion(true);
      glContext.uniformMatrix4fv(prg.mvMatrixUniform, false, mvMatrix);
      systemObjects[i].draw();
    }
  }
}
