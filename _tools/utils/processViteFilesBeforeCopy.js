const fs = require("fs");
const path = require("path");
const convertToNextJsFormat = require("./convertToNextJsFormat");
const indexFolderComponents = require("./indexFolderComponents");
const fse = require("fs-extra");

function processViteFilesBeforeCopy(processPath) {
    const BUFFER_COMPONENTS_TO_FILE_PATH = indexFolderComponents(processPath);
    fse.writeJsonSync("./mappings/bufferComponentsToFilesPathMapping.json", BUFFER_COMPONENTS_TO_FILE_PATH, { spaces: 2 });

    function processFolder(processPath) {
        const files = fs.readdirSync(processPath);
        files.forEach(async (file) => {
            const filePath = path.join(processPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                processFolder(filePath);
            } else if (stats.isFile()) {
                convertToNextJsFormat(filePath, BUFFER_COMPONENTS_TO_FILE_PATH);
            }
        })
    }

    processFolder(processPath);
}

module.exports = processViteFilesBeforeCopy;