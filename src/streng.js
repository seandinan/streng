export function toSentenceCase(str, index){
	// https://en.wikipedia.org/wiki/Letter_case#Sentence_Case
	if (index !== 0 && str.length <= 3) return str;
	return `${str}`.slice(0, 1).toUpperCase() + `${str}`.slice(1);
}

export function toUpperCase(str){
	return `${str}`.toUpperCase();
}

export function toLowerCase(str){
	return `${str}`.toLowerCase();
}

export function toTitleCase(str){
	// https://en.wikipedia.org/wiki/Letter_case#Title_Case
	return `${str}`.split(' ').map(toSentenceCase).join(' ');
}

export function toSnakeCase(str){
	return `${str}`.toLowerCase().split(' ').join('_');
}

export function snakeToCamel(str){
	return str.split('_').reduce((a, b, i) => {
		if      (i === 0)                 return a + b;
		else if (toLowerCase(b) === 'id') return a + toUpperCase(b);
		else                              return a + toTitleCase(b);
	}, '');
}

export function camelToSnake(str){
	return str
		.replace(/ID/g, 'Id')
		.split('')
		.map((v, i) => {
			const isNumber = (char) => !isNaN(parseInt(char));
			if (i === 0) return v.toLowerCase();
			if (isNumber(v) && !isNumber(str[i - 1])) return `_${v}`;
			if (v !== v.toLowerCase()) return `_${v.toLowerCase()}`;
			return v.toLowerCase();
		}).join('');
}

export function snakeObjectToCamelObject(obj){
	// Iterates through an object and converts all keys to camelCase
	let result = {};
	Object.keys(obj).forEach(key => {
		if (obj[key] == null) result[snakeToCamel(key)] = obj[key];
		else if (Array.isArray(obj[key])){
			result[snakeToCamel(key)] = obj[key].map(val => {
				if (val.constructor.name === 'Object'){
					return snakeObjectToCamelObject(val);
				} else return val;
			});
		} else if (obj[key].constructor.name === 'Object'){
			result[snakeToCamel(key)] = snakeObjectToCamelObject(obj[key]);
		} else result[snakeToCamel(key)] = obj[key];
	});
	return result;
}

export function camelObjectToSnakeObject(obj){
	// Iterates through an object and converts all keys to camelCase
	let result = {};
	Object.keys(obj).forEach(key => {
		if (obj[key] == null) result[camelToSnake(key)] = obj[key];
		else if (Array.isArray(obj[key])){
			result[camelToSnake(key)] = obj[key].map(val => {
				if (val.constructor.name === 'Object'){
					return camelObjectToSnakeObject(val);
				} else return val;
			});
		} else if (obj[key].constructor.name === 'Object'){
			result[camelToSnake(key)] = camelObjectToSnakeObject(obj[key]);
		} else result[camelToSnake(key)] = obj[key];
	});
	return result;
}

export function shortenWithCenterEllipsis(str, length){
	let amt = (length - 3) / 2;
	if (str.length <= length) return str;
	return `${str.slice(0, amt)}...${str.slice(-amt)}`;
}

export function toListFromArray(arr = []){
	const data = [ ...arr ];
	if (data.length <= 1){
		return data[0];
	} else if (data.length === 2){
		return data.join(' and ');
	} else {
		data[data.length - 1] = `and ${data[data.length - 1]}`;
		return data.join(', ');
	}
}

export function splitTimeString(str){
	let result = { hours: 0, minutes: 0 };
	const setFromSplitValues = (values) => {
		result.hours = parseInt(values[0]);
		result.minutes = parseInt(values[1]);
	};
	if (str.split(':').length > 1) setFromSplitValues(str.toLowerCase().split(':'));
	else if (str.split('.').length > 1) setFromSplitValues(str.toLowerCase().split('.'));
	else result.hours = parseInt(str);
	if (str.toLowerCase().includes('pm') && result.hours < 12) result.hours += 12;
	return result;
}
