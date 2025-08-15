const babel = require("@babel/core");
const fs = require("fs");
const path = require("path");

function processFolder(directory) {
    const files = fs.readdirSync(directory);

    files.forEach(async (file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            processFolder(filePath);
        } else if (filePath.endsWith('.tsx')) {
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsxCode = babel.transformSync(fileContent, {
                filename: filePath,
                presets: ['@babel/preset-typescript'],
                retainLines: true,
                compact: false,
                generatorOpts: {
                    retainLines: true,
                    comments: true,
                },
            }).code;

            const jsxFilePath = filePath.replace('.tsx', '.jsx');
            fs.writeFileSync(jsxFilePath, jsxCode, 'utf-8');
            fs.unlinkSync(filePath);
        } else if(filePath.includes("types")) {
            fs.unlinkSync(filePath);
        } else if (filePath.includes("index.ts")) {
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            let result = babel.transformSync(fileContent, {
                    filename: filePath,
                    presets: ['@babel/preset-typescript'],
                    plugins: ['@babel/plugin-transform-typescript'],
                    retainLines: true,
                    compact: false,
                    generatorOpts: {
                        retainLines: true,
                        comments: true,
                    },
                }
            ).code;
            result = result.replaceAll(".tsx", "");
            result = result.replace("export * from './types';", "");
            const jsFilePath = filePath.replace('.ts', '.js');
            fs.writeFileSync(jsFilePath, result, 'utf-8');
            fs.unlinkSync(filePath);
        } else if (filePath.includes(".ts")) {
            let fileContent = fs.readFileSync(filePath, 'utf-8');
            let result = babel.transformSync(fileContent, {
                    filename: filePath,
                    presets: ['@babel/preset-typescript'],
                    plugins: ['@babel/plugin-transform-typescript'],
                    retainLines: true,
                    compact: false,
                    generatorOpts: {
                        retainLines: true,
                        comments: true,
                    },
                }
            ).code;
            const jsxFilePath = filePath.replace('.ts', '.js');
            fs.writeFileSync(jsxFilePath, result, 'utf-8');
            fs.unlinkSync(filePath);
        }
    });
}

module.exports = processFolder;