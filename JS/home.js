/* GIFOS DEL SECTION */

const apiKey = "M6owG5YWFTAeVkHuIBwZuEmgP4MHHwej";
const url = "https://api.giphy.com/v1/gifs/trending";

var keyWord = "perro";
var search = url+"?api_key="+apiKey+"&limit=21";
var indexGifs = 1;
var pagina = 0;
var textoDeBusqueda = "";
var gifBlob = null;

function llamadoApi(){fetch(search)
.then(promesa=>{return promesa.json()})
.then(resultado=>{
    var indice = 1;
    var contador = 0;
    var div = document.createElement("div");
    div.setAttribute("class","gifosAside")
    resultado.data.forEach(element => { 
    if(contador == 3){
        contador = 0;
        div.id = "divFoto"+indice;
        div.setAttribute("class","divGrande");
        document.getElementById("divFotos").appendChild(div);
        indice++;
        div = document.createElement("div");
        div.setAttribute('style','display:none');
    }    
    
    //creacion del hover violeta
    var divGif = document.createElement("div");
    divGif.setAttribute("class","tanioVioletaGIF");

    var imagen = document.createElement("img");
    imagen.src= element.images.downsized_large.url;

    imagen.setAttribute("class","tamanioGIF");//width 357 heigth 275 predeterminado
    
    //creacion del color violeta sobre los gifs
    var  divBotones = document.createElement("div");
    divBotones.setAttribute('class','gifs');
    agregarHoverVioletaGif(divBotones,element.username,element.title,element.images.original.url,element.id);
        
    divGif.appendChild(imagen);
    divGif.appendChild(divBotones);


    div.appendChild(divGif);
    contador++;

});
    div.id = "divFoto"+indice;
    document.getElementById("divFotos").appendChild(div);
    indice++;
})
}

llamadoApi()
function pasarGifs(x){
    var cambiogif = indexGifs + x;
    if(cambiogif<=7 && cambiogif>=1){
        document.getElementById("divFoto"+cambiogif).setAttribute("style","display:flex");
        document.getElementById("divFoto"+indexGifs).setAttribute("style","display:none");
        indexGifs =  cambiogif;
    }
}


/*  BUSCADOR ARTICLE HOME.HTML */

var urlBuscador = "https://api.giphy.com/v1/gifs/search/tags?";

function buscadorApi(texto){
    document.getElementById("lupita2").setAttribute("style","display:block");
    document.getElementById("cruzBuscador").setAttribute("style","display:block");
    document.getElementById("lupita").setAttribute("style","display:none")
    fetch(urlBuscador+"api_key="+apiKey+"&q="+texto)
    .then(promesa=>{return promesa.json()})
    .then(resultado=>{
        document.getElementById("sugerencias").innerHTML = "";
        var lista = document.getElementById("sugerencias");
        resultado.data.forEach(item => {    
            var sugerencia = document.createElement("li");
            sugerencia.innerText = item.name;
            sugerencia.setAttribute("onclick","mostradorDeBusqueda('"+item.name+"',1)");
            lista.appendChild(sugerencia);
        })
    });
}
const selectElement = document.getElementById("buscador");

if(localStorage.getItem('dark')===null){
    localStorage.setItem('dark','0');
}
else{
    if(localStorage.getItem('dark')=='1'){
        document.body.classList.toggle('dark');
    }
}

//buscador de gifs

function mostradorDeBusqueda(texto, paginado){
    fetch("https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+texto+"&limit="+(12*paginado).toString())
    .then(promesa=>{return promesa.json()})
    .then(resultado=>{
        textoDeBusqueda = texto;
        pagina = paginado;
        document.getElementById("btn2vermas").setAttribute("style","display:block");
        document.getElementById("lineaGris").setAttribute("style","display:block");
        document.getElementById("lineaGris2").setAttribute("style","display:block");
        document.getElementById("lupita2").setAttribute("style","display:block");
        document.getElementById("cruzBuscador").setAttribute("style","display:block");
        document.getElementById("lupita").setAttribute("style","display:none");
        document.getElementById("trendingdiv").setAttribute("style","display:none");
        //mobile
        document.getElementById("h1buscador").classList.add("busquedaActiva");
        document.getElementById("imgdelbuscador").classList.add("busquedaActiva");
        if (paginado == 1){
            document.getElementById("resultadoDeBusqueda").innerHTML = "";
        }    
        document.getElementById("titulodebusqueda").innerHTML = texto;
        var div = document.getElementById("resultadoDeBusqueda");
        resultado.data.forEach((item,index) => {
            if (index >= (12*(paginado-1))){                
                //creacion del hover violeta
                var divGif = document.createElement("div");
                divGif.setAttribute("class","tanioVioletaGIF");

                var imagen = document.createElement("img");
                imagen.src= item.images.downsized_large.url;

                imagen.setAttribute("class","tamanioGIF");//width 357 heigth 275 predeterminado
                
                //creacion del color violeta sobre los gifs
                var  divBotones = document.createElement("div");
                divBotones.setAttribute('class','gifs');
                agregarHoverVioletaGif(divBotones,item.username,item.title,item.images.original.url,item.id);
                    
                divGif.appendChild(imagen);
                divGif.appendChild(divBotones);


                div.appendChild(divGif);
            }     
        })
    })
};

// apretar tecla "enter" y que te busque
selectElement.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) { //el 13 es la tecla enter
      event.preventDefault();
      mostradorDeBusqueda(selectElement.value,1);
    }
    else{
      buscadorApi(selectElement.value);
    }
});

