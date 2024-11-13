document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("alumn-button").addEventListener("click", function() {
        window.location.href = "./alumnos.html";
    });

    document.getElementById("client-button").addEventListener("click", function() {
        window.location.href = "./empresas.html";
    });
    
    document.getElementById("relation-button").addEventListener("click", function() {
        window.location.href = "./relaciones.html";
    });

    document.getElementById("information-button").addEventListener("click", function() {
        window.location.href = "./informacion.html";
    });
      
})