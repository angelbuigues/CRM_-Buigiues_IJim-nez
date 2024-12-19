document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("inf-alumnos").addEventListener("click", function() {
        window.location.href = "tablas_info/info_alumnos.html";
    });

    document.getElementById("inf-empresas").addEventListener("click", function() {
        window.location.href = "tablas_info/info_empresas.html";
    });
    
    document.getElementById("inf-relaciones").addEventListener("click", function() {
        window.location.href = "tablas_info/info_relaciones.html";
    });

    document.getElementById("inf-registros").addEventListener("click", function() {
        window.location.href = "tablas_info/info_registros.html";
    });
      
    const infoButton = document.getElementById("info-button");
    const popup = document.getElementById("info-popup");

    // Mostrar la ventana emergente
    infoButton.addEventListener("click", () => {
        popup.classList.toggle("hidden");
    });

})