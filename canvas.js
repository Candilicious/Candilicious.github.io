var canvasBody = document.getElementById("canvas"), 
  canvas = canvasBody.getContext("2d"), 

  w = canvasBody.width = window.innerWidth, 
  h = canvasBody.height = window.innerHeight, 

 
  opts = 
  {
    bulbSize: 130,  //лампочка
    bulbLightColor: "#f1a5be",  //цвет лампочки
    bgc: "rgba(254,221,217,alpha)", //цвет фона
    bgcRedrawOpacity: 0.05, 
    blinkChance: 0.3
  },

i = 0,
  bulbs = [], 
  baseRad = Math.PI * 2, 

  hAmount = Math.floor(window.innerWidth / opts.bulbSize), 
  vAmount = Math.floor(window.innerHeight / opts.bulbSize); 

function loop() 
{
  window.requestAnimationFrame(loop);
  i++;

  canvas.fillStyle = opts.bgc.replace("alpha", opts.bgcRedrawOpacity);
  canvas.fillRect(0, 0, w, h); 

  if (Math.random() < opts.blinkChance) 
  {
    var randomV = Math.floor(Math.random() * vAmount),
      randomH = Math.floor(Math.random() * hAmount);

    bulbs[randomV][randomH].spark();
  }
}

function initStuff() 
{ 

  for (var i = 0; i < vAmount; i++) 
  {
    var lineData = [];
    for (var f = 0; f < hAmount; f++) 
    {
      lineData.push(new Bulb());
    }
    bulbs.push(lineData);
  }
  for (var d = 0; d < vAmount; d++) {
    for (var g = 0; g < hAmount; g++) {
      bulbs[d][g].reset(g, d);
    }
  }

  loop();
}

function Bulb() 
{

  this.reset();
}
Bulb.prototype.reset = function(xPos, yPos) 
{
  this.radius = opts.bulbSize / 2;
  this.color = opts.bulbLightColor;

  this.x = xPos * opts.bulbSize + this.radius;
  this.y = yPos * opts.bulbSize + this.radius;
};
Bulb.prototype.spark = function(arg) 
{
  canvas.fillStyle = this.color;
  canvas.beginPath();
  canvas.arc(this.x, this.y, this.radius, 0, baseRad);
  canvas.fill();
};

initStuff();