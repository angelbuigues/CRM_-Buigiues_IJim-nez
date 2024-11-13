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

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});