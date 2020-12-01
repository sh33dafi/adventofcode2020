import {fileToArrayOfNumbers} from '../lib/read-file';
import {getSolution1, getSolution2} from './solution';

const input = fileToArrayOfNumbers('./input.txt');
console.time('s1');
console.timeLog('s1',getSolution1(input));

console.time('s2');
console.timeLog('s2',getSolution2(input));
