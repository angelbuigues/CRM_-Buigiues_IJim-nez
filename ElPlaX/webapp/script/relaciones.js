// Obtener los datos de los alumnos y empresas desde el servidor
fetch('http://localhost:3000/estudiantes')
  .then(response => response.json())
  .then(data => {
    const studentSelect = document.getElementById('student-select');
    data.forEach(estudiante => {
      const option = document.createElement('option');
      option.value = estudiante.id_estudiante;
      option.textContent = `${estudiante.nombre} ${estudiante.apellido}`;
      studentSelect.appendChild(option);
    });
  });

fetch('http://localhost:3000/empresas')
  .then(response => response.json())
  .then(data => {
    const companySelect = document.getElementById('company-select');
    data.forEach(empresa => {
      const option = document.createElement('option');
      option.value = empresa.id_empresa;
      option.textContent = empresa.nombre_empresa;
      companySelect.appendChild(option);
    });
  });

// Agregar evento de envío al formulario
const assignForm = document.getElementById('assign-form');
assignForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const studentId = document.getElementById('student-select').value;
  const companyId = document.getElementById('company-select').value;
  const startDate = document.getElementById('start-date').value;

  // Enviar solicitud al servidor para agregar la asignación
  fetch('http://localhost:3000/insertarAsignaciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_estudiante: studentId,
      id_empresa: companyId,
      fecha_asignacion: startDate,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Asignación agregada con éxito');
      window.location.href = './relaciones.html';
    })
    .catch(err => console.error('Error al agregar asignación:', err));
});