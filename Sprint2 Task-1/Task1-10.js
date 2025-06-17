const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
rl.question("Enter a number to calculate factorial: ", function(input) {
  const number = parseInt(input);

  if (isNaN(number) || number < 0) {
    console.log("Please enter a valid non-negative number.");
  } else {
    console.log("Factorial of " + number + " is " + factorial(number));
  }

  rl.close();
});
