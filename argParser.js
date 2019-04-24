exports.parseArgs = function() {
    var ArgumentParser = require('argparse').ArgumentParser;
    var parser = new ArgumentParser({
        version: '1.1.2',
        addHelp:true,
        description: 'Gitlab release generator'
      });
    
    parser.addArgument(
        ['-n', '--name'],
        {
            help: 'The name of the version',
            required: true
        }
    );

    parser.addArgument(
        ['-t', '--tag'],
        {
            help: 'The name of the tag to create a release for',
            required: true
        }
    );

    parser.addArgument(
        ['-c', '--changelog'],
        {
            help: 'The path of the changelog file. The file has to be in "Keep a Changelog"-Format. See https://keepachangelog.com',
            defaultValue: "CHANGELOG"
        }
    );
    
    parser.addArgument(
        ['-a', '--asset'],
        {
            help: 'Assets to be added to the release. Can occur multiple times and should be in format: "NAME::URL".',
            action: "append",
            dest: "assets"
        }
    );

    parser.addArgument(
        ['-f', '--file'],
        {
            help: 'The target json file.',
            defaultValue: "release.json"
        }
    );

    return parser.parseArgs();
}