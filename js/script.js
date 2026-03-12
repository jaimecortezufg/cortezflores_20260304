//POSICIONES DE LAS IMAGENES
let maxLeft;
let maxTop;
const minLeft = 0;
const minTop = 0;
let timeDelta;
//RUTA DE LAS IMAGENES
let imgs = [
    "media/img/arboles/arbol1.png",
    "media/img/arboles/arbol2.png",
    "media/img/arboles/arbol3.png",
    "media/img/arboles/arbol4.png",
];
//COORDENADAS DE LA POSICION DE LAS IMAGENES
var originalX;
var originalY;

window.onload = function() {
    document.onmousedown = startDrag;
    document.onmouseup = stopDrag;
}

function sensorClick(){
    if(Date.now() - timeDelta < 150){ //verifica que no hemos arrastrado ningún objeto
        createPopup();
    }
}

//La función  "createpopup()" se ejecuta cuando el usuario ejecuta un evento (ejemplo "click")
function createPopup(parent){
    let p = document.getElementById("popup");
    if(p){
        p.parentNode.removeChild(p);
    }

    //SE CREA UN ELEMENTO EN EJECUCIÓN DE JAVASCRIPT
    let popup = document.createElement("div"); //elemento a crear "<div></div>"
    popup.id = "popup"; // id="popup"
    popup.className = "popup"; //class="popup"
    popup.style.top = parent.y - 110 + "px"; // top = Y - 110px
    popup.style.left = parent.x - 75 + "px"; // left= X - 75px

    //SE CREA UN ELEMENTO EN EJECUCIÓN DE JAVASCRIPT
    let text = document.createElement("span"); // elemento a crear "<span></span>"
    text.textContent = parent.id; //contenido del span=id del popup o id del div que contiene al <span>
    popup.appendChild(text); // se ancla el span al div que fue creado en las lineas anteriores

    //SE CREA UN ELEMENTO EN EJECUCIÓN DE JAVASCRIPT
    var map = document.getElementsByClassName("map"); //Se obtienen las propiedades del div que posee el class="map"
    map.appendChild(popup); // se ancla el objeto con class="map" al <div> popup
}

//LA FUNCIÓN "baseOnLoad" se ejecuta al cargar el HTML
function baseOnLoad(){
    var map = document.getElementsByClassName("map")[0]; //se obtiene el elemento "map" del html
    let base = document.getElementsByClassName("base")[0]; //se obtiene el elemento "base" del html
    maxLeft = base.width - 50; //se establece un espacio máximo para la posición de la izquierda
    maxTop = base.top - 50; //se establece un espacio máximo para la posición del top

    //para cada imagen en el arreglo (menor que 6)
    for(let i = 0; i < 6; i++){
        //CREA UN NUEVO ELEMENTO EN EJECUCIÓN DE JAVASCRIPT
        let sensor = document.createElement("img"); //el elemento es un <img>
        sensor.src = imgs[i % imgs.length]; //la url de la última posición del array img[] que fue establecido en la linea 8
        sensor.alt = i; //el texto alterno en caso que la url sea inválida
        sensor.id = i; //el id del elemento <img id=i>
        sensor.draggable = true; //propiedad draggable activada
        sensor.classList.add("sensor"); //se agrega a un arreglo de eventos o elementos
        sensor.classList.add("dragme"); //se agrega a un arrelgo de eventos o elementos
        sensor.style.left = `${Math.floor(Math.random() * 900)}px`; //se establece un valor aleatorio entre 0 y 900px para el ancho
        sensor.style.top = `${Math.floor(Math.random() * 500)}px`; //se establece un valor aleatorio entre 0 y 500px para el alto
        sensor.onclick = sensorClick; //se ejecunta el evento "click"

        let parent = document.getElementsByClassName("map")[0]; //se heredan los atributos del div "map"
        parent.appendChild(sensor); // se ancla el elemento "sensor" (<img>) al elemento "map"
    }
}

function startDrag(e){
    timeDelta = Date.now(); //obtiene la fecha y hora actual
    if(!e){ //si no hay evento
        var e = window.event; //se crea un evento heredado
    }

    if(e.preventDefault){ //si se ha detenido la ejecución
        e.preventDefault(); //que siga detenido porque probablemente se esté en el evento drag
    }

    targ = e.target ? e.target : e.srcElement; //se obtiene la última posición
    originalX = targ.style.left; //se establece la posición x original para ser modificada en el proceso de arrastrado
    originalY = targ.style.top; //se establece la posición y original para ser modificada en el proceso

    if(!targ.classList.contains("dragme")){
        return;
    }

    offsetX = e.clientX;
    offsetY = e.clientY;

    //se obtiene el valor entero de las posiciones left y top
    coordX = parseInt(targ.style.left);
    coordY = parseInt(targ.style.top);
    drag = true;

    document.onmousemove = dragDiv; //Mover el elemento en el mousemove
    return false;
}

function dragDiv(e){
    if(!drag){ //si no ha sido movido por cualquier razón
        return; //se finaliza la ejecución
    }
    if(!e){ //si no existe ningún evento
        e = window.event; //se agrega un evento
    }

    //verificar los bordes al mover el elemento seleccionado
    let newLeft = coordX + e.clientX - offsetX; //se calcula una nueva ubicación la posición
    if(newLeft < maxLeft && newLeft>minLeft){
        targ.style.left = newLeft+'px'; // se cambia a la nueva ubicación que fue calculada antes
    }

    //verificar los bordes al mover el elemento seleccionado
    let newTop = coordY + e.clientY - offsetY; //se calcula una nueva ubicación la posición
    if(newTop < maxTop && newTop > minTop){
        targ.style.top = newTop+'px'; // se cambia a la nueva ubicación que fue calculada antes
    }

    return false;
}

function stopDrag(){
    if(typeof drag == "undefined"){ //si se desconoce que existe un evento de tipo "draggable"
        return; //se finaliza la ejecución del evento previo
    }

    if(drag){ //si se está moviendo
        if(Date.now() - timeDelta > 150){ //se verifica que de verdad se movió a partir del valor del tiempo obtenido
            let p = document.getElementById("popup"); //se heredan todos los elementos del div <div id="popup"> que fue creado previamente
            if(p){ //si hay un popup seleccionado
                p.parentNode.removeChild(p); //reemplaza o eliminar el popup anterior dentro de "map"
            }
        }else{
            targ.style.left = originalX; //las posiciones no fueron calculadas, por lo tanto se restablecen a las posiciones originales
            targ.style.top = originalY; //las posiciones no fueron calculadas, por lo tanto se restablecen a las posiciones originales
        }
    }

    drag = false; //deja de moverse
}