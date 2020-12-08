export const parseInstruction = (instruction: string): Instruction => {
    const [operator, arg] = instruction.split(' ');
    const argument = parseInt(arg, 10);
    return {operator: <'acc' | 'nop' | 'jmp'>operator, argument}
}

export const runProgram = (input: Array<string>): number => {
    let acc = 0;
    let ip = 0;
    const executedIps = [];

    const instructions = input.map(parseInstruction);

    while(!executedIps.includes(ip)) {
        const instruction = instructions[ip];
        executedIps.push(ip);
        switch (instruction.operator) {
            case 'acc':
                acc = acc + instruction.argument;
            case 'nop':
                ip++;
                break;
            case 'jmp':
                ip = ip + instruction.argument;
                break;
        }
    }
    return acc;
}

export interface Instruction {
    operator: 'acc' | 'nop' | 'jmp';
    argument: number;
}
