export default {
	en: {
		name: 'English',
		load: () => { return import('./en.json'); },
	},
	cn: {
		name: '简体中文',
		load: () => { return import('./zh-cn.json'); },
	},
	tw: {
		name: '繁體中文',
		load: () => { return import('./zh-tw.json'); },
	},
	jp: {
		name: '日本語',
		load: () => { return import('./jp.json'); },
	},
	kr: {
		name: '한국어',
		load: () => { return import('./kr.json'); },
	},
};
