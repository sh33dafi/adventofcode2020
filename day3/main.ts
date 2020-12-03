import {fileToArray} from '../lib/read-file';
import {countTreesForSlopes, countTreesOnPath} from './solution';

console.time('read input');
const input = fileToArray('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1', countTreesOnPath(input, {right: 3, down: 1}));

console.time('solution 2');
console.timeLog('solution 2', countTreesForSlopes(input));
