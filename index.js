require('dotenv').config()
require('./config/dbconnect')
const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routes')

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', express.static('uploads'));
app.use(cors("*"))
app.use(express.json())
app.use('/api',router)

 app.listen(port,() =>{
    console.log(`app start port:-${port}`);
    
})

// export default a