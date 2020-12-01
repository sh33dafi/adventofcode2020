import {fileToArrayOfNumbers} from '../lib/read-file';
import {getSolution1, getSolution2} from './solution';

console.time('read input');
const input = fileToArrayOfNumbers('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1',getSolution1(input));

console.time('solution 2');
console.timeLog('solution 2',getSolution2(input));
