const express = require('express');
const { USER } = require('./models');
const app = express();

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());

app.get('/get/data', (req, res) => {
    USER.findAll()
    .then( result => { res.send(result)})
    .catch( err => { throw err})
}); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})