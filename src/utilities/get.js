// Get nested object value painlessly
// Example: (x, 'a.b.c')
export default (obj, key) => {
	return key.split('.').reduce((o, x) => {
		return (typeof o == 'undefined' || o === null) ? o : o[x];
	}, obj);
};
