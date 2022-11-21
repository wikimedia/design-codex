import { DefaultTheme } from 'vitepress';

// We want to pass some config data to the CustomLayout component, so we need to extend VitePress's
// DefaultTheme.Config type.
export interface CustomConfig extends DefaultTheme.Config {
	isMainBranch: boolean,
	isBranchDeploy: boolean,
	patchID?: string
}
