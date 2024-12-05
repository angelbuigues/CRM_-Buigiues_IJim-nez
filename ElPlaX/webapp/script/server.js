const express = require('express');
const cors = require('cors');
const connection = require('./database');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
    connection.query('SELECT * FROM estudiantes', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener un estudiante
app.get('/estudiantes/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM estudiantes WHERE id_estudiante = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            return res.status(500).json({ error: 'Error en la base de datos' }); // Respuesta JSON para errores
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' }); // Manejo de ID inexistente
        }

        res.json(results[0]); // Envía el resultado correcto
    });
});
app.get('/empresas/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM empresas WHERE id_empresa = ?';

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            return res.status(500).json({ error: 'Error en la base de datos' }); // Respuesta JSON para errores
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Estudiante no encontrado' }); // Manejo de ID inexistente
        }

        res.json(results[0]); // Envía el resultado correcto
    });
});


// Ruta para obtener todos los profesores
app.get('/profesores', (req, res) => {
    connection.query('SELECT * FROM profesores', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);

    });
});

// Ruta para obtener todas las empresas
app.get('/empresas', (req, res) => {
    connection.query('SELECT * FROM empresas', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener todas las clases
app.get('/clases', (req, res) => {
    connection.query('SELECT * FROM clases', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

// Ruta para obtener todas las asignaciones
app.get('/asignaciones', (req, res) => {
    connection.query('SELECT * FROM asignaciones', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        console.log(results); // Verifica la estructura en la consola del servidor
        res.json(results);
    });
});

// Ruta para insertar un estudiante
app.post('/insertarEstudiantes', (req, res) => {
    const { dni, nombre, apellido, curso, fecha, direccion, email, telefono, vehiculo } = req.body;
    const tieneVehiculo = vehiculo ? 1 : 0; // Convertimos el boolean a un valor 1 o 0

    const query = `
        INSERT INTO estudiantes (dni, nombre, apellido, id_clase, fecha_nacimiento, direccion, email, telefono, tiene_vehiculo) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [dni, nombre, apellido, curso, fecha, direccion, email, telefono, tieneVehiculo];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.status(200).send('Estudiante añadido con éxito');
    });
});

// Ruta para insertar una empresa
app.post('/insertarEmpresas', (req, res) => {
    const { cif, nombre, telefono, email, direccion, capacidad } = req.body;

    const query = `
        INSERT INTO empresas (CIF, nombre_empresa, telefono, email, direccion, capacidad) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [cif, nombre, telefono, email, direccion, capacidad];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.status(200).send('Empresa añadida con éxito');
    });
});

// Ruta para insertar una empresa
app.post('/insertarAsignaciones', (req, res) => {

    console.log(req.body);
    const { id_estudiante, id_empresa, fecha_asignacion } = req.body;

    const query = `
        INSERT INTO asignaciones (id_estudiante, id_empresa, fecha_asignacion) 
        VALUES (?, ?, ?)
    `;
    const values = [id_estudiante, id_empresa, fecha_asignacion];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.status(200).send(JSON.stringify({mensaje: 'Asignación realizada con éxito'}));
    });
});

// Ruta para eliminar un estudiante por ID
app.delete('/estudiantes/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM estudiantes WHERE id_estudiante = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Estudiante no encontrado');
        } else {
            res.status(200).send('Estudiante eliminado con éxito');
        }
    });
});

// Ruta para eliminar una empresa por ID
app.delete('/empresas/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM empresas WHERE id_empresa = ?';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Empresa no encontrada');
        } else {
            res.status(200).send('Empresa eliminada con éxito');
        }
    });
});

// Ruta para editar un estudiante por ID
app.put('/estudiantes/:id', async (req, res) => {

    const { id } = req.params;


    const query = `
            UPDATE estudiantes 
            SET nombre = ?, apellido = ?, id_clase = ?, fecha_nacimiento = ?, direccion = ?, email = ?, telefono = ?, tiene_vehiculo = ?
            WHERE id_estudiante = ?
        `;
    const { nombre, apellido, curso, fecha, direccion, email, telefono, vehiculo } = req.body;
    const values = [nombre, apellido, curso, fecha, direccion, email, telefono, vehiculo, id];
    console.log("Estudiante editado:", values);
    connection.query(query, values, (err, results) => {
        if (err) {
            throw err;
        }
        res.status(200).send('Estudiante actualizado con éxito');
    });

});



// Ruta para editar una empresa por ID
app.put('/empresas/:id', (req, res) => {
    const { id } = req.params;
    

    const query = `
        UPDATE empresas 
        SET CIF = ?, nombre_empresa = ?, telefono = ?, email = ?, direccion = ?, capacidad = ? 
        WHERE id_empresa = ?
    `;
    const { cif, nombre, telefono, email, direccion, capacidad } = req.body;
    const values = [cif, nombre, telefono, email, direccion, capacidad, id];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error("Error en la base de datos:", err);
            res.status(500).send('Error en la base de datos');
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).send('Empresa no encontrada');
        } else {
            res.status(200).send('Empresa actualizada con éxito');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});