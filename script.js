let sounds=[]
let currentAudio=null

function addSound(name,file){

sounds.push({

name:name,

file:file

})

render()

}

function render(){

let board=document.getElementById("soundboard")

board.innerHTML=""

sounds.forEach(sound=>{

let btn=document.createElement("button")

btn.className="sound"

btn.innerText=sound.name

btn.onclick=()=>{

if(currentAudio && currentAudio.src===sound.file){

currentAudio.pause()

currentAudio=null

return

}

if(currentAudio) currentAudio.pause()

currentAudio=new Audio(sound.file)

currentAudio.play()

}

board.appendChild(btn)

})

}

document.getElementById("search").oninput=e=>{

let q=e.target.value.toLowerCase()

let buttons=document.querySelectorAll(".sound")

buttons.forEach(btn=>{

if(btn.innerText.toLowerCase().includes(q))

btn.style.display="block"

else

btn.style.display="none"

})

}

function handleFiles(files){

for(let file of files){

let name=file.name.replace(".mp3","").replace(".wav","")

let url=URL.createObjectURL(file)

addSound(name,url)

}

}

document.getElementById("fileInput").onchange=e=>{

handleFiles(e.target.files)

}

let dropzone=document.getElementById("dropzone")

dropzone.addEventListener("dragover",e=>{

e.preventDefault()

})

dropzone.addEventListener("drop",e=>{

e.preventDefault()

handleFiles(e.dataTransfer.files)

})