const core = require("@actions/core");
const github = require("@actions/github");
const fs = require('fs');
const path = require('path');



(
    async () => {
        try {
            const images = fs.readdir(
                path.join(process.env.GITHUB_WORKSPACE, 'images')
            )
            core.notice("Calling my action image-sizes");
            core.notice(`Number of images in repo: ${images.length}`)
        } catch (e) {
            core.setFailed(e.message)
        }
        
    }
    
)();