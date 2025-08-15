const path = require("path");
const fse = require("fs-extra");
const removeAsync = require("../utils/removeAsync.js");
const exec = require("../utils/exec.js");
const processFolder = require("../utils/processFolder.js");
const copyFolder = require("../utils/copyFolder.js");

const NEXT_TYPESCRIPT_SOURCE_PATH = path.resolve(__dirname, "../../typescript/nextjs");
const OUTPUT_PATH = path.resolve(__dirname, "../../javascript/nextjs");
const TEMPLATE_FILE = path.resolve(__dirname, "../nextjs");

const FILES_TO_COPY = [
    "app",
    "components",
    "config",
    // "css",
    "hooks",
    // "i18n",
    "lib",
    // "prisma",
    // "providers",
    "public",
    "styles",
    // "services",
    // "types",
    // ".env",
    // ".env.example",
    // ".env.production",
    ".prettierignore",
    ".prettierrc",
    "eslint.config.mjs",
    "postcss.config.mjs",
    "README.md"
];

async function jsGeneratorNext() {
    await removeAsync(OUTPUT_PATH);

    await copyFolder(TEMPLATE_FILE, OUTPUT_PATH);

    await Promise.all(FILES_TO_COPY.map(async (file) => {
        return await fse.copy(`${NEXT_TYPESCRIPT_SOURCE_PATH}/${file}`, `${OUTPUT_PATH}/${file}`)
    }));

    await processFolder(OUTPUT_PATH);

    const sourcePackageJson = fse.readJsonSync(`${NEXT_TYPESCRIPT_SOURCE_PATH}/package.json`);
    const neededDevDependencies = Object.keys(sourcePackageJson.devDependencies)
        .filter(key => !key.includes("@types") && !key.includes("typescript"));
    const finalDevDependencies = {};
    neededDevDependencies.forEach(key => {
        finalDevDependencies[key] = sourcePackageJson.devDependencies[key]
    })

    fse.writeJsonSync(`${OUTPUT_PATH}/package.json`, {
        ...sourcePackageJson,
        dependencies: {
            ...sourcePackageJson.dependencies,
        },
        devDependencies: {
            ...finalDevDependencies,
        }
    }, { spaces: 2 });
}

jsGeneratorNext();