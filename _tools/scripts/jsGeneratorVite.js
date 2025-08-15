const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const removeAsync = require("../utils/removeAsync.js");
const exec = require("../utils/exec.js");
const processFolder = require("../utils/processFolder.js");

const VITE_TYPESCRIPT_SOURCE_PATH = path.resolve(__dirname, "../../typescript/vite");
const OUTPUT_PATH = path.resolve(__dirname, "../../javascript/vite");
const TEMPLATE_FILE = path.resolve(__dirname, "../javascript");

const FILES_TO_COPY = [
    "public",
    // "src/auth",
    "src/components",
    "src/crm",
    // "src/config",
    // "src/css",
    // "src/errors",
    "src/hooks",
    // "src/i18n",
    // "src/layouts",
    "src/lib",
    // "src/pages",
    // "src/partials",
    "src/providers",
    // "src/routing",
    "src/styles",
    "src/App.tsx",
    "src/main.tsx",
    ".env",
    "index.html",
    "components.json",
    ".prettierignore",
    ".prettierrc",
    "vite.config.ts"
];

async function generateJsVersion() {
    await removeAsync(OUTPUT_PATH);
    await removeAsync(TEMPLATE_FILE);

    await exec("npm create vite@latest javascript -- --template react");

    await removeAsync(`${TEMPLATE_FILE}/src/assets`);
    await removeAsync(`${TEMPLATE_FILE}/src/App.css`);
    await removeAsync(`${TEMPLATE_FILE}/src/index.css`);

    await fse.copy(`javascript`, OUTPUT_PATH);

    await Promise.all(FILES_TO_COPY.map(async (file) => {
        return await fse.copy(`${VITE_TYPESCRIPT_SOURCE_PATH}/${file}`, `${OUTPUT_PATH}/${file}`)
    }));

    await processFolder(OUTPUT_PATH);

    let indexHTMLContent = fs.readFileSync(`${OUTPUT_PATH}/index.html`, 'utf-8');
    indexHTMLContent = indexHTMLContent.replace("main.tsx", "main.jsx");
    fs.writeFileSync(`${OUTPUT_PATH}/index.html`, indexHTMLContent, 'utf-8');

    const sourcePackageJson = fse.readJsonSync(`${VITE_TYPESCRIPT_SOURCE_PATH}/package.json`);
    const destinationPackageJson = fse.readJsonSync(`${OUTPUT_PATH}/package.json`);

    const neededDevDependencies = Object.keys(sourcePackageJson.devDependencies)
        .filter(key => !key.includes("@types") && !key.includes("typescript"));
    const finalDevDependencies = {};
    neededDevDependencies.forEach(key => {
        finalDevDependencies[key] = sourcePackageJson.devDependencies[key]
    })

    fse.writeJsonSync(`${OUTPUT_PATH}/package.json`, {
        ...destinationPackageJson,
        dependencies: {
            ...destinationPackageJson.dependencies,
            ...sourcePackageJson.dependencies,
        },
        devDependencies: {
            ...destinationPackageJson.devDependencies,
            ...finalDevDependencies,
        }
    }, { spaces: 2 });
}
  
generateJsVersion();