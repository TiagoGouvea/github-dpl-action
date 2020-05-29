const core = require("@actions/core");
const { execSync } = require("child_process");

const dpl = ({ params }) => {

    console.log("params",params);

    const keys = Object.keys(params);
    const paramsString = keys.map(key=>{
        return `--${key}='${params[key]}' `
    });

    const cmd = `dpl `+paramsString;
    console.log("cmd", cmd);

    const r = execSync(cmd);

    console.log(r);
};

let dplParams = {}
dpl.provider =  core.getInput("provider");

if (dpl.provider==='heroku'){
    dpl.api_key = core.getInput("heroku_api_key");
    dpl.api_key = core.getInput("heroku_api_key");
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