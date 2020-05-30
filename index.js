const core = require("@actions/core");
const {execSync} = require("child_process");

const dpl = (params, options) => {

    console.log("params", params);
    console.log("options", options);

    const keys = Object.keys(params);
    const paramsString = keys.map(key => {
        return `--${key}='${params[key]}' `
    }).join('');

    const cmd = `docker run -v $(pwd)${options.base_dir}:/tmp tiagogouvea/dpl ` + paramsString+  ' --skip-cleanup';
    console.log("cmd", cmd);

    const r = execSync(cmd);

    console.log(r.toString());
};

console.log("Let's go 1");

let dplParams = {};
dplParams.provider = core.getInput("provider");

if (dplParams.provider === 'heroku') {
    dplParams['api-key'] = core.getInput("api-key");
    dplParams.app = core.getInput("app");
}

let options = {};
options.base_dir = core.getInput("base-dir");

try {
    dpl(dplParams, options);

    core.setOutput(
        "status",
        "Successfully deployed"
    );
} catch (err) {
    core.setFailed(err.toString());
}