// apretar la lupita y que te busque
var buscaLupa = document.getElementById("lupita");
buscaLupa.addEventListener("click", function() {
    mostradorDeBusqueda(selectElement.value,1);
});

var buscaLupa2 = document.getElementById("lupita2");
buscaLupa2.addEventListener("click", function() {
    mostradorDeBusqueda(selectElement.value,1);
});

// apretar la "x" en el buscador y que te borre el contenido
var boton = document.getElementById("cruzBuscador");
boton.addEventListener("click", function() {
  document.getElementById("buscador").value = '';	
});


/***********   M O D O  N O C T U R N O   ***********/

function toggleDarkMode(){
    document.body.classList.toggle('dark');
    localStorage.setItem('dark',localStorage.getItem('dark') == '0' ? '1' : '0');
};
/** CAMBIO DE PALABRA 'MODO NOCTURNO' A 'MODO DIURNO' **/
function visualiza_primero() {
    document.getElementById('primero').style.visibility='visible';
    document.getElementById('primero').style.display='block';
    document.getElementById('segundo').style.visibility='hidden';
    document.getElementById('segundo').style.display='none';
};
function visualiza_segundo() {
    document.getElementById('segundo').style.visibility='visible';
    document.getElementById('segundo').style.display='block';
    document.getElementById('primero').style.visibility='hidden';
    document.getElementById('primero').style.display='none';
};

/***********   VENTANA QUE APARCE CUANDO SE TOCA EXPANDIR UN GIF  ***********/
//***************            MODAL              ******************//

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//funcion para que se pueda favear y descargar un gif desde la expancion de gif
function expandir (titulo, usuario, gifs, id){

    var modal2 = document.getElementById("myModal");
    modal2.style.display = "block";
    document.getElementById("userModal").innerText = usuario;
    document.getElementById("titleModal").innerText = titulo;

    var imagen = document.createElement("img");
    imagen.src= gifs;
    document.getElementById("divFotosModal").appendChild(imagen);
    document.getElementById("descargaModal").removeAttribute("onclick");
    document.getElementById("corazonModal").removeAttribute("onclick");
    
    var descargar3 = document.getElementById("descargaModal");
    var megusta = document.getElementById("corazonModal");

    descargar3.setAttribute("onclick","download('"+gifs+"','"+titulo+".gif');");
    megusta.setAttribute("onclick","delFavorito('" + id + "','"+ gifs +"','"+ titulo +"','"+ usuario +"')");

}

/** generalizar el hover violeta **/

