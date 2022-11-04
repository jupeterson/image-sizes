const core = require("@actions/core");
const github = require("@actions/github");
const fs = require('fs');
const path = require('path');
const glob = require( 'glob' );
var sizeOf = require('image-size');

(
    async () => {
        try {
            // const images = await fs.readdir(
            //     path.join(process.env.GITHUB_WORKSPACE, 'images')
            // );
            core.notice("Calling my action image-sizes");
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