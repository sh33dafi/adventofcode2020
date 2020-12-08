export const parseInstruction = (instruction: string): Instruction => {
    const [operator, arg] = instruction.split(' ');
    const argument = parseInt(arg, 10);
    return {operator: <'acc' | 'nop' | 'jmp'>operator, argument}
}

export const runProgram = (instructions: Array<Instruction>): { exitCode: number, arg: number } => {
    let acc = 0;
    let ip = 0;
    const executedIps = [];

    while(!executedIps[ip] && ip < instructions.length ) {
        const instruction = instructions[ip];
        executedIps[ip] = true;
        ip++;
        switch (instruction.operator) {
            case 'acc':
                acc = acc + instruction.argument;
                break;
            case 'jmp':
                ip = ip - 1 + instruction.argument;
                break;
        }
    }
    let exitCode = ip - instructions.length ;
    return {exitCode, arg: acc};
}

export const getAccValueForProgram  = (input: Array<string>): number => {
    return runProgram(input.map(parseInstruction)).arg;
}

export const fixProgram  = (input: Array<string>): number => {

    const instructions = input.map(parseInstruction);
    const jmpOrNopLocations = instructions.reduce((acc, instruction, index) => {
        if (instruction.operator === 'jmp' || instruction.operator === 'nop') {
                acc.push(index);
        }
        return acc;
    }, [])

    function createNewInstructions(i: number) {
        const newInstructions = [...instructions];
        const ip = jmpOrNopLocations[i];
        const instructionToReplace = {...newInstructions[ip]};
        if (instructionToReplace.operator === 'nop') {
            instructionToReplace.operator = 'jmp';
        } else {
            instructionToReplace.operator = 'nop';
        }
        newInstructions[ip] = instructionToReplace;
        return newInstructions;
    }

    for (let i = 0; i < jmpOrNopLocations.length; i++) {
        const newInstructions = createNewInstructions(i);
        const result = runProgram(newInstructions);
        if (result.exitCode === 0) {
            return result.arg;
        }
    }

    return 0;
};

export interface Instruction {
    operator: 'acc' | 'nop' | 'jmp';
    argument: number;
}
