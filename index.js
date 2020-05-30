const core = require("@actions/core");
const {execSync} = require("child_process");

// Docker container to use
const dplDockerTag = 'tiagogouvea/dpl:v1.8.47';

const dpl = (params, options) => {
    const keys = Object.keys(params);
    const paramsString = keys.map(key => {
        if (params[key])
            return `--${key}='${params[key]}' `;
    }).join('');

    const cmd = `docker run -v $(pwd)${options.base_dir}:/tmp ${dplDockerTag} ` + paramsString;

    console.log("params", params);
    console.log("options", options);
    console.log("cmd", cmd);

    execSync(cmd);
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