//Canvas Background drop down menu:
$select_canvas_background = $("#canvas_background");

//Canvas width percentages can be changed relative to the device size
canvas.width = window.innerWidth*0.8;

//Canvas height percentages can be changed relative to the device size
canvas.height =  window.innerHeight*0.6;

//Text width, coordinates (x,y) on canvas used for the text wrapping and text positioning
//maximum width of text on the canvas
var maxWidth = canvas.width*0.4;

//Distance from canvas left border
var x_text = (canvas.width - maxWidth);  

//Distance from canvas top border
var y_text = canvas.height*0.2;	

//Distance from canvas left border
var x_userimg = 30; 

//Distance from canvas top border
var y_userimg = 30;	 

//Width of user's image relative to canvas width
var width_userimg = canvas.width*0.4; 

//Height of user's image relative to canvas height
var height_userimg = canvas.height*0.4;  

//JSON object with all background options:
var background_options = {
	"event1":[
		{
			"source": "FD.jpg",
			"text": "Father's Day",
		},
	],

	"event2":[
		{
			"source": "eid.jpg",
			"text": "Eid Fitr",
		},
	],

	"event3":[
		{
			"source": "school.png",
			"text": "Back to School",
		},
	]
};

