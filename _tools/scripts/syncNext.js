const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
const indexFolderComponents = require("../utils/indexFolderComponents.js");
const copyFolder = require("../utils/copyFolder.js");
const getRouteToPageFileMapping = require("../utils/getRouteToPageFileMapping.js");
const processViteFilesBeforeCopy = require("../utils/processViteFilesBeforeCopy.js");
const removeAsync = require("../utils/removeAsync");

const VITE_APP_SRC_DIR = path.resolve(__dirname, "../../typescript/vite/src");
const VITE_APP_ROOT_ROUTER_FILE_PATH = path.join(
	VITE_APP_SRC_DIR,
	"/routing/app-routing-setup.tsx"
);
const NEXT_JS_OUTPUT = path.resolve(__dirname, "../../typescript/nextjs");
const BUFFER_DIR = path.resolve(__dirname, "../buffer");

const COMMON_PAGE_ENTRIES = [
	"account/page-navbar.tsx",
	"public-profile/page-menu.tsx",
	"store-client/components",
	"store-client/checkout/steps.tsx",
	"store-admin/components",
];

const ENTRIES_TO_SKIP = [
	"/providers/i18n-provider.tsx",
	"/partials/topbar/user-dropdown-menu.tsx",
	"/components/supabase",
	"/lib/supabase.ts",
	"/layouts/error",
];

async function syncNext() {
	await removeAsync(BUFFER_DIR);
	fs.mkdirSync("./mappings", { recursive: true });
	const viteAppComponentNameToFilePathMapping =
		indexFolderComponents(VITE_APP_SRC_DIR);
	fse.writeJsonSync(
		"./mappings/viteAppComponentNameToFilePathMapping.json",
		viteAppComponentNameToFilePathMapping,
		{ spaces: 2 }
	);
	const viteAppRoutePathToPageFile = getRouteToPageFileMapping(
		VITE_APP_ROOT_ROUTER_FILE_PATH,
		viteAppComponentNameToFilePathMapping
	);
	copyFolder(
		`${VITE_APP_SRC_DIR}/hooks`,
		`${BUFFER_DIR}/hooks`,
		ENTRIES_TO_SKIP
	);
	copyFolder(
		`${VITE_APP_SRC_DIR}/components`,
		`${BUFFER_DIR}/components`,
		ENTRIES_TO_SKIP
	);
	copyFolder(`${VITE_APP_SRC_DIR}/css`, `${BUFFER_DIR}/css`, ENTRIES_TO_SKIP);
	copyFolder(`${VITE_APP_SRC_DIR}/lib`, `${BUFFER_DIR}/lib`, ENTRIES_TO_SKIP);
	copyFolder(
		`${VITE_APP_SRC_DIR}/providers`,
		`${BUFFER_DIR}/providers`,
		ENTRIES_TO_SKIP
	);
	copyFolder(
		`${VITE_APP_SRC_DIR}/partials`,
		`${BUFFER_DIR}/app/components/partials`,
		ENTRIES_TO_SKIP
	);
	copyFolder(
		`${VITE_APP_SRC_DIR}/layouts`,
		`${BUFFER_DIR}/app/components/layouts`,
		ENTRIES_TO_SKIP
	);
	const filteredKeys = Object.keys(viteAppRoutePathToPageFile).filter(
		(r) =>
			!/^(\.|\/|auth|error|\/dark-sidebar)$/.test(r) &&
			!r.includes("*") &&
			!r.includes("error")
	);
	filteredKeys.forEach((route) => {
		const nesting = route.split("/");
		const folderPath = path.resolve(
			__dirname,
			"../buffer/app/(protected)/",
			...nesting
		);
		fs.mkdirSync(folderPath, { recursive: true });
		copyFolder(path.dirname(viteAppRoutePathToPageFile[route]), folderPath, [
			path.basename(viteAppRoutePathToPageFile[route]),
			`${path.dirname(viteAppRoutePathToPageFile[route])}/index.ts`,
		]);
		const pageFile = `${folderPath}/page.tsx`;
		fse.copySync(viteAppRoutePathToPageFile[route], pageFile);
		let code = fs.readFileSync(pageFile, "utf-8");
		code = code.replace("export function ", "export default function ");
		fs.writeFileSync(pageFile, code, "utf-8");
	});
	COMMON_PAGE_ENTRIES.forEach((item) => {
		if (item.endsWith("tsx") || item.endsWith("ts")) {
			fse.copySync(
				`${VITE_APP_SRC_DIR}/pages/${item}`,
				`${path.resolve(__dirname, "../buffer/app/(protected)/")}/${item}`
			);
		} else {
			copyFolder(
				`${VITE_APP_SRC_DIR}/partials/${item}`,
				`${BUFFER_DIR}/app/components/partials/${item}`
			);
		}
	});
	processViteFilesBeforeCopy(BUFFER_DIR);
	copyFolder(BUFFER_DIR, NEXT_JS_OUTPUT);
}

syncNext();
