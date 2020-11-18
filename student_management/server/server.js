const express = require('express');
const router = require('./routes');
const app = express();

const sequelize = require('./models').sequelize;
const path = require('path');
sequelize.sync();

app.use(express.json());
app.use('/', router);                                            

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})