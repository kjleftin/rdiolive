var BandsInTownClient = (function($) {

    return {
        search: function (artists, city, radius, callback) {

        	var bandsInTownUrl = 'http://api.bandsintown.com/events/search?'
        	for (var i = 0; i < artists.length; i++) {
        		bandsInTownUrl += 'artists[]=' + artists[i] + '&';
        	}
        	bandsInTownUrl += 'location=' + city + '&';
        	bandsInTownUrl += 'radius=' + radius + '&';
        	bandsInTownUrl += 'format=json&';
        	bandsInTownUrl += 'app_id=rdioconcertcal'

            $.ajax({
            	url: bandsInTownUrl,
            	dataType: 'jsonp',
            	success: function(data) {
            		console.log(data);
            	}
            });
	 	}
	};
})($);
