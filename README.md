# streng
Some helpful utility functions for handling strings &amp; object keys

## Methods

_Note: All methods force stringiness on the value passed as `str`._

- `toSentenceCase(str, index)`: Capitalize the first letter of the first word.
- `toUpperCase(str)`: Convert to all capitals
- `toLowerCase(str)`: Convert to all lowercase
- `toTitleCase(str)`: Capitalize the first letter of each word
- `toSnakeCase(str)`: Replaces spaces with "_" 
- `snakeToCamel(str)`: Converts from snakecase to camelcase
- `camelToSnake(str)`: Converts from camelcase to snakecase
- `snakeObjectToCamelObject(obj)`: Converts object keys from snakecase to camelcase
- `camelObjectToSnakeObject(obj)`: Converts object keys from camelcase to snakecase
- `shortenWithCenterEllipsis(str, length)`: splits any string longer than the provided length with an ellipsis
- `toListFromArray(arr)`: returns a string version of an array
- `splitTimeString(str)`: provides the hours and minutes in a time string
