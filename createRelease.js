const jsonWriter = require("./jsonWriter");
const assetParser = require("./assetParser")
const changelogParser = require("./changelogParser");

exports.createRelease = function(args) {
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
    
    jsonWriter.writeToJson(release, args.file);
    
    console.log("Successfully written release file to " + args.file);
}
