

//Seleccion de Canvas
const canvas = document.getElementById("juego")
console.log(canvas)

const ctx = canvas.getContext("2d")
console.log(ctx)

//Pausa

let pausaBtn = document.getElementById("pausaToggle")
pausaBtn.addEventListener("click", () =>{
    if(pausaBtn.innerText === "Pausa" ){
        pausaBtn.innerText = "Play"
        cancelAnimationFrame(requestReference)
    }else{
        pausaBtn.innerText = "Pausa"
    }
})
let requestReference


//Seleccion menu
const menu = document.querySelector(".botones")

//Seleccion GameOver
const gameOver = document.querySelector(".gameOver")

//Seleccion Win
const winGame= document.querySelector(".winGame")


//Cargar imagenes

const heart = new Image()
heart.src = "./assets/heart.png"
console.log(heart)

//Prueba avatar Moneda
const itachi= new Image()
itachi.src = "./assets/moneda.png"
console.log(itachi)

//Prueba de avatar
const naruto = new Image()
naruto.src = "./assets/narutopre.png"
console.log(naruto)

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

// Insignia de Cuervo

const coin0 = new Image()
coin0.src= "./assets/coin0.png"

const coin1 = new Image()
coin1.src= "./assets/coin1.png"

const coin2 = new Image()
coin2.src= "./assets/coin2.png"

const coin3 = new Image()
coin3.src= "./assets/coin3.png"

const coin4 = new Image()
coin4.src= "./assets/coin4.png"

const coin5 = new Image()
coin5.src= "./assets/coin5.png"

const coin6 = new Image()
coin6.src= "./assets/coin6.png"

const coin7 = new Image()
coin7.src= "./assets/coin7.png"

const coin8 = new Image()
coin8.src= "./assets/coin8.png"

const coin9 = new Image()
coin9.src= "./assets/coin9.png"

const coins= [coin0,coin1,coin2,coin3,coin4,coin5,coin6, coin7,coin8, coin9]



//Sonidos
//play()
const shoot = new Audio("./sounds/sonido-Rasengan.mp3")
const die = new Audio("./sounds/sonido-Perdiste.mp3")
const pelea = new Audio("./sounds/sonido-pelea.mp3")
const ganaste = new Audio("./sounds/sonido-ganaste.mp3")
const musica = new Audio("./sounds/sonido-menu.mp3")

function stopMusic(){
    musica.pause();
}


//ARREGLO aliens
const tiposAliens = [alien, alien1, alien2, alien3]


//ARREGLO Balas
const balas = []

//ARREGLO Aliens
const aliens = []

//ARREGLO moneda
const monedas= []

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
        this.coins = 0
    
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

    /* Valor + y - en X*/

    adelante(){
        if(this.x < 515){
        this.x += this.velocidad}
        this.img = naveD}
    atras(){
    if (this.x > 0){
    this.x -= this.velocidad }
    this.img = naveI
    }

    /* Valor + y - en Y */

    arriba(){
    if (this.y > 20) {
    this.y -= this.velocidad}
    }


    abajo(){
    if(this.y < 215){
    this.y += this.velocidad}    
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
            balas.shift()}
        }
    }

    
     //Alien - clase
     class Alien{
    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.img = img;}
    dibujarse(){
        this.x -= 7
        ctx.drawImage(this.img, this.x, this.y, 60, 55) // tamano itachi
    }
}
    //Moneda - clase




class Coin{
    constructor(x){
        this.x = x
        this.y = 0
        this.img= 0
    }

        dibujarse(){
            this.y++ //aumenta uno para bajar
            
            ctx.drawImage(coins[this.img], this.x, this.y, 55, 50)
            if (this.img < coins.length -1){
                this.img++
        
            } else {
                this.img = 0
            }
        }

    }      
    
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
                    if(balas.length < 5){
            nave.disparar()
                    }
            break;
    }
})

let tiempo = 0

