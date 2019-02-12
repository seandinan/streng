import {
	toTitleCase,
	toLowerCase,
	toSentenceCase,
	snakeObjectToCamelObject,
	camelObjectToSnakeObject,
	snakeToCamel,
	camelToSnake,
	toUpperCase,
	toSnakeCase,
	toListFromArray,
	splitTimeString,
} from './../src/streng';

describe('streng', () => {
	it('converts a string to uppercase', () => {
		expect(toUpperCase('sample Text')).toEqual('SAMPLE TEXT');
	});

	it('converts a string to lowercase', () => {
		expect(toLowerCase('sample Text')).toEqual('sample text');
	});

	it('converts a string to titlecase', () => {
		expect(toTitleCase('a sample sentence')).toEqual('A Sample Sentence');
	});

	it('converts a string to sentencecase', () => {
		expect(toSentenceCase('a sample sentence')).toEqual('A sample sentence');
	});

	it ('converts a string to snakecase', () => {
		expect(toSnakeCase('some type ofString')).toEqual('some_type_ofstring');
	});

	it ('converts snakecase to camelcase', () => {
		expect(snakeToCamel('a_sample_variable')).toEqual('aSampleVariable');
	});

	it ('converts camelcase to snakecase', () => {
		expect(camelToSnake('aSampleVariable')).toEqual('a_sample_variable');
	});

	it ('converts an object from snakecase to camelcase', () => {
		const sample = {
			key_a: { key_a_1: 'test1', key_a2: 'test2' },
			key_b: [ { key_b_1: 'test3', key_b2: 'test4' }, { key_b_3: 'test5', key_b4: 'test6' } ],
			key_c: 'test7'
		};

		const formattedSample = {
			keyA: { keyA1: 'test1', keyA2: 'test2' },
			keyB: [ { keyB1: 'test3', keyB2: 'test4' }, { keyB3: 'test5', keyB4: 'test6' } ],
			keyC: 'test7'
		};

		expect(snakeObjectToCamelObject(sample)).toEqual(formattedSample);
	});

	it ('converts an object from camelcase to snakecase', () => {
		const sample = {
			keyA: { keyA1: 'test1', keyA2: 'test2' },
			keyB: [ { keyB1: 'test3', keyB2: 'test4' }, { keyB3: 'test5', keyB42: 'test6' } ],
			keyC: 'test7'
		};

		const formattedSample = {
			key_a: { key_a_1: 'test1', key_a_2: 'test2' },
			key_b: [ { key_b_1: 'test3', key_b_2: 'test4' }, { key_b_3: 'test5', key_b_42: 'test6' } ],
			key_c: 'test7'
		};

		expect(camelObjectToSnakeObject(sample)).toEqual(formattedSample);
	});

	it ('converts a 1-item array into a single item', () => {
		const input = [ 'whitening' ];
		const output = 'whitening';
		expect(toListFromArray(input)).toEqual(output);
	});

	it ('converts a 2-item array into a list', () => {
		const input = [ 'whitening', 'orthodontics' ];
		const output = 'whitening and orthodontics';
		expect(toListFromArray(input)).toEqual(output);
	});

	it ('converts a 3+ item array into a list', () => {
		const input = [ 'whitening', 'orthodontics', 'veneers' ];
		const output = 'whitening, orthodontics, and veneers';
		expect(toListFromArray(input)).toEqual(output);
	});

	it ('parses a written time with a colon', () => {
		const input = '11:30AM';
		const output = { hours: 11, minutes: 30 };
		expect(splitTimeString(input)).toEqual(output);
	});

	it ('parses a written time with a period', () => {
		const input = '10.30';
		const output = { hours: 10, minutes: 30 };
		expect(splitTimeString(input)).toEqual(output);
	});

	it ('parses a written time without minutes', () => {
		const input = '3pm';
		const output = { hours: 15, minutes: 0 };
		expect(splitTimeString(input)).toEqual(output);
	});

	it ('parses a written time with PM hours', () => {
		const input = '15:30pm';
		const output = { hours: 15, minutes: 30 };
		expect(splitTimeString(input)).toEqual(output);
	});

});
