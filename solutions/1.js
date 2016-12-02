// Solutions for Day One challenge
// http://adventofcode.com/2016/day/1

const instructions = "R1, L4, L5, L5, R2, R2, L1, L1, R2, L3, R4, R3, R2, L4, L2, R5, L1, R5, L5, L2, L3, L1, R1, R4, R5, L3, R2, L4, L5, R1, R2, L3, R3, L3, L1, L2, R5, R4, R5, L5, R1, L190, L3, L3, R3, R4, R47, L3, R5, R79, R5, R3, R1, L4, L3, L2, R194, L2, R1, L2, L2, R4, L5, L5, R1, R1, L1, L3, L2, R5, L3, L3, R4, R1, R5, L4, R3, R1, L1, L2, R4, R1, L2, R4, R4, L5, R3, L5, L3, R1, R1, L3, L1, L1, L3, L4, L1, L2, R1, L5, L3, R2, L5, L3, R5, R3, L4, L2, R2, R4, R4, L4, R5, L1, L3, R3, R4, R4, L5, R4, R2, L3, R4, R2, R1, R2, L4, L2, R2, L5, L5, L3, R5, L5, L1, R4, L1, R1, L1, R4, L5, L3, R4, R1, L3, R4, R1, L3, L1, R1, R2, L4, L2, R1, L5, L4, L5".split(', ');

const turn = (orientation, turnDirection) => {
  const directions = ['N','E','S','W'];
  const orientationInt = directions.indexOf(orientation);
  const td = turnDirection === 'R' ? 1 : -1;
  newDirectionInt = orientationInt + td;
  if (newDirectionInt === -1) {
    return 'W';
  } else if (newDirectionInt === 4) {
    return 'N';
  } else {
    return directions[newDirectionInt];
  }
}

// console.log(turn('N', 'R')); // East
// console.log(turn('N', 'L')); // West
// console.log(turn('E', 'R')); // South
// console.log(turn('E', 'L')); // North
// console.log(turn('S', 'R')); // West
// console.log(turn('S', 'L')); // East
// console.log(turn('W', 'R')); // North
// console.log(turn('W', 'L')); // South

const splitInstructions = instructions.map((el) => [el[0], el.slice(1)]);
// console.log(splitInstructions);

const absoluteInstructions = splitInstructions.reduce((acc, el) => {
  const newDirection = turn(acc.orientation, el[0]);
  return {
    orientation: newDirection,
    instructions: acc.instructions.concat([[newDirection,el[1]]])
  }
}, {orientation:'N', instructions:[]});

// const directionTotals = absoluteInstructions.instructions.reduce((acc,instruction) => {
//   acc[instruction[0]] += parseInt(instruction[1]);
//   return acc
// }, {'N':0,'E':0,'S':0,'W':0});

// console.log(directionTotals);

const distance = absoluteInstructions.instructions.reduce((acc, instruction) => {
  const magnitude = parseInt(instruction[1]);
  switch(instruction[0]){
    case 'N':
      acc.y += magnitude;
      break;
    case 'E':
      acc.x += magnitude;
      break;
    case 'S':
      acc.y -= magnitude;
      break;
    case 'W':
      acc.x -= magnitude;
      break;
    default:
      throw "ERROR"
      break;
  }
  acc.listOfStops.push([acc.x, acc.y]);
  return acc;
}, {y:0, x:0, listOfStops:[]});

// for (let i = 0; i < distance.listOfStops.length; i++) {
//   if (distance.listOfStops.indexOf(distance.listOfStops[i]) < i) {
//     console.log(distance.listOfStops[i]);
//   }
// }

distance.listOfStops.reduce((seen, position) => {
  // side effects :(((((
  debugger;
  if (seen.indexOf(position)>0){
    console.log(position);
  }
  return [...seen,position];
},[]);
