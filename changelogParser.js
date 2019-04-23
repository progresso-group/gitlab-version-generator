const fs = require('fs')

exports.getDescription = function(path, tag) {
    if (!fs.existsSync(path)) {
        throw "Changelog not found in path " + path;
    }
    var contents = fs.readFileSync(path, 'utf8');
    contents = contents.match(`## \\[${tag}\\][\\s\\S]*`)[0];
    var startIndex = contents.indexOf('###');
    var length = contents.indexOf('## [', 1) - startIndex;
    contents = contents.substr(startIndex, length);
    return contents.trim();
}