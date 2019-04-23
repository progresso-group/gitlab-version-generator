# gitlab-version-generator
Creates a json document for the [gitlab release api](https://docs.gitlab.com/ce/api/releases/) from a [changelog](https://keepachangelog.com) document.

## Introduction
To create a new release in gitlab, it is necessary to use the [release api](https://docs.gitlab.com/ce/api/releases/). As seen in the documentation, you have to submit a body in json like
```json
{
   "name":"New release",
   "tag_name":"v0.3",
   "description":"Super nice release",
   "assets":{
      "links":[
         {
            "name":"hoge",
            "url":"https://google.com"
         }
      ]
   }
}
```

To support our automated build process and include richer descriptions this tool was developed.

## Installation
Just install via npm `npm install -f @progresso/gitlab-release-generator`

## Usage
```
usage: create-release [-h] [-v] -n NAME -t TAG [-c CHANGELOG] [-a ASSETS]
                      [-f FILE]


Gitlab release generator

Optional arguments:
  -h, --help            Show this help message and exit.
  -v, --version         Show program's version number and exit.
  -n NAME, --name NAME  The name of the version
  -t TAG, --tag TAG     The name of the tag to create a release for
  -c CHANGELOG, --changelog CHANGELOG
                        The path of the changelog file. The file has to be in
                        "Keep a Changelog"-Format. See https://keepachangelog.
                        com
  -a ASSETS, --asset ASSETS
                        Assets to be added to the release. Can occur multiple
                        times and should be in format: "NAME::URL".
  -f FILE, --file FILE  The target json file
```

## Example
`create-release -n 1.1.1 -t 1.1.1 -c \path\to\changelog -f \path\to\release.json -a "npm::https://www.npmjs.com/package/@progresso/gitlab-release-generator/v/1.1.1"`

Is going to create `\path\to\release.json`

```
{
   "name":"1.1.1",
   "tag_name":"1.1.1",
   "description":"### Fixed\r\n- Something has been fixed",
   "assets":{
      "links":[
         {
            "npm":"https://www.npmjs.com/package/@progresso/gitlab-release-generator/v/1.1.1"
         }
      ]
   }
}
``` 

if your `\path\to\changelog` is in [KeepAChangelog Format (1.0.0)](https://keepachangelog.com/en/1.0.0/). This tool uses regular expression to find the version specified in the tag within the changelog file. This may break easily in case the format is changed/invalid.

You can then use this json to create a version in gitlab:
```
curl --header 'Content-Type: application/json' --header "PRIVATE-TOKEN: gDybLx3yrUK_HLp3qPjS" \
     -d \path\to\release.json
     --request POST http://localhost:3000/api/v4/projects/24/releases
```