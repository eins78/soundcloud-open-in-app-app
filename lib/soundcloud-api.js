module.exports = {
  dataByUrl: function (ScUrl, callback) {
    var ScAppUrl = "soundcloud://tracks:";
    var ApiUrl = 
      'http://api.soundcloud.com/resolve.json?' + 
      'url=' + 'http://soundcloud.com' + ScUrl + 
      '&client_id=' + process.env.SC_client_id;
  
    console.log("Requesting " + ApiUrl);
  
    request({
        url: ApiUrl,
        json: true
      },
      function (err, apires, data) {
      
        // console.log(apires, data);
      
        // check for errors, abort if any
        if (err || !data ) {
          return callback("SoundCloud API error :(");
        }
        if (data.kind !== "track") {
          return callback("Input is not a SoundCloud track :(");
        }
        if (!data.id) {
          return callback("Could not find SoundCloud track id :(");
        }
        
        data.appUrl = ScAppUrl + data.id;
        callback(null, data);
      
      }
    );
    
  }
};
