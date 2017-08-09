<!DOCTYPE html>

<html>
<header>
	<title>Canvas</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" type="text/css" href="Canvas.css" />
	
</header>

<body>
	<?php ?>
	<!--Background and User Image -->
	<div id="picture">
		<h1> Choose a background picture.</h1>
		<!--Change the below option tags to change the background images, the src of the images in the javascript should be updated to match the selected event. -->
		<select id="canvas_background">
			<option value="default">Select Event</option>
		</select>

		<h1> Then upload your own photo</h1>
		<!--Used for the client side image upload, keep the display: none style on the <img> tag-->
		<input type="file" id="uploaded">
		<img src="" id="user_image" style="display: none;">
	</div>
	
	<div id="textSub" >
		<h1> Add Text to your image </h1>
		<ul id="nav">
			<li>
				<!--More/Less options can be added/deleted but always match the value="" with the size inside the <option> tag-->
				<select id="textsize">
					<option value="13px">Select Size</option>
					<option value="19px">14</option>
					<option value="24px">18</option> 
					<option value="29px">22</option>
					<option value="35px">26</option>
					<option value="40px">30</option>
					<option value="45px">34</option>
				</select>
			</li>
		
			<li>
				<!--The fonts chosen are placeholders, fonts suitable for mobile should be chosen (Not all fonts are rendered properly in mobile)-->
				<select id="textfont">
					<option value="Sans-Serif">Select Font</option>
					<option value="Calibri">Calibri</option>
					<option value="Garamond">Garamond</option>
					<option value="Cambria">Cambria</option>
					<option value="Palace Script MT">Palace Script MT</option>
					<option value="Bradley Hand ITC">Bradley Hand ITC</option>
				</select>
			</li>

			<li>
				<!--Add the value attribute so that the fillStyle function can change the color of the added text-->
				<select id="textcolor">
					<option value="black">Select Color</option>
					<option value="red">Red</option>
					<option value="blue">Blue</option> 
					<option value="green">Green</option>
					<option value="yellow">Yellow</option>
					<option value="purple">Purple</option>
					<option value="white">White</option>
				</select>
			</li>
		
		</ul>
		<!--attribute "contenteditable" should be true in order to extract the user written text-->
		<div contenteditable="true" id="text"></div>

		<button type="button" id="add" value="Add Text">Add Text</button>
		<button type="button" id="reset">Start Over</button>
	</div>	

	<!--The width and height of the canvas are changed dynamically in the javascript, depending on the user's device-->
	<canvas id="canvas" width="" height="" style="border:1px solid"></canvas>

	<!--Link added through a javascript function-->
	<a id="link" href="#" download="image.jpg"> Download Image </a>

	<!--Due to Apple's file system, the download redirects to a new page where the user needs to save the image manually-->
	<p id="bottom"> On iPhone, you will be redirected to another page, save as image by clicking on <img src="safari.png" id="save"> </p>
	

</body>
	<footer>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
		<script type="text/javascript" src="config.js"></script>
		<script type="text/javascript" src="Canvas.js" ></script>
	</footer>
</html>