//Empezar Juego
function empezarJuego(){
      /*let intervalo = */ setInterval(()=>{
        ctx.clearRect(0,0,600,300)
        if(nave.lifes === 0){
            musica.pause();
        } else {
            musica.play();
        }
    
        //Dibujar nave
        nave.dibujarse()

        //verificar si sigue vivo
        if(nave.lifes === 0){
            setGameOver()
           
         
        }


        //Ganar 
       
        if(nave.coins === 3){
            stopMusic();
            setwinGame();
        }






            //Dibujar balas
            balas.forEach((bala, indexBala) => {
                bala.dibujarse()


               
                aliens.forEach((alien, indexAlien) => {
                    console.log({balaX: bala.x, balaY: bala.y, alienX: alien.x, alienY: alien.y})

                    if (
                        alien.x <= bala.x + 60 &&
                         bala.y >= alien.y && 
                         bala.y <= alien.y + 55 &&
                         bala.x <= alien.x 
                         ) {

                        aliens.splice(indexAlien, 1)
                        balas.splice(indexBala, 1)
                        nave.kills++
                    }


                }) //INTERVALO DE JUEGO






                
            })

            //Mostrar Monedas
            monedas.forEach((moneda, indexMoneda)=>{
                moneda.dibujarse()
                if(moneda.y >= 300){
                    monedas.splice(indexMoneda, 1)
                }

            // Colision vs Nave 
                if(moneda.x <= nave.x + 85
                    && nave.y +85 >= moneda.y 
                    && nave.x <= moneda.x 
                    && nave.y <= moneda.y +50){
                    nave.coins++
                    monedas.splice(indexMoneda, 1)
                }


            })
            

tiempo++
ctx.font = "bold 25px Arial, sans-serif"
ctx.fillStyle = "black"



ctx.fillText(tiempo,10,30)

// Pintar Muertos
    ctx.fillText(`${nave.kills} Muertos`, 285,25) 

//Pintar avatar
mostarAvatar()
        
//Pintar vidas
                
mostrarVidas()



//Pintar Avatar de Monedas
mostrarMonedas()

//Pintar monedas
ctx.fillText(`${nave.coins} Insignias`, 110,25)


 //Dibujar Aliens
    aliens.forEach((alien, indexAlien)=>{
    alien.dibujarse()
    //Si toca x:0 perdemos
    if(alien.x <= 0){
       setGameOver()
    }

    //Colision nave contra alien
 if(alien.x <= nave.x + 85
    && nave.y +85 >= alien.y 
    && nave.x <= alien.x 
    && nave.y <= alien.y +55) 
    {
     nave.lifes--
    aliens.splice(indexAlien, 1)
    }
})
   
    },70) //tiempo en que aparecen los enemigos


    }

   
//Seleccionamos el boton y empieza el juego
let btn = document.getElementById("jugar")
    btn.addEventListener("click",() => { 
        empezarJuego()
        crearAliens()
        crearMoneda()
        btn.classList.add("none")
       

    })

    //Creacion de aliens
    function crearAliens(){

    setInterval(()=>{
        const posicionY = Math.floor((Math.random() *220)+30)
        const posicionAleatoria = Math.floor(Math.random ()* tiposAliens.length)
        const alienAleatorio = tiposAliens[posicionAleatoria]

        const a = new Alien(600, posicionY, alienAleatorio)
        aliens.push(a)
    }, 3005)
}


////mostrar moneda
function mostrarMonedas(){
    ctx.drawImage(itachi, 55, -10 ,50,50)
    }


//Creacion de cuervos
function crearMoneda(){
    setInterval(()=>{
        const posicionAleatoria = Math.floor(Math.random()* 570)
        const moneda = new Coin(posicionAleatoria)
        monedas.push(moneda)
    }, 5000)
}

//Mostrar vidas y Avatar

function mostarAvatar(){
ctx.drawImage(naruto,410,-12,50,56)
    }




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

//Seccion de Game Over  
}
//Game Over
function setGameOver(){

    //Agregar clase none
    canvas.classList.add("none")
    menu.classList.add("none")
    gameOver.classList.remove("none")
    die.play()
    clearInterval(intervalo)
   
   




   
}
//Win
function setwinGame(){
   
    canvas.classList.add("none")
    menu.classList.add("none")
    winGame.classList.remove("none")
    ganaste.play()
    clearInterval(intervalo)
}

//////////////////////////
