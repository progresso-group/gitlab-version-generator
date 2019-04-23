
exports.parseAssets = function(assetsData) {
    var links = new Array();
    for(asset in assetsData) {
        var splitted = assetsData[asset].split("::");
        var key = splitted[0];
        var value = splitted[1];
        links.push( { [key] : value })
    }

    return links;
};