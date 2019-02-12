var Streng = require('./dist/streng');

module.exports = {
	toSentenceCase           : Streng.toSentenceCase,
	toUpperCase              : Streng.toUpperCase,
	toLowerCase              : Streng.toLowerCase,
	toTitleCase              : Streng.toTitleCase,
	toSnakeCase              : Streng.toSnakeCase,
	snakeToCamel             : Streng.snakeToCamel,
	camelToSnake             : Streng.camelToSnake,
	snakeObjectToCamelObject : Streng.snakeObjectToCamelObject,
	camelObjectToSnakeObject : Streng.camelObjectToSnakeObject,
	shortenWithCenterEllipsis: Streng.shortenWithCenterEllipsis,
	toListFromArray          : Streng.toListFromArray,
	splitTimeString          : Streng.splitTimeString,
}
