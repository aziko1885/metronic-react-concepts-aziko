const fs = require("fs");
const path = require("path");
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

const BUFFER_DIR = path.resolve(__dirname, "../buffer");

const nodePath = path;

function convertReactRouterLink(code) {
    let modified = false;
    const importRegex = /import\s*{([^}]+)}\s*from\s*['"]react-router(?:-dom)?['"];/g;

    code = code.replace(importRegex, (match, imports) => {
        const importList = imports.split(',').map(i => i.trim());
        const hasLink = importList.includes('Link');
        const hasUseLocation = importList.includes('useLocation');
        const newImportList = importList.filter(i => i !== 'Link' && i !== 'useLocation');

        let result = '';
        if (newImportList.length > 0) {
            result += `import { ${newImportList.join(', ')} } from 'react-router-dom';\n`;
        }

        if (hasLink) {
            result += `import Link from 'next/link';\n`;
            modified = true;
        }

        if (hasUseLocation) {
            result += `import { usePathname } from 'next/navigation';\n`;
            modified = true;
        }

        return result.trim();
    });

    const linkRegex = /<Link([^>]*)\bto\s*=\s*({[^}]+}|"(?:[^"]+)"|'(?:[^']+)')([^>]*)>/gm;

    code = code.replace(linkRegex, (match, before, toValue, after) => {
        modified = true;
        return `<Link${before} href=${toValue}${after}>`;
    });

    const useLocationCallRegex = /\buseLocation\(\)/g;
    if (useLocationCallRegex.test(code)) {
        code = code.replace(useLocationCallRegex, 'usePathname()');
        modified = true;
    }

    const destructuredRegex = /const\s*{\s*pathname\s*}\s*=\s*usePathname\(\);?/g;
    if (destructuredRegex.test(code)) {
        code = code.replace(destructuredRegex, 'const pathname = usePathname();');
        modified = true;
    }

    return modified ? code : null;
}


function convertToNextJsFormat(filePath, mapping) {
    let code = fs.readFileSync(filePath, 'utf-8');
    let modified = false;

    if (filePath.endsWith('.tsx')) {
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
                        resolvedPath = nodePath.resolve(source.replace('@', BUFFER_DIR).replace("pages", "app/(protected)"));
                    } else if (source.startsWith('.')) {
                        resolvedPath = nodePath.resolve(nodePath.dirname(filePath), source);
                    }
                    importMap[localName] = resolvedPath;
                }
            }
        });

        if (filePath.includes('app/(protected)/')) {
            const groupedImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*['"]@\/pages\/[^'"]+['"];?/g;
            code = code.replace(groupedImportRegex, (match, group) => {
                const componentNames = group.split(',').map(name => name.trim());
                const importLines = [];

                componentNames.forEach(componentName => {
                    if (mapping[componentName]) {
                        let newPath = mapping[componentName].find(file => file.includes(importMap[componentName]));
                        if (newPath) {
                            newPath= newPath.replace(BUFFER_DIR, "@");
                            newPath = newPath.replace(".tsx", "");
                            importLines.push(`import { ${componentName} } from '${newPath}';`);
                            modified = true;
                        }
                    }
                });

                return importLines.join('\n');
            });

            const relativeImportRegex = /import\s*{\s*([^}]+)}\s*from\s*['"](\.\/|\.\.\/|\.[^'"]*)['"];?/g;
            code = code.replace(relativeImportRegex, (match, group, importPath) => {
                if (importPath !== './components') {
                    const componentNames = group.split(',').map(name => name.trim());
                    const importLines = [];

                    for (const componentName of componentNames) {
                        if (mapping[componentName]) {
                            let absImportPath = mapping[componentName].find(file => file.includes(importMap[componentName])) ?? mapping[componentName][0];
                            if (absImportPath) {
                                absImportPath= absImportPath.replace(BUFFER_DIR, "@");
                                absImportPath = absImportPath.replace(".tsx", "");
                                importLines.push(`import { ${componentName} } from '${absImportPath}';`);
                                modified = true;
                            }
                        }
                    }

                    return importLines.join('\n');
                } else {
                    return match;
                }
            });
        }

        const converted = convertReactRouterLink(code);
        if (converted) {
            code = converted;
            modified = true;
        }

        if (!code.startsWith("'use client'") || !code.startsWith('"use client"')) {
            code = `'use client';\n\n${code}`;
            modified = true;
        }
    }

    if(code.includes("import.meta.env")) {
        code = code.replaceAll("import.meta.env", "process.env");
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, code, 'utf-8');
    }
}

module.exports = convertToNextJsFormat;
