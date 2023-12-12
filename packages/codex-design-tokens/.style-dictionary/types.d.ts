export interface ThemeConfig {
	themeName: string,
	themeNamePrint: string,
	basePxFontSize: number,
	relativeTransformUnit: string,
	relativeTransformPaths: string[],
	relativeTransformExcludePaths: string[]
}

export interface PackageJson {
	name: string,
	version: string
}
