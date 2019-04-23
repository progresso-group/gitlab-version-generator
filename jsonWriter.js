const fs = require('fs')

exports.writeToJson = function(jsonData) {
    var jsonContent = JSON.stringify(jsonData);

    fs.writeFile("release.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.')
            return console.log(err);
        }
    });
};