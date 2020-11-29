//funcion para mandar a is gifs a mis gifs

if(localStorage.getItem('misGif') === null){
    localStorage.setItem('misGif','[]');
}else{
    var favorito = JSON.parse(localStorage.getItem('misGif'));
    if(favorito.length >0){
        document.getElementById("desapareceDeMisGifs").setAttribute("style","display:none");
        document.getElementById("apareceGif").setAttribute("style","display:grid");
        favorito.forEach(element => {
            var divGif = document.createElement("div");
            divGif.setAttribute("class","tanioVioletaGIF");
            console.log(element.link);
            var imagen = document.createElement("img");
            imagen.src = element.link;
        
            imagen.setAttribute("class","tamanioGIF");
            
            //creacion del color violeta sobre los gifs
            var  divBotones = document.createElement("div");
            divBotones.setAttribute('class','gifs');
            agregarHoverVioletaGif(divBotones,element.username,element.title,element.link,element.id);
                
            divGif.appendChild(imagen);
            divGif.appendChild(divBotones);
        
            document.getElementById("apareceGif").appendChild(divGif);
        });
    }
}