function agregarHoverVioletaGif(divContenedor,usuario,titulo,link,id){
    
    //seccion de los botones dentro del hover
   
    /* BOTON 1 */
    var boton1 = document.createElement("button");
    boton1.setAttribute("type","button");//el boton del corazon
    boton1.setAttribute("class","coraVacio");
    boton1.setAttribute("onclick","delFavorito('" + id + "','"+ link +"','"+ titulo +"','"+ usuario +"')");
    //boton1.setAttribute("onclick","delFavorito;cambioDeCora1();cambioDeCora2()");

    var imagencorazon = document.createElement("img"); //imagen del corazon
    imagencorazon.src = "../img/icon-fav-hover.svg";
    boton1.appendChild(imagencorazon);
    
    /* BOTON 2 */
    var boton2 = document.createElement("button");
    boton2.setAttribute("type","button");//el boton de descargar
    boton2.setAttribute("class","descargar");
    //para descargar la imagen, sigue en la funcion download(link, nombre) despues de esta funcion
    boton2.setAttribute("onclick","download('"+link+"','"+titulo+".gif');");

    var imagendescarga = document.createElement("img"); //imagen de descarga
    imagendescarga.src = "../img/icon-download.svg";
    boton2.appendChild(imagendescarga);

    /* BOTON 3 */
    var boton3 = document.createElement("button");
    boton3.setAttribute("type","button");//el boton de expandir
    boton3.setAttribute("class","expandirPantalla");
    boton3.setAttribute("onclick","expandir('"+titulo+"', '"+usuario+"','"+link+"','"+id+"');");

    var imagenexpandir = document.createElement("img"); //imagen de expandir
    imagenexpandir.src = "../img/AgrandarPantallaVioleta.svg";
    boton3.appendChild(imagenexpandir);

    /* BOTON 4 ( SOLO EN MIS GIFS APARECE) */
    var boton4 = document.createElement("button");
    boton4.setAttribute("type","submit");//el boton de eliminar(solo en mis gifos)
    boton4.setAttribute("class","expulsarDeGifs");
    boton4.setAttribute("onclick","sacar('"+id+"');");

    var expulsaGif = document.createElement("img"); //imagen de tacho
    expulsaGif.src = "../img/icon_trash.svg";
    boton4.appendChild(expulsaGif);//tengo que hacer funcionar este boton


    //titulos de los gifs
    var labeltittle = document.createElement("label");
    labeltittle.setAttribute("class","tittleGIFO");
    labeltittle.innerText = titulo;

    //usuario de los gifs
    var labeluser = document.createElement("label");
    labeluser.setAttribute("class","userGIFO");
    labeluser.innerText = usuario;

    //llamado a los hijos 
    divContenedor.appendChild(labeluser);
    divContenedor.appendChild(labeltittle);
    divContenedor.appendChild(boton1);
    divContenedor.appendChild(boton2);
    divContenedor.appendChild(boton3);
    divContenedor.appendChild(boton4);
}

