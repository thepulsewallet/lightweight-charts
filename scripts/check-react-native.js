#!/usr/bin/env node

const { execSync } = require("child_process");
const { existsSync } = require("fs");
const { join } = require("path");

// React Native specific files
const files = [
	"./src/renderers/react-native-canvas-renderer.ts",
	"./src/components/Chart.tsx",
	"./src/api/chart-api-react-native.ts",
	"./src/react-native.ts",
	"./examples/react-native/SimpleChartExample.tsx",
];

// Check if all files exist
const missingFiles = files.filter(
	(file) => !existsSync(join(process.cwd(), file))
);
if (missingFiles.length > 0) {
	console.error("The following files do not exist:");
	missingFiles.forEach((file) => console.error(`- ${file}`));
	process.exit(1);
}

// Disable quotes rule for ESLint
const eslintCommand = `eslint --format=unix --rule "quotes:off" --rule "@typescript-eslint/quotes:off" ${files.join(
	" "
)}`;

try {
	console.log("Running ESLint on React Native files...");
	execSync(eslintCommand, { stdio: "inherit" });
	console.log("All React Native files passed ESLint check!");
} catch (error) {
	console.error("ESLint check failed for React Native files.");
	process.exit(1);
}
