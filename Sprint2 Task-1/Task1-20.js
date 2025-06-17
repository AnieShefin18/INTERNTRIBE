const x = [23, 4, -6, 23, -9, 21, 3, -45, -8];

let positive = [];
let negative = [];

for (let i = 0; i < x.length; i++) {
  if (x[i] >= 0) {
    positive.push(x[i]);
  } else {
    negative.push(x[i]);
  }
}

console.log("Positive numbers:", positive);
console.log("Negative numbers:", negative);
