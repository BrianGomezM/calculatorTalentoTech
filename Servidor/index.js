const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());


app.post('/json', (req, res) => {
    const jsonData = req.body.json; 
    console.log('Datos recibidos:', jsonData);
    const responseObject = {
      status: 'success',
      mensaje: 'Datos recibidos',
      datos: jsonData, 
    };
    res.json(responseObject); 
  });

app.listen(3001, () => {
    console.log('Servidor en puerto 3001');
});
