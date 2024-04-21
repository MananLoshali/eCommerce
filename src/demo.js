let b1 = [];
let b2 = [];

let buck1 = false;
let buck2 = false;

let bucket1 = false;
let bucket2 = false;

let max;

const func = (bucket, number) => {
  if (bucket === 1) {
    buck1 = true;
  } else if (bucket === 2) {
    buck2 = true;
  }

  pushNumber(number);
};

const pushNumber = (number) => {
  if (buck1) {
    b1.push(number);
  } else {
    b2.push(number);
  }

  checkMax();
};

const checkMax = () => {
  for (let index = 0; index < b1.length; index++) {
    if (max < b1[index]) {
      max = b1[index];
      bucket1 = true;
      bucket2 = false;
    }
  }

  for (let index = 0; index < b2.length; index++) {
    if (max < b2[index]) {
      max = b1[index];
      bucket1 = false;
      bucket2 = true;
    }
  }
};
