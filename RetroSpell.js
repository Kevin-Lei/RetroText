if(Meteor.isClient)
{
	//button click functionif (Meteor.Client) {
	Template.controls.events({
		'click .myButton': function () {
			var form_data = $("input[name=fname]").val();
			if(form_data !== ""){
				$(".display").empty();
				var entry = form_data;
				var len = form_data.length;
				for(i = 0; i < len; i++){
					var c = entry.charAt(i).toUpperCase();
					var imgURL = "";
					for(j = 0; j < imgAlphabet.length; j++){
						if(imgAlphabet[j].key === c){
							var girth = Math.floor(imgAlphabet[j].value.length * Math.random());
							imgURL = imgAlphabet[j].value[girth];
							$(".display").append('<img src="' + imgURL + '" height="100" width="100">');
							break;
						}
					}
				}
			}
		}
	});

//assign your api key equal to a variable
var apiKey = '4ef2fe2affcdd6e13218f5ddd0e2500d';

//the initial json request to flickr
//to get your latest public photos, use this request: http://api.flickr.com/services/rest/?&method=flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=29096781@N02&per_page=15&page=2&format=json&jsoncallback=?



$.getJSON('http://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=' + apiKey + '&photoset_id=72157626422113413&format=json&jsoncallback=?',
function(data){
    //loop through the results with the following function
    $.each(data.photoset.photo, function(i,item){
    
        //build the url of the photo in order to link to it
        var photoURL = 'http://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
        var title = item.title.substr(item.title.indexOf(" ") + 1, item.title.indexOf(" ") + 1);
        a.push({
        	key: title, 
        	value: photoURL
        });
        console.log(item);
        console.log(photoURL);
    });
    popKeys();
    popVals();
});

//array of photo urls
var a = [];
var imgAlphabet = [];

//populate the alphabet keys
var popKeys = function(unused){
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(i = 0; i < str.length; i++){
		var letter = str.charAt(i)
		imgAlphabet.push({
			key: letter, 
			value: []
		});
	}
}
//populate the alphabet values
var popVals = function(unused){
	for(h = 0; h < a.length; h++){
		for(k = 0; k < imgAlphabet.length; k++){
			if(a[h].key === imgAlphabet[k].key){
				imgAlphabet[k].value.push(a[h].value);
				break;
			}
		}
	}
}
}