//funcion para descargar gifs
async function download(link, nombre) {
    const a = document.createElement("a");
    let response = await fetch(link);
    let file = await response.blob();
    a.download = nombre;
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//funcion para favear
function delFavorito(id, link, titulo, username){
    var favorito = JSON.parse(localStorage.getItem('fav'));
    var favoritoOUT = [];
    favorito.forEach((item)=>{
        if(item.id!=id){
            favoritoOUT.push(item);
        }
    })
    if(favorito.length == favoritoOUT.length){
        favoritoOUT.push({"id":id,"link":link,"username":username,"title":titulo});
    }
    localStorage.setItem('fav',JSON.stringify(favoritoOUT));

}


/********************** TODO LO QUE ES CREAR GIFO ***************************/

//para crear el video cuando se presione grabar

var recording = false;//FLAG(dato que te dice el estado de determinado proceso)para indicar si se esta grabando, inicia como false
var recorder;//objeto de la libreria de grabacion

async function startRecord(){
    var video = document.getElementById("recording");//elemento video para ver si se esta grabando
    var preview = document.getElementById("uploadedGIF");
    var stream = await navigator.mediaDevices.getUserMedia({audio: false, video: true });
    cambiar2();
    //navigator es un objeto que interactua con el navegador, tiene monton de propiedades y metodos
    //medidadevices es todo lo que es para tener audio video etc
    //stream seria la promesa
    video.style.display = 'block';
    preview.style.display = 'none';

    document.getElementById("videoDeGrabacion").setAttribute("style","display:block; position: relative;");

    recorder = new RecordRTC(stream, {// objeto que maneja todo tipo de video
        type: 'gif',
        framerate: 1,
        quality: 10,
        width: 250,
    });
    
    video.srcObject = stream;
    video.play();
}

async function stoptRecording(){
    var video = document.getElementById("recording");
    var preview = document.getElementById("uploadedGIF");
    recorder.stopRecording();
    recording = false;
    video.pause();

    let blob = await recorder.getBlob();
    recorder.destroy();
    return blob;
    
}

async function uploadGIF(recordedGIF){
    var video = document.getElementById("recording");
    var preview = document.getElementById("uploadedGIF");
    let form = new FormData();
    form.append("file", recordedGIF, 'example.gif');

    document.getElementById("violeta").setAttribute("style","display:block");
    document.getElementById("H5DeCrear").setAttribute("style","display:block");
    document.getElementById("loaderVerde").setAttribute("style","display:block");

    document.getElementById("tickVerde").setAttribute("style","display:none");
    document.getElementById("button1crarGif").setAttribute("style","display:none");
    document.getElementById("button2crarGif").setAttribute("style","display:none");

    let result = await fetch('https://upload.giphy.com/v1/gifs?api_key='+apiKey,{
        method: 'POST',
        body: form
    }); 
    if(result.status == 200){// 200 es el htpp de exito https://developer.mozilla.org/es/docs/Web/HTTP/Status
        let parsedResult = await result.json();
        let gifId = parsedResult.data.id;
        console.log(parsedResult);
        showUploadedGIF(gifId);

        video.style.display = 'block';
    
        document.getElementById("H5DeCrear").setAttribute("style","display:none");
        document.getElementById("loaderVerde").setAttribute("style","display:none");

        document.getElementById("H6DeCrear").setAttribute("style","display:block");
        document.getElementById("tickVerde").setAttribute("style","display:block");
        document.getElementById("button1crarGif").setAttribute("style","display:block");
        document.getElementById("button2crarGif").setAttribute("style","display:block");
        
    }
    else{
        alert("Hubo un error al cargar el GIF");
        console.log(result);
    }
}

var linkGifSubido = "";//link del gif

async function showUploadedGIF(gifId){

    var uploadedGIF = await fetch('https://api.giphy.com/v1/gifs/'+gifId+'?api_key='+apiKey);
    if (uploadedGIF.status == 200){
        let uploadedGIFData = await uploadedGIF.json();
        linkGifSubido = uploadedGIFData.data.images.original.url;
        misGif(gifId,linkGifSubido);
    }
}

function copiado(url){
    var aux = document.createElement("input");
    aux.setAttribute("value",url);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("url copiado");
}

function misGif(id, link){
    var favorito = [];
    if(localStorage.getItem('misGif')!=null){
        favorito = JSON.parse(localStorage.getItem('misGif'));
    }
    favorito.push({"id":id,"link":link,});
    localStorage.setItem('misGif',JSON.stringify(favorito));
}

function sacar(id){ 
    var x = -1;
    var sacando = [];
    sacando = JSON.parse(localStorage.getItem('misGif'));
    for (let index = 0; index < sacando.length; index++) {
        if(sacando[index].id == id){
            x = index;
        }
    }
    if(x > -1){
        sacando.splice(x,1);
    }
    localStorage.setItem('misGif',JSON.stringify(sacando));
}

//toda la secuencia de botones de crear gif
//primer boton de "comenzar"
function cambiar(){
    document.getElementById("bot1").classList.add("active");
    document.getElementById("escondecrear1").innerHTML = "¿Nos das acceso a tu cámara?";
    document.getElementById("escondecrear2").innerHTML = "El acceso a tu cámara será valido solo";
    document.getElementById("escondecrear3").innerHTML = "por el tiempo en el que estés grabando el GIFO.";
    document.getElementById("crearGifComenzar").setAttribute("style","display:none");
    startRecord();
}
document.getElementById("crearGifComenzar").onclick = function(){
    cambiar(); 
}
//apretar el boton "2"
function cambiar2(){
    document.getElementById("bot1").classList.remove("active");
    document.getElementById("bot2").classList.add("active");
    document.getElementById('countdown').innerHTML = '00:00:00';
    document.getElementById("countdown").setAttribute("style","display:block");
    document.getElementById("recordButton").setAttribute("style","display:block");
    document.getElementById("repCaptura").setAttribute("style","display:none");
    document.getElementById("detetnerButton").setAttribute("style","display:none");
    document.getElementById("escondecrear1").setAttribute("style","display:none");
    document.getElementById("escondecrear2").setAttribute("style","display:none");
    document.getElementById("escondecrear3").setAttribute("style","display:none");
    document.getElementById("SUBIRGIFO").setAttribute("style","display:none");
}

//cuando apretaras "grabar"
//contador de 0 a 5seg

var bDetener = false;

async function updateClock(totalTime) {
  document.getElementById('countdown').innerHTML = '00:00:0'+ totalTime.toString();
  if(totalTime==5 || bDetener){
    detenerGrabado();
  }else{
    totalTime+=1;
    setTimeout("updateClock("+(totalTime).toString()+")",1000);
  }
}

function funciondelgrabado(){
    bDetener = false;
    recorder.startRecording(); 
    document.getElementById("recordButton").setAttribute("style","display:none");
    document.getElementById("detetnerButton").setAttribute("style","display:block");
}

async function detenerGrabado(){
    bDetener = true;
    gifBlob = await stoptRecording();
    //uploadGIF(result);
    document.getElementById("SUBIRGIFO").setAttribute("style","display:block");
    document.getElementById("repCaptura").setAttribute("style","display:block");
    document.getElementById("countdown").setAttribute("style","display:none");
    document.getElementById("detetnerButton").setAttribute("style","display:none");
}

function suburGif(){
    document.getElementById("bot2").classList.remove("active");
    document.getElementById("bot3").classList.add("active");
    document.getElementById("SUBIRGIFO").setAttribute("style","display:none");
    document.getElementById("repCaptura").setAttribute("style","display:none");
    uploadGIF(gifBlob);
}















