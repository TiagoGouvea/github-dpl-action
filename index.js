const core = require("@actions/core");
const {execSync} = require("child_process");

const dpl = (params) => {

    console.log("params", params);

    const keys = Object.keys(params);
    const paramsString = keys.map(key => {
        return `--${key}='${params[key]}' `
    }).join('');

    const cmd = `docker run tiagogouvea/dpl ` + paramsString;
    console.log("cmd", cmd);

    const r = execSync(cmd);

    console.log(r.toString());
};

console.log("Let's go");

let dplParams = {};
dplParams.provider = core.getInput("provider");

if (dplParams.provider === 'heroku') {
    dplParams['api-key'] = core.getInput("api-key");
    dplParams.app = core.getInput("app");
}

try {
    dpl(dplParams);

    core.setOutput(
        "status",
        "Successfully deployed"
    );
} catch (err) {
    core.setFailed(err.toString());
}