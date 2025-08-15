const fs = require("fs");
const path = require("path");
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function indexFolderComponents(folderToIndex) {
    const componentNameToFilePaths = {};

    function indexComponents(startingPath) {
        const files = fs.readdirSync(startingPath);

        files.forEach((file) => {
            const filePath = path.join(startingPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                indexComponents(filePath);
            } else if (stats.isFile() && filePath.endsWith('.tsx')) {
                const code = fs.readFileSync(filePath, 'utf8');
                const ast = babelParser.parse(code, {
                    sourceType: 'module',
                    plugins: ['typescript', 'jsx'],
                });

                traverse(ast, {
                    ExportNamedDeclaration(path) {
                        const decl = path.node.declaration;

                        if (decl) {
                            if (decl.id && decl.id.name) {
                                const name = decl.id.name;
                                if (!componentNameToFilePaths[name]) {
                                    componentNameToFilePaths[name] = [];
                                }
                                componentNameToFilePaths[name].push(filePath);
                            } else if (decl.declarations && decl.declarations.length) {
                                decl.declarations.forEach((decl) => {
                                    const name = decl.id.name;
                                    if (!componentNameToFilePaths[name]) {
                                        componentNameToFilePaths[name] = [];
                                    }
                                    componentNameToFilePaths[name].push(filePath);
                                });
                            }
                        } else if (path.node.specifiers) {
                            for (const spec of path.node.specifiers) {
                                const name = spec.exported.name;
                                if (!componentNameToFilePaths[name]) {
                                    componentNameToFilePaths[name] = [];
                                }
                                componentNameToFilePaths[name].push(filePath);
                            }
                        }
                    },
                });
            }
        });
    }

    indexComponents(folderToIndex);
    return componentNameToFilePaths;
}

module.exports = indexFolderComponents;
