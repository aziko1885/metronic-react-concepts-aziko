const fs = require("fs");
const path = require("path");
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const nodePath = path;

function getRouteToPageFileMapping(routerFilePath, allComponentsMapping) {
    const VITE_APP_SRC_DIR = path.resolve(__dirname, '../../typescript/vite/src');
    const VITE_APP_ROUTE_PATH_TO_PAGE_FILE = {};

    function extractRoutes(filePath, basePath = '') {
        if (!fs.existsSync(filePath)) return;

        const code = fs.readFileSync(filePath, 'utf8');
        const ast = babelParser.parse(code, {
            sourceType: 'module',
            plugins: ['typescript', 'jsx'],
        });

        const importMap = {};
        traverse(ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                for (const spec of path.node.specifiers) {
                    const localName = spec.local.name;
                    let resolvedPath = source;
                    if (source.startsWith('@/')) {
                        resolvedPath = nodePath.resolve(source.replace('@', VITE_APP_SRC_DIR));
                    } else if (source.startsWith('.')) {
                        resolvedPath = nodePath.resolve(nodePath.dirname(filePath), source);
                    }
                    importMap[localName] = resolvedPath;
                }
            }
        });
        traverse(ast, {
            JSXElement({ node }) {
                if (node.openingElement.name.name !== 'Route') return;

                let routePath = null;
                let elementInfo = null;

                for (const attr of node.openingElement.attributes) {
                    const attrName = attr.name?.name;

                    if (attrName === 'path') {
                        routePath = attr.value?.value;
                    }

                    if (attrName === 'element') {
                        const expr = attr.value?.expression;

                        if (expr?.type === 'JSXElement') {
                            const compName = expr.openingElement.name.name;

                            if (compName === 'Navigate') {
                                const toAttr = expr.openingElement.attributes.find(a => a.name.name === 'to');
                                elementInfo = `Redirect to ${toAttr?.value?.value || '?'}`;
                            } else {
                                const targetFile = allComponentsMapping[compName].find(file => file.includes(importMap[compName]));
                                if (targetFile) {
                                    elementInfo = targetFile;
                                    if (
                                        typeof targetFile === 'string' &&
                                        targetFile.endsWith('.tsx') &&
                                        fs.existsSync(targetFile)
                                    ) {
                                        const nextBase = routePath?.includes('*')
                                            ? path.join(basePath, routePath.replace('/*', '').replace('*', ''))
                                            : path.join(basePath, routePath || '');
                                        extractRoutes(targetFile, nextBase);
                                    }
                                } else {
                                    elementInfo = `[UNKNOWN: ${compName}]`;
                                }
                            }
                        }
                    }
                }

                if (routePath && elementInfo) {
                    const cleanPath = path.join(basePath, routePath.replace('/*', '').replace('*', ''));
                    VITE_APP_ROUTE_PATH_TO_PAGE_FILE[cleanPath || '/'] = elementInfo;
                }
            }
        });
    }

    extractRoutes(routerFilePath);
    return VITE_APP_ROUTE_PATH_TO_PAGE_FILE;
}

module.exports = getRouteToPageFileMapping;