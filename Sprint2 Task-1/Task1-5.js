const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the length of the rectangle: ", function(lengthInput) {
  rl.question("Enter the width of the rectangle: ", function(widthInput) {
    rl.question("Enter the base of the triangle: ", function(baseInput) {
      rl.question("Enter the height of the triangle: ", function(heightInput) {
        
        
        let length = parseFloat(lengthInput);
        let width = parseFloat(widthInput);
        let base = parseFloat(baseInput);
        let height = parseFloat(heightInput);

        
        let rectangleArea = length * width;
        let triangleArea = (base * height) / 2;

        
        console.log("\nArea of Rectangle: " + rectangleArea + " square units");
        console.log("Area of Triangle: " + triangleArea + " square units");

        rl.close(); 
      });
    });
  });
});
