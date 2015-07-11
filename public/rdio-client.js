var RdioClient = (function($) {

    return {
        call: function (method, params, callback) {
          $.ajax({
            type: 'POST',
            url: 'rdio/' + method,
            processData: false,
            data: JSON.stringify(params),
            success: function(data) {
              callback(JSON.parse(data));
            }
          });
	 	}
	};
})($);
