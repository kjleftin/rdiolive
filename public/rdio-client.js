var RdioClient = (function($) {

    return {
        getArtistsForEmail: function (email) {
            $.ajax({
            	url: 'http://api.rdio.com/1',
                type: 'POST',
                data: {method: 'findUser',
                       email: 'kjleftin@gmail.com'},
            	dataType: 'jsonp',
            	success: function(data) {
            		console.log(data);
            	}
            });
	 	}
	};
})($);
