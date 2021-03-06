const fs = require('fs')

exports.writeToJson = function(jsonData, path) {
    var jsonContent = JSON.stringify(jsonData);

    fs.writeFile(path, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.')
            return console.log(err);
        }
    });
};