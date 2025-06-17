
console.log("Square Pattern:");
let size = 5;

for (let i = 0; i < size; i++) {
  let row = "";
  for (let j = 0; j < size; j++) {
    row += "* ";
  }
  console.log(row);
}


console.log("\nRight-Angled Triangle Pattern:");
for (let i = 1; i <= size; i++) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "* ";
  }
  console.log(row);
}


console.log("\nInverted Triangle Pattern:");
for (let i = size; i >= 1; i--) {
  let row = "";
  for (let j = 1; j <= i; j++) {
    row += "* ";
  }
  console.log(row);
}


console.log("\nPyramid Pattern:");
for (let i = 1; i <= size; i++) {
  let row = "";
  for (let j = 1; j <= size - i; j++) {
    row += "  ";
  }
  for (let k = 1; k <= (2 * i - 1); k++) {
    row += "*";
  }
  console.log(row);
}
