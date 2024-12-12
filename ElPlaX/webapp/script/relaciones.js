// Obtener los datos de los alumnos y empresas desde el servidor
// document.addEventListener("DOMContentLoaded", function () {
//   fetch('http://localhost:3000/estudiantes')
//     .then(response => response.json())
//     .then(data => {
//       const studentList = document.getElementById('student-list');
//       data.forEach(estudiante => {
//         const option = document.createElement('option');
//         option.value = `${estudiante.nombre} ${estudiante.apellido}`;
//         studentList.appendChild(option);
//       });
//     })
//     .catch(err => console.error('Error al obtener estudiantes:', err));
// });


// fetch('http://localhost:3000/empresas')
//   .then(response => response.json())
//   .then(data => {
//     const companySelect = document.getElementById('company-select');
//     data.forEach(empresa => {
//       const option = document.createElement('option');
//       option.value = empresa.id_empresa;
//       option.textContent = empresa.nombre_empresa;
//       companySelect.appendChild(option);
//     });
//   });

// Agregar evento de envío al formulario
// document.getElementById('assign-form').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const studentId = document.getElementById('student-select').value;
//   const companyId = document.getElementById('company-select').value;
//   const startDate = document.getElementById('start-date').value;

//   // Enviar solicitud al servidor para agregar la asignación
//   fetch('http://localhost:3000/asignaciones', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       id_estudiante: studentId,
//       id_empresa: companyId,
//       fecha_asignacion: startDate,
//     }),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       alert('Asignación agregada con éxito');
//     })
//     .catch(err => console.error('Error al agregar asignación:', err));
// });

// Agregar evento de envío al formulario
const assignForm = document.getElementById('assign-form');
assignForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const studentName = document.getElementById('student-select').value;

  // Buscar el ID del alumno en la base de datos
  fetch('http://localhost:3000/estudiantes')
    .then(response => response.json())
    .then(data => {
      const studentId = data.find(estudiante => estudiante.nombre === studentName).id_estudiante;
      console.log('ID del alumno:', studentId);
    })
    .catch(err => console.error('Error al obtener estudiantes:', err));

  const companyName = document.getElementById('company-select').value;

  // Buscar el ID de la empresa en la base de datos
  fetch('http://localhost:3000/empresas')
    .then(response => response.json())
    .then(data => {
      const companyId = data.find(empresa => empresa.nombre_empresa === companyName).id_empresa;
      console.log('ID de la empresa:', companyId);
    })
    .catch(err => console.error('Error al obtener empresas:', err));

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