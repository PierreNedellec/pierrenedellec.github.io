const translateBtn = document.getElementById("translateBtn")
const englishText = document.getElementById("englishText")
const vikingText = document.getElementById("vikingText")

translateBtn.addEventListener('click',translate)

function translate(){
    const letters = englishText.value.toLowerCase().split("")
    let newText = ''
    for (let i=0; i<letters.length; i++){
        newText += translator_alphabet[letters[i]]
    }
    vikingText.value = newText
}

//for now only translates form english to viking.
const translator_alphabet = {
  a: "ᚾ",
  b: "ᛉ",
  c: "ᛊ",
  d: "ᚦ",
  e: "ᛗ",
  f: "ᛒ",
  g: "ᚱ",
  h: "ᚺ",
  i: "ᛞ",
  j: "ᚨ",
  k: "ᛡ",
  l: "ᛏ",
  m: "ᚢ",
  n: "ᛋ",
  o: "ᚹ",
  p: "ᛈ",
  q: "ᛇ",
  r: "ᚷ",
  s: "ᛖ",
  t: "ᚠ",
  u: "ᛚ",
  v: "ᛜ",
  w: "ᛟ",
  x: "ᚺ",
  y: "ᛁ",
  z: "ᚾ",
  " ":" "
};


