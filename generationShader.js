class calculSheet {

  constructor(nbIteration, exponent) {
    this.nbIteration = nbIteration;
    this.exponent = exponent;
  }
  genererCalculShader() {
    var fragmentShader = ``;

    var main = `void main(void) {
    int steps = 0;
    float blue;
    float yellow;

    steps = fractal();

    if (steps != 0) {
      blue = float(steps) /` + this.nbIteration.toString() + `.0;
      yellow = blue / 2.0;

      gl_FragColor = vec4(yellow, yellow, blue, 1.0);

    } else {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    }
    `;
    fragmentShader = `
     int fractal(void) {
  float cx = vCRSCoords.x;
  float cy = vCRSCoords.y;

  float x = 0.0;
  float y = 0.0;
  float tempX = 0.0;

  float tempY = 0.0;
  float XSquare=0.0;
  float YSquare=0.0;

  int i = 0;
  int runaway = 0;
  for (int i=1; i < ` + this.nbIteration.toString() + `; i++) {`;
    if (this.exponent === 2) {
      fragmentShader += `  tempX=XSquare-YSquare;
    tempY=2.0*x*y;
    x=tempX+float(cx);
    y=tempY+float(cy);
    XSquare=x*x;
    YSquare=y*y;
  if (runaway == 0 && XSquare+ YSquare > 4.0) {
        runaway = i;
        break;
  }`
    } else {
      fragmentShader += ` tempX=x*x*x-3.0*x*y*y+ float(cx);
 		 y=3.0*x*x*y-y*y*y+ float(cy);
 		 x=tempX;
   if (runaway == 0 && x * x + y * y > 4.0) {
     runaway = i;
     break;
   }`;

    }
    //TODO : the rest.

    fragmentShader += `
            }

            return runaway;
            }
            ` + main;
            return fragmentShader;
  }
}
