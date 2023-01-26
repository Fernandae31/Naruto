const canvas = document.getElementById("juego")
console.log(canvas)

const ctx = canvas.getContext("2d")
console.log(ctx)

//Seleccion menu
const menu = document.querySelector(".botones")

//Seleccion GameOver
const gameOver = document.querySelector(".gameOver")


//Cargar imagenes

const heart = new Image()
heart.src = "./assets/heart.png"
console.log(heart)

const alien = new Image()
alien.src="./assets/itachi6.png"

const alien1 = new Image()
alien1.src="./assets/pain3.png"  

const alien2 = new Image()
alien2.src="./assets/sasori.png" 

const alien3 = new Image()
alien3.src="./assets/deidara.png"

const bullet = new Image()
bullet.src = "./assets/naruto7.png"

const naveD = new Image()
naveD.src = "./assets/naruto1.png"

const naveI = new Image()
naveI.src= "./assets/naruto5.png"


//Sonidos
//play()
const shoot = new Audio("./sounds/sonido-Rasengan.mp3")
const die = new Audio("./sounds/sonido-Perdiste.mp3")
const pelea = new Audio("./sounds/sonido-pelea.mp3")


//ARREGLO aliens
const tiposAliens = [alien, alien1, alien2, alien3]


//ARREGLO Balas
const balas = []

//Alien Arreglo
const aliens = []


    //Personaje - clase 
class Nave {
    constructor(x,y,w,h){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.velocidad = 15
        this.kills = 0
        this.lifes = 3
        this.img = naveD
    }

    //Metodos de Personaje
 

    //drawImage
    dibujarse(){
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h)
    }

    disparar(){
        console.log("Dispara")
        const bala = new Bala (this.x+this.w,this.y+(this.h/2))
        balas.push(bala)
        console.log(balas)
        //Sonido
        shoot.play()
    }

    /* Valor + en X*/

    adelante(){

        if(this.x < 515){

        this.x += this.velocidad

        }
        this.img = naveD
    }
    /* Valor - en X*/

    atras(){

       if (this.x > 0){

            this.x -= this.velocidad
        }
                 this.img = naveI
    }

    /* Valor - en Y */

    arriba(){

        if (this.y > 0) {
        
            this.y -= this.velocidad

        }
    }

    /* Valor + en Y */

    abajo(){
        
        if(this.y < 215){

        this.y += this.velocidad
    }

}

}
    //Disparar - clase

    class Bala {
    constructor(x, y){
        this.x = x; 
        this.y = y;
      

     }
        dibujarse(){
           ctx.drawImage(bullet,this.x, this.y, 50, 50) 
           this.x += 20 // va hacia adelante por el eje de X +
           if(this.x > 600){
            balas.shift()
           }

        }



      
    }

    
     //Alien clase

     class Alien{
    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.img = img;

    }
    dibujarse(){
        this.x -= 7
        ctx.drawImage(this.img, this.x, this.y, 60, 55) // tamano itachi
    }
}
ctx.fillStyle = "white"


    //Instancia de personaje
const nave = new Nave(10,145, 90, 85)// Instancia nave //clase Nave //tamano naruto
    console.log(nave)

    //Teclas

document.addEventListener("keydown", (evento) => {
    console.log(evento.key)
    switch(evento.key){
        case "ArrowRight":
            nave.adelante()
                break;
        case "ArrowLeft":
            nave.atras()
            break;
        case "ArrowUp":
            nave.arriba()
                break;
        case "ArrowDown":
            nave.abajo()
                break;
                case " ":
            nave.disparar()
            break;
    }
})

let tiempo = 0

//Empezar Juegp
function empezarJuego(){
    setInterval(()=>{
        ctx.clearRect(0,0,600,300)
        //Dibujar nave
        nave.dibujarse()

        //verificar si sigue vivo
        if(nave.lifes === 0){
        }


                // //Verificar si gano
                // if(nave.coins > 5)
                //  //setWin()
                //  alert() / // cuervo itachi

   
            //Dibujar balas
            balas.forEach((bala, indexBala) => {
                bala.dibujarse()


               
                aliens.forEach((alien, indexAlien) => {
                    console.log({balaX: bala.x, balaY: bala.y, alienX: alien.x, alienY: alien.y})

                    if (alien.x <= bala.x + 60 && bala.y >= alien.y && bala.y <= alien.y + 55) {
                        aliens.splice(indexAlien, 1)
                        balas.splice(indexBala, 1)
                        nave.kills++
                    }


                })

               

                
            })

                                    tiempo++
                                    ctx.font = "25px Arial"
                                    ctx.fillText(tiempo,10,30)

                // Pintar Muertos
                ctx.fillText(`${nave.kills} Muertos`, 290,30) 


                             //Pintar vidas
                
                             mostrarVidas()

 //Dibujar Aliens
    aliens.forEach((alien, indexAlien)=>{
    alien.dibujarse()
    //Si toca x:0 perdemos
    if(alien.x <= 0){
       setGameOver()
    }

    //Colision nave contra alien
 if(
        alien.x <= nave.x + 30
         && nave.y +30 >= alien.y 
         && nave.x <= alien.x 
         && nave.y <= alien.y +50
    ){
        nave.lifes--
        aliens.splice(indexAlien, 1)
    }
})
   
    },100)


    }


//Seleccionamos el boton y empieza el juego
let btn = document.getElementById("jugar")
    btn.addEventListener("click",() => { 
        empezarJuego()
        crearAliens()
        btn.classList.add("none")
       
        //Alien

       


    })


    //Creacion de aliens
    function crearAliens(){

    setInterval(()=>{
        const posicionY = Math.floor((Math.random() *210)+40)
        const posicionAleatoria = Math.floor(Math.random ()* tiposAliens.length)
        const alienAleatorio = tiposAliens[posicionAleatoria]

        const a = new Alien(600, posicionY, alienAleatorio)
        aliens.push(a)
    }, 3005)
}

//Mostrar vidas

function mostrarVidas(){
if (nave.lifes === 3) {
    ctx.drawImage(heart, 460, 10, 30, 30)
    ctx.drawImage(heart, 500, 10, 30, 30)
    ctx.drawImage(heart, 540, 10, 30, 30)
}

    if (nave.lifes === 2) {
    ctx.drawImage(heart, 460, 10, 30, 30)
    ctx.drawImage(heart, 500, 10, 30, 30)
}

    if (nave.lifes === 1) {
    ctx.drawImage(heart, 460, 10, 30, 30)
}

    
}
//Game Over
function setGameOver(){
    //Agregar clase none
    canvas.classList.add("none")
    menu.classList.add("none")
    gameOver.classList.remove("none")
    die.play()
}
