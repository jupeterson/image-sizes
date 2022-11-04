const core = require("@actions/core");
const github = require("@actions/github");
const fs = require('fs');
const path = require('path');
const glob = require( 'glob' );
const sizeOf = require('image-size');

(
    async () => {
        try {
            const githubToken = core.getInput('repo_token');
            const octokit = github.getOctokit(githubToken);
            core.notice("Executing my action image-sizes");
            console.log("All images in current directory and below" );

            const tempImages = glob.sync( './**/*.jpg').map(fileName => {
                const dimensions = sizeOf(fileName);
                const fileInformation = {
                    imagePath: fileName,
                    height: dimensions.height,
                    width: dimensions.width
                };
                console.log(fileInformation );
                return fileInformation;
            });
            console.log("All images in 'images' directory and below" );
            const images = glob.sync( 'images/**/*.jpg').map(fileName => {
                const dimensions = sizeOf(fileName);
                const fileInformation = {
                    imagePath: fileName,
                    height: dimensions.height,
                    width: dimensions.width
                };
                console.log(fileInformation );
                return fileInformation;
            });
            core.notice(`Number of images in repo: ${images.length}`)
            fs.writeFileSync('images/image-sizes.json', JSON.stringify(images));
            
            core.notice(`Written file 'image-sizes.json'`)
        } catch (e) {
            core.setFailed(e.message)
        }
        
    }
    
)();