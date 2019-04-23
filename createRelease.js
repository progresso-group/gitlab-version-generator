var parser = require("./argParser");
var jsonWriter = require("./jsonWriter");
var assetParser = require("./assetParser")
var changelogParser = require("./changelogParser");

var args = parser.parseArgs();
console.log("Creating release information for version " + args.tag);
var assetLinks = assetParser.parseAssets(args.assets);
var description = changelogParser.getDescription(args.changelog, args.tag);

var release = {
    name: args.name,
    tag_name: args.tag,
    description: description,
    assets: {
        links: assetLinks
    }
}

jsonWriter.writeToJson(release, args.path);

console.log("Successfully written release file to " + args.path);