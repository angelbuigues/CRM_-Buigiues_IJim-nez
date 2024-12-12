// Agregar evento de envío al formulario
const assignForm = document.getElementById('assign-form');
assignForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  try {
    const studentName = document.getElementById('student-select').value;
    const companyName = document.getElementById('company-select').value;
    const startDate = document.getElementById('start-date').value;

    // Obtener estudiantes y empresas en paralelo
    const [studentsResponse, companiesResponse] = await Promise.all([
      fetch('http://localhost:3000/estudiantes'),
      fetch('http://localhost:3000/empresas'),
    ]);

    const students = await studentsResponse.json();
    const companies = await companiesResponse.json();

    // Buscar IDs correspondientes
    const studentId = students.find(
      (estudiante) => (estudiante.nombre + ' ' + estudiante.apellido) === studentName
    )?.id_estudiante;

    const companyId = companies.find(
      (empresa) => empresa.nombre_empresa === companyName
    )?.id_empresa;

    // Validar que los IDs existan
    if (!studentId) {
      alert('No se encontró el estudiante seleccionado.');
      return;
    }

    if (!companyId) {
      alert('No se encontró la empresa seleccionada.');
      return;
    }

    console.log('ID del alumno:', studentId);
    console.log('ID de la empresa:', companyId);

    // Enviar solicitud al servidor para agregar la asignación
    const response = await fetch('http://localhost:3000/insertarAsignaciones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_estudiante: studentId,
        id_empresa: companyId,
        fecha_asignacion: startDate,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al agregar la asignación.');
    }

    const data = await response.json();
    console.log(data);
    alert('Asignación agregada con éxito');
    window.location.href = './relaciones.html';
  } catch (err) {
    console.error('Error al agregar asignación:', err);
    alert('Hubo un error al agregar la asignación. Por favor, inténtalo de nuevo.');
  }
});
