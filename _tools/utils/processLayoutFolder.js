const fs = require("fs");
const path = require("path");

function removeUnusedDestructuredImport(code, { importName, source, variable }) {
    const declarationPattern = new RegExp(
        `^\\s*const\\s*\\{\\s*${variable}\\s*\\}\\s*=\\s*${importName}\\(\\);\\s*$`,
        'gm'
    );

    const importPattern = new RegExp(
        `^\\s*import\\s+\\{([^}]*)\\}\\s+from\\s+['"]${source}['"];?\\s*$`,
        'gm'
    );

    // Temporarily remove both the destructuring and the import
    const tempCode = code
        .replace(declarationPattern, '')
        .replace(importPattern, (match, imports) => {
            const updatedImports = imports
                .split(',')
                .map(i => i.trim())
                .filter(i => i !== importName)
                .join(', ');
            return updatedImports ? `import { ${updatedImports} } from '${source}';` : '';
        });

    const variableUsedElsewhere = new RegExp(`\\b${variable}\\b`).test(tempCode);

    if (!variableUsedElsewhere) {
        code = tempCode;
    }

    return code;
}

function processLayoutFolder(processPath) {
    function processFolder(processPath) {
        const files = fs.readdirSync(processPath);
        files.forEach(async (file) => {
            const filePath = path.join(processPath, file);
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                processFolder(filePath);
            } else if (stats.isFile()) {
                let code = fs.readFileSync(filePath, 'utf-8');
                let hadOutlet = false;
                code = code.replace(/import\s+\{\s*Helmet\s*\}\s+from\s+['"]react-helmet-async['"];?\n?/g, '');
                code = code.replace(/<Helmet[^>]*>[\s\S]*?<\/Helmet>\s*/g, '');
                code = code.replace(
                    /import\s+\{\s*([^}]+)\}\s+from\s+['"]react-router-dom['"];?\n?/g,
                    (match, imports) => {
                        const updatedImports = imports
                            .split(',')
                            .map(s => s.trim())
                            .filter(i => i !== 'Outlet');

                        if (updatedImports.length === 0) {
                            return '';
                        }

                        return `import { ${updatedImports.join(', ')} } from 'react-router-dom';\n`;
                    }
                );
                if (/<\s*Outlet\s*\/\s*>/.test(code)) {
                    hadOutlet = true;
                    code = code.replace(/<\s*Outlet\s*\/\s*>/g, '{children}');
                }

                code = removeUnusedDestructuredImport(code, {
                    importName: 'MENU_SIDEBAR',
                    source: '@/config/menu.config',
                    variable: 'MENU_SIDEBAR',
                });

                code = removeUnusedDestructuredImport(code, {
                    importName: 'useLocation',
                    source: 'react-router-dom',
                    variable: 'pathname',
                });

                if (hadOutlet) {
                    if (!/ReactNode/.test(code)) {
                        code = `import { ReactNode } from 'react';\n` + code;
                    }
                    code = code.replace(
                        /function\s+(\w+)\s*\(\s*\)/,
                        'function $1({ children }: { children: ReactNode })'
                    );
                }
                fs.writeFileSync(filePath, code, 'utf-8');
            }
        })
    }
    processFolder(processPath);
}

module.exports = processLayoutFolder;