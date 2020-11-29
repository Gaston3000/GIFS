//funcion likear imagenes
if(localStorage.getItem('fav') === null){
    localStorage.setItem('fav','[]');
}else{
    var favorito = JSON.parse(localStorage.getItem('fav'));
    if(favorito.length >0){
        document.getElementById("desapareceDeFav").setAttribute("style","display:none");
        document.getElementById("apareceFav").setAttribute("style","display:grid");
        favorito.forEach(element => {
            var divGif = document.createElement("div");
            divGif.setAttribute("class","tanioVioletaGIF");
        
            var imagen = document.createElement("img");
            imagen.src = element.link;
        
            imagen.setAttribute("class","tamanioGIF");
            
            //creacion del color violeta sobre los gifs
            var  divBotones = document.createElement("div");
            divBotones.setAttribute('class','gifs');
            agregarHoverVioletaGif(divBotones,element.username,element.title,element.link,element.id);
                
            divGif.appendChild(imagen);
            divGif.appendChild(divBotones);
        
            document.getElementById("apareceFav").appendChild(divGif);
        });
    }
}


























