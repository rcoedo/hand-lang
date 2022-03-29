const empty = () => ({
  data: [0],
  pointer: 0,
});

const right = ({ data, pointer }) => {
  const newData = [...data];
  const newPointer = pointer + 1;

  if (newData[newPointer] === undefined) {
    newData[newPointer] = 0;
  }

  return { data: newData, pointer: newPointer };
};

const left = ({ data, pointer }) => {
  const newData = [...data];
  const newPointer = pointer - 1;

  if (newData[newPointer] === undefined) {
    newData[newPointer] = 0;
  }

  return { data: newData, pointer: newPointer };
};

const inc = ({ data, pointer }) => {
  const newData = [...data];

  newData[pointer]++;

  if (newData[pointer] === 256) {
    newData[pointer] = 0;
  }

  return {
    data: newData,
    pointer,
  };
};

const dec = ({ data, pointer }) => {
  const newData = [...data];

  newData[pointer]--;

  if (newData[pointer] === -1) {
    newData[pointer] = 255;
  }

  return {
    data: newData,
    pointer,
  };
};

const print = (state) => {
  process.stdout.write(String.fromCharCode(state.data[state.pointer]));
  return state;
};

const loop = (fn) => {
  return (state) => {
    let newState = { ...state };
    while (newState.data[newState.pointer] !== 0) {
      newState = fn(newState);
    }
    return newState;
  };
};

module.exports = {
  empty,
  inc,
  dec,
  right,
  left,
  print,
  loop,
};
