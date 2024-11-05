document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("alumn-button").addEventListener("click", function() {
        window.location.href = "./html/alumnos.html";
    });

    document.getElementById("client-button").addEventListener("click", function() {
        window.location.href = "./html/empresas.html";
    });
    
    document.getElementById("relation-button").addEventListener("click", function() {
        window.location.href = "./html/relaciones.html";
    });

    document.getElementById("information-button").addEventListener("click", function() {
        window.location.href = "./html/informacion.html";
    });
      
})