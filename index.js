const core = require("@actions/core");
const github = require("@actions/github");
const fs = require('fs');
const path = require('path');
const glob = require( 'glob' );

(
    async () => {
        try {
            // const images = await fs.readdir(
            //     path.join(process.env.GITHUB_WORKSPACE, 'images')
            // );
            let images = [];
            glob( 'images/**/*.jpg', function( err, files ) {
                console.log( files );
                images = [...images, ...files];
            });
            core.notice("Calling my action image-sizes");
            core.notice(`Number of images in repo: ${images.length}`)
        } catch (e) {
            core.setFailed(e.message)
        }
        
    }
    
)();