var parser = require("./argParser");
var jsonWriter = require("./jsonWriter");
var assetParser = require("./assetParser")

var args = parser.parseArgs();
var assetLinks = assetParser.parseAssets(args.assets);

var release = {
    name: args.name,
    tag_name: args.tag,
    assets: {
        links: assetLinks
    }
}

jsonWriter.writeToJson(release);