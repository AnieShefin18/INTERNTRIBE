const arr = [10, 20, 30, 40, 10]; 

if (arr.length >= 1 && arr[0] === arr[arr.length - 1]) {
  console.log("True – First and last elements are the same.");
} else {
  console.log("False – First and last elements are different.");
}
