const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

// Configura la conexión con la base de datos MySQL
const pool = mysql.createPool({
    host: 'localhost', // Cambia esto si tu servidor no está en localhost
    user: 'tu_usuario_mysql', // Cambia esto por tu usuario de MySQL
    password: 'tu_contraseña_mysql', // Cambia esto por tu contraseña de MySQL
    database: 'nombre_base_datos', // Cambia esto por el nombre de tu base de datos
    port: 3306, // Puerto por defecto de MySQL
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir `pool.query` a promesas para usar `async/await`
const poolQuery = (sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (error, results) => {
        if (error) {
            return reject(error);
        }
        resolve(results);
    });
});

const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Permitir peticiones desde tu frontend React
}));
app.use(express.json());

// Ruta para obtener las ventas
app.get('/api/sales', async (req, res) => { // Agregué el prefijo /api
    try {
        const result = await poolQuery(`
            SELECT s.sale_id, c.make, c.model, u1.username AS buyer, u2.username AS seller, s.sale_price, s.sale_date
            FROM sales s
            JOIN cars c ON s.car_id = c.car_id
            JOIN users u1 ON s.buyer_id = u1.user_id
            JOIN users u2 ON s.seller_id = u2.user_id;
        `);
        res.status(200).json(result); // Envía las filas obtenidas como respuesta
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ success: false, message: 'Error al obtener las ventas' });
    }
});

// Ruta para obtener los autos
app.get('/api/cars', async (req, res) => { // Agregué el prefijo /api
    try {
        const result = await poolQuery('SELECT * FROM cars;');
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener los autos:', error);
        res.status(500).json({ success: false, message: 'Error al obtener los autos' });
    }
});

// Iniciar el servidor en el puerto 3001
const PORT = 3001; // Cambié a 3001 para evitar conflicto con React en 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
