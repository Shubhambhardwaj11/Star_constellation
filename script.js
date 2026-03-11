
let galaxyStars = []
let stars = []
let button = document.getElementById("startBtn")
let container = document.getElementById("container")
let canvas = document.getElementById("sky")
let ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

createGalaxy()


button.addEventListener("click",function(){
    let name = document.getElementById("userName").value
    if (name === ""){
        alert("Please enter your name ")
    }
    else{
    container.style.display = "none"
    ctx.fillStyle = "white"

    let fontSize = Math.min(120, canvas.width / (name.length * 1.5))
    ctx.font = fontSize + "px Arial"
    ctx.textAlign = "center"
    let textWidth = ctx.measureText(name).width
    let textX = Math.random() * (canvas.width - textWidth - 200) + 100
    let textY = Math.random() * (canvas.height - 200) + 100
    ctx.fillText(name, textX,textY)
    let imageData = ctx.getImageData(0,0,canvas.width,canvas.height)

    ctx.clearRect(0,0,canvas.width,canvas.height)
stars = []

for (let y = 0; y < canvas.height; y += 8) {
    for (let x = 0; x < canvas.width; x += 8) {

        let index = (y * canvas.width + x) * 4

        if (imageData.data[index + 3] > 128) {
            stars.push({
                x: Math.random()* canvas.width,
                y: Math.random() * canvas.height,
                targetX : x,
                targetY: y
            
            })
        }

    }
} 
    drawStars()
    animate()
}
})

function drawStar(x, y, spikes, outerRadius, innerRadius) {

    let rot = Math.PI / 2 * 3
    let step = Math.PI / spikes

    ctx.beginPath()
    ctx.moveTo(x, y - outerRadius)

    for (let i = 0; i < spikes; i++) {

        ctx.lineTo(
            x + Math.cos(rot) * outerRadius,
            y + Math.sin(rot) * outerRadius
        )
        rot += step

        ctx.lineTo(
            x + Math.cos(rot) * innerRadius,
            y + Math.sin(rot) * innerRadius
        )
        rot += step
    }

    ctx.lineTo(x, y - outerRadius)
    ctx.closePath()
    ctx.fill()
}


function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height)

    ctx.fillStyle = "white"
    ctx.shadowBlur = 10
    ctx.shadowColor = "white"


for(let star of stars){

    drawStar(star.x, star.y, 5, 4, 2)

}
}

let shootingStar = {
    x : -100,
    y : Math.random() * canvas.height / 2,
    speed : 8
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawGalaxy()

    for(let star of stars){

        star.x += (star.targetX - star.x) * 0.05
        star.y += (star.targetY - star.y) * 0.05

        let size = Math.random() * 2 + 1
        drawStar(star.x, star.y, 5, size, size/2)
    }
    // shooting star 
        ctx.beginPath()
        ctx.moveTo(shootingStar.x, shootingStar.y)
        ctx.lineTo(shootingStar.x + 60, shootingStar.y + 10)
        ctx.strokeStyle = "white"
        ctx.lineWidth = 2
        ctx.stroke()

        shootingStar.x += shootingStar.speed
        shootingStar.y += 0.5

        if(shootingStar.x > canvas.width){
        shootingStar.x = -100
        shootingStar.y = Math.random() * canvas.height / 2
        }

    
    requestAnimationFrame(animate)
}

function drawGalaxy(){

    ctx.fillStyle = "white"

    for(let star of galaxyStars){

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

    }

}
function createGalaxy(){

    for(let i = 0; i < 500; i++){

        galaxyStars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5
        })

    }

}
