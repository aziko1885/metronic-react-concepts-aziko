const fs = require("fs");
const path = require("path");

function copyFolder(src, dest, ignoreFileNames = []) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }

    const items = fs.readdirSync(src);

    for (const item of items) {
        const srcPath = path.join(src, item);
        const destPath = path.join(dest, item);

        if (ignoreFileNames.some(file => srcPath.includes(file))) {
            continue;
        }

        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
            copyFolder(srcPath, destPath, ignoreFileNames);
        } else {
            if (path.basename(srcPath).includes("content")) {
                fs.copyFileSync(srcPath, `${path.dirname(destPath)}/content.tsx`);
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

module.exports = copyFolder;