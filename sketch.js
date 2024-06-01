var song;
let particles = [];
let particle = [];
let colors = [];
let parNum = 1000;
let displayText = false;
let startTime;
let duration = 200;
let alpha = 255;
let canvasImg;

function preload(){
  song = loadSound('song.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  colors[0] = color(random(25, 80), random(5, 90), random(120, 250), random(30, 70));
  colors[1] = color(random(105, 250), random(5, 80), random(25, 90), random(30, 70));
  
  background(0, 0, 5, 100);
  for (let i = 0; i < parNum; i++) {
    particles.push(new Particle(random(width), random(height)));
  }  

  canvasImg = createImage(width, height); //create images for keeping the images not replaced by others
  
  for (let i = 0; i < 70; i++) {
    particle.push(new Particles());
  }

  textSize(50);
  textAlign(CENTER, CENTER);
}

function draw() {
  image(canvasImg, 0, 0);
  
  for (let j = particles.length - 1; j > 0; j--) {
    particles[j].update();
    particles[j].show();
    if (particles[j].finished()) {
      particles.splice(j, 1);
      background(0, 0, 5, 0.1);
    }
  }
  
  for (let i = particles.length; i < parNum; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  canvasImg = get();
  
  particle.forEach(p => {
    p.update();
    p.show();
  });

  if (displayText) {
    noStroke();
    let elapsedTime = frameCount - startTime;
    alpha = map(elapsedTime, 0, duration, 255, 0);
    fill(255, alpha);
    noStroke();
    text("Hey! Have a Nice Day!", width/2, height/2);

    if (elapsedTime > duration) {
      displayText = false;
    }
  }
}

class Particles {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(5, 20);
    this.c = color(255, random(5, 30));
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > width || this.x < 0) this.vx *= -1;
    if (this.y > height || this.y < 0) this.vy *= -1;
  }
  
  show() {
    fill(this.c);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.pos = createVector(this.x, this.y);
  
  this.life = random(1);
  this.c = color(random(colors));
  this.ff = 0;
  
  this.update = function () {
    this.ff = noise(this.pos.x / 100, this.pos.y / 100) * TWO_PI;
    let mainP = 1200;
    let changeDir = TWO_PI / mainP;
    let roundff = round((this.ff / TWO_PI) * mainP);
 
    this.ff = changeDir * roundff;
      
    if (this.ff < 6 && this.ff > 3) {
      this.c = colors[0];
      stroke(this.c);
      this.pos.add(tan(this.ff)*random(1,3), tan(this.ff));
    } else {
      this.c = colors[1];
      stroke(this.c);
      this.pos.sub(sin(this.ff)*random(0.1,1), cos(this.ff));
    }
  };
  
  this.show = function () {
    noFill();
    strokeWeight(random(1.25));
    let lx = 30;
    let ly = 30;
    let px = constrain(this.pos.x, lx, width - lx);
    let py = constrain(this.pos.y, ly, height - ly);
     point(px, py);
  };
  
  this.finished = function () {
    this.life -= random(random(random(random()))) / 10;
    this.life = constrain(this.life, 0, 1);
    if (this.life == 0) {
      return true;
    } else {
      return false;
    }
  };
}

function texts(){
  displayText = true;
  startTime = frameCount;
  alpha = 255;
}

function refresh(){
  background(0, 0, 5);

  canvasImg = createImage(width,height);

  for (let i = 0; i < 100; i++) {
    particle.pop();
  }

  for (let i = 0; i < 100; i++) {
    particle.push(new Particles());
  }

  noiseSeed();
  randomSeed();
  colors[0] = color(random(25, 80), random(5, 90), random(120, 250), random(30, 70));
  colors[1] = color(random(105, 250), random(5, 80), random(25, 90), random(30, 70));
}

function songs(){
  if (song.isPlaying()){
    song.pause();
    document.getElementById("PauseResume").innerHTML = 'Resume';
  }else{
    song.loop();
    document.getElementById("PauseResume").innerHTML = 'Pause Music';
  }
}