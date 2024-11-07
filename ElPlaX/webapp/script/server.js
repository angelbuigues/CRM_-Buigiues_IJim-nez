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
    connection.query('SELECT id_asignacion, id_estudiante, (SELECT nombre FROM estudiantes WHERE estudiantes.id_estudiante = asignaciones.id_estudiante) AS nombre_estudiante, id_empresa, (SELECT nombre_empresa FROM empresas WHERE empresas.id_empresa = asignaciones.id_empresa) AS nombre_empresa, fecha_asignacion FROM asignaciones', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        console.log(results); // Verifica la estructura en la consola del servidor
        res.json(results);
    });
});


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
