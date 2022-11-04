const core = require("@actions/core");
const github = require("@actions/github");
const fs = require('fs').promises;
const path = require('path');
const glob = require( 'glob' );
var sizeOf = require('image-size');

(
    async () => {
        try {
            // const images = await fs.readdir(
            //     path.join(process.env.GITHUB_WORKSPACE, 'images')
            // );
            const images = glob.sync( 'images/**/*.jpg').map(fileName => {
                console.log("fileName: ",  fileName );
                const dimensions = sizeOf(fileName);
                return {
                    imagePath: fileName,
                    height: dimensions.height,
                    width: dimensions.width
                };
            });
            console.log("images: ",  images );
            await fs.writeFile('image-sizes.json', JSON.stringify(images));
            core.notice("Calling my action image-sizes");
            core.notice(`Number of images in repo: ${images.length}`)
        } catch (e) {
            core.setFailed(e.message)
        }
        
    }
    
)();