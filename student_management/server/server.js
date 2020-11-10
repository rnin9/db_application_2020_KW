const express = require('express');
const router = require('./routes');
const app = express();

const sequelize = require('./models').sequelize;
sequelize.sync();

app.use(express.json());
app.use('/', router);
router.get('/get/data', (req, res) => {
    users.findAll()
    .then( result => { res.send(result)})
    .catch( err => { throw err})
}); 

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})