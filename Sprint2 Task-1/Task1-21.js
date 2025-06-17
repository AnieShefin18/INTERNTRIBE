const char = 'a';
const vowels = ['a', 'e', 'i', 'o', 'u'];

if (char.length === 1 && /[a-zA-Z]/.test(char)) {
  if (vowels.includes(char.toLowerCase())) {
    console.log(`${char} is a Vowel`);
  } else {
    console.log(`${char} is a Consonant`);
  }
} else {
  console.log("Please enter a single alphabet character.");
}
