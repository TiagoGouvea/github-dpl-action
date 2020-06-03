const core = require("@actions/core");
const exec = require('@actions/exec');

// Docker container to use
const dplDockerTag = 'tiagogouvea/dpl:v1.10.15';

const dpl = async (params, options) => {

    // Remove empty params
    Object.keys(params).forEach((key) => (!params[key]) && delete params[key]);

    // Create a single string with params
    const keys = Object.keys(params);
    const paramsString = keys.map(key => `--${key}='${params[key]}' `).join('');

    // Create final docker command line
    const cmd = `docker run -v ~/${options.base_dir}:/tmp ${dplDockerTag} ` + paramsString;

    // Log before start
    core.debug("paramsL " + JSON.stringify(params));
    core.debug("options: " + JSON.stringify(options));
    core.debug("CMD command: " + cmd);

    // Run it
    core.info("Running dpl command...");
    await exec.exec(cmd);

    // Show results
    // core.info("dpl results: " + r.toString());
    core.info("dpl succeed 🎉");
};

// Construct dpl cmd params
let dplParams = {};
dplParams.provider = core.getInput("provider");

// Provider - Heroku
if (dplParams.provider === 'heroku') {
    dplParams['api-key'] = core.getInput("api-key");
    dplParams.app = core.getInput("app");
    dplParams.strategy = core.getInput("strategy");
    dplParams.username = core.getInput("username");
    dplParams.password = core.getInput("password");
    dplParams.skip_cleanup = core.getInput("skip_cleanup");
}

// Additional options (not dpl options)
let options = {};
options.base_dir = core.getInput("base-dir");

// Dpl
dpl(dplParams, options).then(r => {
    // No Errors
    core.setOutput(
        "result",
        "Successfully deployed"
    );
}).catch(err=>{
    // :(
    core.info("dpl failed 😞");
    core.setFailed(err.toString());
});
