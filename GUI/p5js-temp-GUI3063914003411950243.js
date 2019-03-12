/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>
 
 */
let bg_img; // Declare variable 'img'.
let knob_img;
let button1, button2, button3, button4, radio;

let iconfont; 
let textfont;

let knob_Angle=[];

var buttonSelected, lastSelected ;
var knob_Offset=90;
var clickX = mouseX; // mouseX when CLICKED
var clickY= mouseY;// mouseY when CLICKED
function preload()
{
  // preload() runs once
    bg_img = loadImage('data/iKiT_BG_Transparent.gif');
  knob_img = loadImage('data/Knob_v2.gif');
  iconfont = loadFont('data/fontawesome-webfont.ttf');
  textfont = loadFont('data/SourceSansPro-Regular.otf');
}


//ππππππππππππππππππππππππππππππππππππππππππππππππππππππ   SETUP   ππππππππππππππππππππππππππππππππππππππππππππππππππππππ

function setup() 
{
  createCanvas(1650, 1000);
  
   knob_Angle [0]= 0;
   knob_Angle [1]= 0;
   knob_Angle [2]= 0;
   knob_Angle [3]= 0;
   knob_Angle [4]= 0;

angleMode(DEGREES);


  //String [] button_Label = {"Midi Min","Midi Max", "Midi Steps", "Midi Curve"};
  button1 = createButton('Midi Min');
  button1.position(680, 175);
  button1.size(80, 35);
  button1.mousePressed(button_Pressed_midi_Min); 

  button2 = createButton('Midi Max');
  button2.position(680, 210);
  button2.mousePressed(button_Pressed_midi_Max); 

  button3 = createButton('Midi Steps');
  button3.position(680, 545);
  button3.mousePressed(button_Pressed_midi_Steps); 

  button4 = createButton('Midi Curve');
  button4.position(680, 580);
  button4.mousePressed(button_Pressed_midi_Curve); 

  buttonSelected =0;

  radio = createRadio();
  radio.option('COMP');
  radio.option('EXP');
  radio.option('COMP+EXP');
  radio.position(500, 600);
  radio.style('height', '100px');

  // [] button_Xpos = {100,250,400,550};
  //[] button_Ypos = {200,400,600,800};


  // frameRate(1);

  textFont(textfont);
  textSize(32);
  textAlign(CENTER, CENTER);
  //fontAwesome_Test(300, 550);
    noLoop();

}

//ππππππππππππππππππππππππππππππππππππππππππππππππππππππ   DRAW   ππππππππππππππππππππππππππππππππππππππππππππππππππππππ
function draw()
{
  //background(random(255),random(255),random(255));
  //clearscreen() 
  background(255); // white BG - to clear all current
  imageMode(CORNER);

  background(bg_img); // with transparancy
 draw_Knob()   //BUTTON, RADIO controls draw automatically
}


function draw_Knob()
{
  imageMode(CENTER);
  push();
  translate(675, 700);
  rotate(knob_Angle[lastSelected]);
  image(knob_img, 0, 0);
  pop();
}

function drawButton(xPosCenter, yPosCenter, the_label) 
{
  rectMode(CENTER); // CENTER= (X,Y, W,H)// (CORNER) / (CORNERS)
  rect(xPosCenter, yPosCenter, 80, 35);
}


function fontAwesome_Test(xPosCenter, yPosCenter)
{
   fill(random(255),random(255), random(255));

  textFont(iconfont);

 var icon=  char(61477);  // f025 - "Headphones"


  fill(random(255), random(255), random(255));
  text(char(61449)+" "+char(61449), xPosCenter, yPosCenter);
  text(icon, 100, 500);
  textFont(textfont);
  text("Tested... ", xPosCenter, yPosCenter+80);
}

//ππππππππππππππππππππππππππππππππππππππππππππππππππππππ   MOUSE   ππππππππππππππππππππππππππππππππππππππππππππππππππππππ
function mousePressed()
{
  clickX=mouseX;
  clickY=mouseY;
}

function mouseDragged()
{
 //if(buttonSelected!=0)
 {noCursor();
 // var dx = mouseX -675;
  var dx = mouseX-clickX; // move RIGHT = positive value
 // var dy =mouseY -700;
   var dy =clickY-mouseY; // move UP = positive value
  var mouseAngle = (round(atan2(dy, dx))); // angle as measured from horizontal X=0 @ east, -180 @ north, 
  // (knob_Angle [buttonSelected] =  mouseAngle - knob_Offset;
knob_Angle [buttonSelected]+=dy;
knob_Angle [buttonSelected] =constrain((knob_Angle [buttonSelected]),-127,127);
clickX=mouseX;
clickY=mouseY;


 //let target_Angle =  mouseAngle -knob_Offset;
 //let travel_Distance = target_Angle-knob_Angle [buttonSelected];
 // if (knob_Angle [buttonSelected] > target_Angle) // move RIGHT
//  {
  //  knob_Angle [buttonSelected]+= (travel_Distance*0.1);
 // }
 // else  if (knob_Angle [buttonSelected] < target_Angle) // move LEFT
//{
   // knob_Angle [buttonSelected]=knob_Angle [buttonSelected]-travel_Distance;

//}
  

  lastSelected=buttonSelected;
  draw_Knob();
  fill(255);
  rect(80,450,400,300);
  fill(0);
    text("Dx = "+dx+"   Dy = "+dy, 200,500);

  //text("Mouse ATAN DxDy = "+mouseAngle, 250,600);
text("ANGLE +127= "+(knob_Angle [buttonSelected]+127), 250,650);

 }
}


function mouseReleased() 
{
    cursor();

  cursor(ARROW);
  textFont(textfont);

  redraw();
  fill(40);
  switch(buttonSelected)
  {
  case 1:  
    text ("button_Pressed_midi_Min ", 300, 600);
    fontAwesome_Test (300, 650);
    break;

  case 2:  
    text ("button_Pressed_midi_Max", 300, 600);
    fontAwesome_Test (300, 650);

    break;

  case 3:  
    text ("button_Pressed_midi_Steps", 300, 600);
    fontAwesome_Test (300, 650);

    break;


  case 4:     
    text ("button_Pressed_midi_Curve", 300, 600);
    fontAwesome_Test (300, 650);

    //  fontAwesome_Test(300, 660);
    break;

  default:
    background(random(255), random(255), random(255));
    redraw();
    break;
  }
  fill(200);
    buttonSelected=0;  // reset to NO SELECTION

}

//ππππππππππππππππππππππππππππππππππππππππππππππππππππππ   BUTTONS   ππππππππππππππππππππππππππππππππππππππππππππππππππππππ


function button_Pressed_midi_Min() 
{
  cursor('row-resize');

  buttonSelected=1; lastSelected=1;
  redraw();
  text ("midi_Min "+buttonSelected, 300, 500);
  fontAwesome_Test(300, 600);
}

function button_Pressed_midi_Max()
{  
  buttonSelected=2;  lastSelected=2;

  redraw();
  text ("midi_Max "+buttonSelected, 300, 500);
  fontAwesome_Test(300, 600);
}

function button_Pressed_midi_Steps() 
{ 
  buttonSelected=3;lastSelected=3;
  redraw();
  text ("midi_Steps "+buttonSelected, 300, 500);
  fontAwesome_Test(300, 600);
}

function button_Pressed_midi_Curve() 
{ 
  buttonSelected=4;lastSelected=4;
  redraw();
  text ("midi_Curve "+buttonSelected, 300, 500);
  fontAwesome_Test(300, 600);
}
