const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function square(num) {
  return num * num;
}
rl.question("Enter a number to find its square: ", function(input) {
  const number = parseFloat(input);

  if (isNaN(number)) {
    console.log("Please enter a valid number.");
  } else {
    console.log("Square of " + number + " is " + square(number));
  }

  rl.close();
});
