const fs = require('fs')

exports.getDescription = function(path, tag) {
    if (!fs.existsSync(path)) {
        throw "Changelog not found in path " + path;
    }
    var contents = fs.readFileSync(path, 'utf8');

    // first find the start of the changelog entry
    // e.g. ## [1.6.3] - 2019-04-09
    // and select everything after that
    var matches = contents.match(`## \\[${tag}\\][\\s\\S]*`);
    if (matches !== null) {
        contents = matches[0];
        var startIndex = contents.indexOf('###');

        // find the end, which is normally the start of the next
        // changelog entry
        var endIndex = contents.indexOf('## [', 1);

        // if end is not found, it is the only or first changelog version
        if (endIndex === -1) {
            contents = contents.substr(startIndex);
        } else {
            var length = endIndex - startIndex;
            contents = contents.substr(startIndex, length);
        }
    } else {
        contents = "No changelog available"
    }

    return contents.trim();
}