const allInputs = document.getElementsByClassName("cipher-input")
const cipherSelecter = document.getElementById("cipherSelect")

updateInputs()
cipherSelecter.addEventListener('change', updateInputs)

function updateInputs(){
    const selectedCipher = cipherSelecter.value
    console.log("change detected")

    for (let input of allInputs) {
    input.style.display = "none"

    if (input.classList.contains("cipher-"+selectedCipher)){
        input.style.display = "block"
    }
}}

