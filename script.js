var image=null;
var originalImage=null;

function clearCanvas(){
  var canvas=document.getElementById("can");
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function deepCopy(srcImage){
  var output=new SimpleImage(srcImage.getWidth(),srcImage.getHeight());
  for(var pixel of srcImage.values()){
    var x=pixel.getX();
    var y=pixel.getY();
    output.setPixel(x,y,pixel);
  }
  return output;
}

function resetImage(){
   image = deepCopy(originalImage);
  var canvas=document.getElementById("can");
  canvas.style.filter="";
  showImage(image);
}
function showImage(value){
  var canvas=document.getElementById("can");
  value.drawTo(canvas);
}

function loadImage(){
  var canvas=document.getElementById("can");
  var inputFile=document.getElementById("file");
  image=new SimpleImage(inputFile);
  originalImage= new SimpleImage(inputFile);
  showImage(image);
}

function isloaded(cImage){
  if(cImage==null || !cImage.complete()){
    return false;
  }else{
    return true;
  }
}
function dogray(){
  for(var pixel of image.values()){
    var color=(pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    pixel.setRed(color);
    pixel.setGreen(color);
    pixel.setBlue(color);
  }
}
function grayScale(){
  
  if(isloaded(image)){
    resetImage();
    dogray();
    showImage(image);
    
  }else{
    alert('Image is not loaded yet');
  }
  
}
function doRed(){
  for(var pixel of image.values()){
    pixel.setRed(255);
  }
}

function colorRed(){
  if(isloaded(image)){
    resetImage();
    doRed();
    showImage(image);
  }else{
    alert('Image is not loaded');
  }
  
}

function blurImage(){
  resetImage();
  var canvas=document.getElementById("can");
  canvas.style.filter="blur(5px)";
}

function showHeart(){
  resetImage();
   var canvas=document.getElementById("can");
  var ctx=canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);
  showImage(image);
 for(var i=0;i<=5;i++){
   var x = Math.random()*canvas.width;
   var y = Math.random()*canvas.height;
   //Size between 0.5 to 1.5
   var size=Math.random() + 1;
   //Angel between 0 and 2pi
   var angel= Math.random() * Math.PI * 2;
   
   ctx.save();
   ctx.translate(x,y);
   ctx.rotate(angel);
   ctx.scale(size,size);
   
   ctx.beginPath();
   ctx.moveTo(45, 45);
   ctx.lineTo(70, 80);
   ctx.lineTo(95, 45);
   ctx.arc(82.5, 45, 12.5, 0, Math.PI, true);
   ctx.arc(57.5, 45, 12.5, 0, Math.PI, true);
   ctx.closePath();
   ctx.fillStyle="red";
   ctx.fill();
   ctx.restore();
 }
}

function colorRainbow(){
  resetImage();
  var canvas=document.getElementById("can");
  var height=canvas.height;
  for (var pixel of image.values()){
    var y=pixel.getY();
    var avg=(pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    if(y <= height/7){
      if(avg < 128){
        pixel.setRed(2*avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      }else{
         pixel.setRed(255);
         pixel.setGreen((2*avg) - 255);
         pixel.setBlue((2*avg) - 255);
      }
    }else if(y> height/7 && y<=2*(height/7)){
      if(y<128){
        pixel.setRed(2*avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen((1.2*avg) - 51);
        pixel.setBlue((2*avg) - 255);
      }
    }else if(y>2*(height/7) && y<=3*(height/7)){
      if(avg < 128){
        pixel.setRed(2*avg);
        pixel.setGreen(2*avg);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue((2*avg) - 255);
      }
    }else if(y>3*(height/7) && y<=4*(height/7)){
      if(avg < 128){
        pixel.setGreen(2*avg);
        pixel.setRed(0);
        pixel.setBlue(0);
      }else{
        pixel.setRed((2*avg) - 255);
        pixel.setGreen(255);
        pixel.setBlue((2*avg) - 255);
      }
    }else if(y> 4*(height/7) && y<= 5*(height/7)){
      if(avg < 128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed((2*avg) - 255);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue(255);
      }
    }else if(y> 5*(height/7) && y<=6*(height/7)){
      if(avg < 128){
        pixel.setRed(0.8*avg);
        pixel.setGreen(0);
        pixel.setBlue(2*avg);
      }else{
        pixel.setRed((1.2*avg) - 51);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue(255);
      }
    }else if(y> 6*(height/7) && y<=height){
      if(avg <128){
        pixel.setRed(1.6*avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6*avg);
      }else{
        pixel.setRed((0.4*avg) + 153);
        pixel.setGreen((2*avg) - 255);
        pixel.setBlue((0.4*avg) + 153);
      }
    }
  }
  showImage(image);
}

function inImage(x,y){
  
  return (x>=0 && x<image.getWidth() && y>=0 && y<image.getHeight());
}

function manBlur(){
  resetImage();
  var output=new SimpleImage(image.getWidth(),image.getHeight());
  
  for(var pixel of image.values()){
    var x= pixel.getX();
    var y= pixel.getY();
    if(Math.random()<=0.5){
      output.setPixel(x,y,pixel);
    }else{
      var distX=Math.floor(Math.random() * 20) - 10;
      var distY=Math.floor(Math.random() * 20) - 10;
      var newX = x + distX;
      var newY = y + distY;
      if(inImage(newX,newY)){
        var newPixel=image.getPixel(newX,newY);
        output.setPixel(x,y,newPixel);
      }else{
        output.setPixel(x,y,pixel);
      }
    }
  }
  showImage(output);
}

var c = document.getElementById("header");
    var ctx2 = c.getContext("2d");

    // Set the canvas dimensions based on the device pixel ratio
    var devicePixelRatio = window.devicePixelRatio || 1;
    var width = 600;
    var height = 100;
    c.width = width * devicePixelRatio;
    c.height = height * devicePixelRatio;
    c.style.width = width + "px";
    c.style.height = height + "px";

    // Scale the drawing context
    ctx2.scale(devicePixelRatio, devicePixelRatio);

    // Create gradient
    var grd = ctx2.createLinearGradient(0, 0, width, 0);
    grd.addColorStop(0, "violet");
    grd.addColorStop(0.2, "indigo");
    grd.addColorStop(0.4, "blue");
    grd.addColorStop(0.6, "green");
    grd.addColorStop(0.8, "yellow");
    grd.addColorStop(0.9, "orange");
    grd.addColorStop(1, "red");

    // Set the stroke style and font
    ctx2.strokeStyle = grd;
    ctx2.font = "80px Courier New";

    // Draw the text
    ctx2.strokeText("Filter Fun", 50, 60);

