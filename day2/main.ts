import {fileToArray} from '../lib/read-file';
import {countValidPasswords, validatePassWordOccurrence, validatePassWordPosition} from './solution';

console.time('read input');
const input = fileToArray('./input.txt');
console.log(input);
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1', countValidPasswords(input, validatePassWordOccurrence));

console.time('solution 2');
console.timeLog('solution 2', countValidPasswords(input, validatePassWordPosition));
