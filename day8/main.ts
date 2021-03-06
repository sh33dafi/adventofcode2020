import { fileToArrayNoEmptyLines} from '../lib/read-file';
import {fixProgram, getAccValueForProgram} from './solution';

console.time('read input');
const input = fileToArrayNoEmptyLines('./input.txt');
console.timeLog('read input');
console.time('solution 1');
console.timeLog('solution 1',getAccValueForProgram(input));

console.time('solution 2');
console.timeLog('solution 2',fixProgram(input));
