const core = require("@actions/core");
const github = require("@actions/github");

(
    async () => {
        try {
            core.notice("Calling my action image-sizes")
        } catch (e) {
            core.setFailed(e.message)
        }
        
    }
    
)();