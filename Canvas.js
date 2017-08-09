//Global variables: background and user images
var background_img = new Image();  //Background
var user_img = new Image();   //user image

//Get Elements
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var count = 0;   //counts the number of times a user has added text to the canvas

//Populate the canvas-background drop down menu:
var jsonData = background_options;
$.each(jsonData,function(index0,value0){
	$.each(value0,function(index1,value1){
		$select_canvas_background.append($('<option ></option>').val(index0).html(value1.text));
	});
				
});

//Change canvas background from dropdown menu event listener
var select = document.getElementById('canvas_background');
select.addEventListener('change',changeBG);

//upload picture event listener
var bttn = document.getElementById('uploaded');
bttn.addEventListener('change',getSource);

//Change text color, font & size of user text in Canvas 
var textCol = document.getElementById('textcolor');
var textFont = document.getElementById('textfont');
var textSize = document.getElementById('textsize');

//Get text from div element
var text = document.getElementById('text');
var text_value = text.innerHTML; 

var AddText = document.getElementById('add');
AddText.addEventListener('click',function(){
	
	var option1 = textSize.options[textSize.selectedIndex].value;
	var option2 = textFont.options[textFont.selectedIndex].value;
	var option3 = textCol.options[textCol.selectedIndex].value;

	AText(option1,option2,option3);
});	

//Clear all the canvas by reloading the page
var reset = document.getElementById('reset');
reset.addEventListener('click', function(){
		window.location.reload();
});

//Download canvas as jpg, can be changed to png 
var link = document.getElementById('link');  //For downloading the image
link.addEventListener('click',function(){
	link.href = canvas.toDataURL("image/jpeg").replace('/^data:image\/[^;]/', 'data:application/octet-stream');
	link.download = "image.jpeg";
},false);


//Upload Image function 
function getSource() {
	
	var preview = document.querySelector('img');   //only when such element is found in the html file. This 'img' is hidden => Does not affect layout
	var file = document.querySelector('input[type=file]').files[0];
	var reader = new FileReader();

	if(file){
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
	reader.onloadend = function(){

		preview.src = reader.result; //add the src to the hidden img tag
		user_img.src = preview.src;  //copy src to newly created Image-object
	}

	user_img.onload = function() {
		ctx.drawImage(user_img,x_userimg,y_userimg,width_userimg, height_userimg)
		// ctx.drawImage(image object, distance from canvas left border, distance from canvas top border, image width on canvas, image height on canvas);	
	}

	return user_img.src;   //updates the global variable user_img
}


//Change Background based on selected value {image or solid color}
function changeBG(){
	
	var option = select.options[select.selectedIndex].value;
	$.each(jsonData,function(index0,value0){
		$.each(value0,function(index1,value1){
		if(option == index0){
			background_img.src = value1.source;
			background_img.onload = function() {
				ctx.drawImage(background_img,0,0,canvas.width, canvas.height);  //uses same function as that explained in getSource(). 
				//In this case, the background image is set to cover all the width and height of the canvas
			}	
		}
		});
	});
	user_img = new Image();   //In case the user changes the background, the user_image object is initialized
	//since the added background would be drawn any objects found in the canvas. 
	return background_img.src; 
} 

//Text is added to the canvas with text wrap enabled. 
function AText(option1,option2,option3){
	if(count == 0){
		var text_value = text.innerHTML;
		
		ctx.font = option1+ " " +option2; //set the size and family of the font selected by the user
		ctx.fillStyle = option3;          //set the color of the text
		
		//obtained from the value attribute in html, if value "px" is changed
		//change the replace("px",) accordingly
		var lineHeight = parseInt(option1.replace('px',''));    

		//extra spacing, enter are represented as space 
		//avoid the creation of HTML tages on the canvas, since not all keystrokes are rendered correctly or as in normal text editors 
		var words = text_value.replace(/&nbsp;|<div>|<\/div>|<br>/g, ' ').split(' '); 

        var line = '';

        //In case the text is longer than the specified width, text will wrap. 
        //Not that very long words at the end of a sentence might be "trimmed", this happends rarely
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine); //measureText() returns a TextMetrics Object

          //testWidth is a double giving the calculated width of a segment of inline text in CSS pixels. 
          //It takes into account the current font of the context.
          var testWidth = metrics.width; 
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x_text, y_text);
            line = words[n] + ' ';
            y_text += lineHeight;  //increment the top position of the text to create the text wrap effect
          }
          else {
            line = testLine;
          }
        }
        ctx.fillText(line, x_text, y_text);
		ctx.stroke();
		count++;   //increments only once, when user wants to append an added text, we go into the else statement
	} else {
		//If text is added again, the canvas should be "re-created", check if the background and/or user image were selected => Re-create
		//First clear the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		//Second, check if a background was selected
		if(background_img.src != "")
			ctx.drawImage(background_img,0,0,canvas.width,canvas.height);

		//Check if a user image was uploaded
		if(user_img.src != "")
			ctx.drawImage(user_img, x_userimg, y_userimg, width_userimg, height_userimg);

		//End of canvas rendering 

		//Same steps used as before. 
		var text_value = text.innerHTML;
		
		ctx.font = option1+ " " +option2;
		ctx.fillStyle = option3;

		var temp = y_text;
		
		var lineHeight = parseInt(option1.replace('px',''));
		var words = text_value.replace(/&nbsp;|<div>|<\/div>|<br>/g, '').split(' ');
        var line = '';

        //Iteration to perform text wrapping 
        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(line, x_text, temp);
            line = words[n] + ' ';
            temp += lineHeight;         	
          }
          else {
            line = testLine;
           }
        }
        ctx.fillText(line, x_text, temp); 
		ctx.stroke();
	}       
}	