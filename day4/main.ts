import {fileToArray} from '../lib/read-file';
import {countValidPassports, strictValidatePassport, validatePassport} from '../day2/solution';

console.time('read input');
const input = fileToArray('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1',countValidPassports(input, validatePassport));

console.time('solution 2');
console.timeLog('solution 2',countValidPassports(input, strictValidatePassport));
