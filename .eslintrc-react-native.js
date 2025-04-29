module.exports = {
	extends: ["./.eslintrc.cjs"],
	rules: {
		quotes: "off",
		"@typescript-eslint/quotes": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/consistent-type-assertions": "off",
		"@typescript-eslint/naming-convention": "off",
		"unicorn/filename-case": "off",
		"import/order": "off",
		"@typescript-eslint/tslint/config": [
			"error",
			{
				rules: {
					"ordered-imports": "off",
				},
			},
		],
	},
};
