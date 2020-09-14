module.exports = [{
	name: 'renderTemplate',
	type: 'confirm',
	message: 'Add example files for language routing?',
	default: true,
}, {
	name: 'replaceRouterLink',
	type: 'confirm',
	message: 'Replace <router-link> with <localized-link> in App.vue?',
	default: true,
}, {
	name: 'addLanguageSwitcher',
	type: 'confirm',
	message: 'Add example <language-switcher> component?',
	default: false,
}];