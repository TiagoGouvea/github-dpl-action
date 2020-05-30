const core = require("@actions/core");
const {execSync} = require("child_process");

// Docker container to use
const dplDockerTag = 'tiagogouvea/dpl:v1.10.15';

const dpl = (params, options) => {

    // Remove empty params
    Object.keys(params).forEach((key) => (!params[key]) && delete params[key]);

    // Create a single string with params
    const keys = Object.keys(params);
    const paramsString = keys.map(key => `--${key}='${params[key]}' `).join('');

    // Create final docker command line
    const cmd = `docker run -v $(pwd)${options.base_dir}:/tmp ${dplDockerTag} ` + paramsString;

    // Log before start
    console.log("params", params);
    console.log("options", options);
    console.log("CMD command", cmd);

    // Run it
    core.info("Running dpl command...")
    const r = execSync(cmd);

    // Show results
    core.info("dpl results: " + r.toString());
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
}

// Additional options (not dpl options)
let options = {};
options.base_dir = core.getInput("base-dir");

try {
    // Dpl
    dpl(dplParams, options);

    // If no errors, we will be here
    core.setOutput(
        "result",
        "Successfully deployed"
    );
} catch (err) {
    core.setFailed(err.toString());
}