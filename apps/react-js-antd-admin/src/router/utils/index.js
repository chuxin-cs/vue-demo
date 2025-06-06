/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getRoutesFromModules() {
	const menuModules = [];

	const modules = import.meta.glob("../modules/**/*.jsx", {
		eager: true,
	});
	for (const key in modules) {
		const mod = modules[key].default || {};
		const modList = Array.isArray(mod) ? [...mod] : [mod];
		menuModules.push(...modList);
	}
	return menuModules;
}