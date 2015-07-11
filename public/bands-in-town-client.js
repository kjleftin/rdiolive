var BandsInTownClient = (function($) {

    function prettyDate(datetime) {
        var parsedDate = new XDate(datetime);
        return parsedDate.toString('MMM d, yyyy h:mmtt ');
    }

    function createPopoverHtml(event) {
        return $('<div class="popup-info"></div>')
            .append('<p class="venue-name">' + event.venue.name + '</p>')
            .append('<p class="venue-city">' + event.venue.city + ', ' + event.venue.region + '</p>')
            .append('<p class="event-date">' + prettyDate(event.datetime) + '</p>')
            .append($('<div></div')
                .append('<a href="' + event.ticket_url + '">' + 'Buy Tickets' + '</a>'))
            .html();
    } 

    return {
        search: function (artists, city, radius, callback) {

        	var bandsInTownUrl = 'http://api.bandsintown.com/events/search?'
        	for (var i = 0; i < artists.length; i++) {
        		bandsInTownUrl += 'artists[]=' + encodeURIComponent(artists[i]) + '&';
        	}
        	bandsInTownUrl += 'location=' + encodeURIComponent(city) + '&';
        	bandsInTownUrl += 'radius=' + radius + '&';
        	bandsInTownUrl += 'format=json&';
        	bandsInTownUrl += 'app_id=rdioconcertcal'
            $.ajax({
            	url: bandsInTownUrl,
            	dataType: 'jsonp',
            	success: function(data) {
                    console.log('data is:');
                    console.log(data);
                    var returnJson = [];
                    for (var i = 0; i < data.length; i++) {
                        returnJson.push({
                            date: data[i]['datetime'].split('T')[0],
                            event_title: data[i]['artists'][0]['name'],
                            event_details_html: createPopoverHtml(data[i])
                        });

                    }
            		callback(returnJson);
            	}
            });
	 	}
	};
})($);
