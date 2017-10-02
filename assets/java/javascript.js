var topics = ["happy", "sad", "angry", "fear", "disgust", "suprise"]





function renderButtons(){
   	// Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#emotions-buttons").empty();

        // Looping through the array of movies
	topics.forEach(function(topic){
		newButton=$("<button>")
			.text(topic)
			.addClass("btn btn-default emotion")
			.attr("data-name",topic)
		$("#emotions-buttons").append(newButton)
	});
}


function switchImage(){
	if($(this).attr("src")===$(this).attr("data-still")){
		$(this).attr("src",$(this).attr("data-active"))
	}
	else{
		$(this).attr("src",$(this).attr("data-still"))
	}

}


$("#add-emotion").on("click", function(event){
	event.preventDefault();

	var emotion = $("#emotion-input").val().trim();

	topics.push(emotion);

	renderButtons()
})

function showGiphy(){

	$(".emotions").empty()

	var chosenEmotion = $(this).attr("data-name")
	

	queryURL = "https://api.giphy.com/v1/gifs/search?q=" + chosenEmotion + "&api_key=dc6zaTOxFJmzC&limit=10"
	
	// console.log(queryURL)

    $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	console.log(response)
        	//identify the array of images info
        	imagesArray=response.data
        	//for each image, go through the process of creating an element
      		//appending necessary classes and attributes
      		//and appending to the emotions <div>
			imagesArray.forEach(function(imageItem){
				//create a new image variable
				var newImage = $("<img>")

				var newImageUrlStill = (imageItem.images.fixed_height_still.url)
				//newImageUrlStill=newImageUrlStill.substring(0,newImageUrlStill.indexOf("?"))
				var newImageUrlActive = (imageItem.images.fixed_height.url)
				//newImageUrlActive=newImageUrlActive.substring(0,newImageUrlActive.indexOf("?"))
				newImage.attr("src",newImageUrlStill)
				newImage.attr("data-still", newImageUrlStill)
				newImage.attr("data-active", newImageUrlActive)
				newImage.on("click", switchImage)
				 $(".emotions").append(newImage)
			})
		})
}
renderButtons();

$(document).on("click", ".emotion", showGiphy);

topics.forEach(function(a){
	
})

	







