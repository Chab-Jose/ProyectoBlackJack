//------------Variables-------------------
let baraja = [];
let carta = '';
let puntosJugador = 0;
let puntosComputadora = 0;
const numeros = [2,3,4,5,6,7,8,9,10];
const letras = ['J','Q','k','A'];
const palo = ['C', 'D', 'H', 'S'];

 

//-------------Funciones------------------
function CrearBaraja() {
    baraja = [];
    for(n of numeros){
        for(p of palo){
            baraja.push(n + p);
        }
    }
    
    letras.forEach((l) =>{
        palo.forEach((p) =>{
            baraja.push(l + p)
        });
    });
    baraja = _.shuffle(baraja);
    return baraja;
}

function NuevoJuego() {
    //carta jugador
    $('#cartaJugador').html('');
    puntosJugador = 0;
    $('#puntosJugador').text(puntosJugador);
    
    //botones
    $('#btn-carta').removeClass('disabled');
    $('#btn-detener').removeClass('disabled');
    
    //carta computadora
    $('#cartaComputadora').html('');
    puntosComputadora = 0;
    $('#puntosComputadora').text(puntosJugador);

    //mensaje ganador
    $('#mensajeGanador').attr('hidden', 'true');
    $('#mensajeGanador').removeClass('bg-danger');
    $('#mensajeGanador').removeClass('bg.info');
    
    CrearBaraja()
}


function PedirCarta() {
    carta = baraja.shift();
    const cartaHtml = $('#cartaJugador').html() + `<img src="/cartas/${carta}.png" alt="">`;
    $('#cartaJugador').html(cartaHtml);
    return carta;   
}

function SumarPuntos(carta) {
    let puntos = 0;

    let valorCarta = carta.slice(0, -1)
    if(letras.includes(valorCarta)){
        puntos = valorCarta == 'A' ? 11 :10
    }else{
        puntos = valorCarta * 1;
    }
    return puntos;
}

function TurnoComputadora() {
    $('#btn-carta').addClass('disabled');
    $('#btn-detener').addClass('disabled');

    const ciclo = setInterval(() => {
        CartaComputadora()
        if(puntosJugador > 21){
            clearInterval(ciclo);
            FinTurnoComputadora();
        }
        if (puntosComputadora > 21 || puntosComputadora >= puntosJugador){
            clearInterval(ciclo);
            FinTurnoComputadora();
        }
    }, 500)

}


function CartaComputadora() {
    let carta = baraja.shift();
    const cartaHtml = $('#cartaComputadora').html() + `<img src="/cartas/${carta}.png" alt="">`;

    puntosComputadora += SumarPuntos(carta);

    $('#cartaComputadora').html(cartaHtml);
    $('#puntosComputadora').text(puntosComputadora);

    return puntosComputadora;   
}

function FinTurnoComputadora() {
    setTimeout(() =>{
        MensajeGanador(
            (puntosComputadora <= 21 && puntosComputadora >= puntosJugador) || puntosJugador > 21
            ?(ganador = {
                nombre :'La computadora gana',
                color : 'bg-danger'
            })
            :(ganador = {
                nombre :'El jugador gana',
                color : 'bg-info'
            })   
        )
    },500)  
}



function MensajeGanador({nombre, color}) {
    $('#mensajeGanador').removeAttr('hidden');
    $('#mensajeGanador').html(`<h2>${nombre}</h2>`);
    $('#mensajeGanador').addClass(color);
    
}




//---------Botones----------------
$('#btn-nuevo').click(function(){
    NuevoJuego();
})

$('#btn-carta').click(function(){
   let carta = PedirCarta();
   puntosJugador += SumarPuntos(carta);
   $('#puntosJugador').text(puntosJugador);

   if (puntosJugador > 21){
      TurnoComputadora();
   }
})

$('#btn-detener').click(function(){
   TurnoComputadora();
    
})


//----------------Inicio del la aplicacion
CrearBaraja()
