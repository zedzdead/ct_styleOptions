$(document).ready(function() {				

	//Basic Styling - Converts drop downs to radio buttons
	$( "#product_style_Kit_Type" ).productStyle();

	//Basic Styling
	$( "#product_style_Mens_Chest" ).productStyle();

	//Style uses the prodStyles defined file, in this case uses the Shirt Colour Styles
	//The Styles need to be set up in the Products and Categories section of the Backoffice	
	$( "#product_style_colour" ).productStyle( {
		productStyle: "Shirt_Colour" //Case Sensetive - use underscores unless spaceAlt is declared
	});

})