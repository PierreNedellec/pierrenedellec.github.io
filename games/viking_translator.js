const translateEnglishBtn = document.getElementById("translateEnglishBtn")
const translateVikingBtn = document.getElementById('translateVikingBtn')
const resetBtn = document.getElementById('resetBtn')
const englishText = document.getElementById("englishText")
const vikingText = document.getElementById("vikingText")

translateEnglishBtn.addEventListener('click',translateEnglishToViking)
translateVikingBtn.addEventListener('click',translateVikingToEnglish)
resetBtn.addEventListener('click', ()=>{
    englishText.value = '';
    vikingText.value = '';
})


function reverseDict(dict){
    reversed = {}
    for (const key in dict){
        const val = dict[key]
        reversed[val] = key
    }
    return reversed
}

const englishToViking = {
  a: "ᚦ",
  b: "ᛉ",
  c: "ᛊ",
  d: "ᚾ",
  e: "ᛗ",
  f: "ᛒ",
  g: "ᚱ",
  h: "ᛈ",
  i: "ᛡ",
  j: "ᚨ",
  k: "ᛞ",
  l: "ᛏ",
  m: "ᚢ",
  n: "ᛋ",
  o: "ᚹ",
  p: "ᚺ",
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

const vikingToEnglish = reverseDict(englishToViking)

function translateEnglishToViking(){
    console.log('e to v called ')
    const letters = englishText.value.toLowerCase().split("")
    let newText = ''
    for (let i=0; i<letters.length; i++){
        newText += englishToViking[letters[i]]
    }
    vikingText.value = newText
}

function translateVikingToEnglish(){
    const letters = vikingText.value.toLowerCase().split("")
    let newText = ''
    for (let i=0; i<letters.length; i++){
        newText += vikingToEnglish[letters[i]]
    }
    englishText.value = newText
}



