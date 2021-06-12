

import express from 'express';
import routes from './routes/index';



//--inspect cancela o debug
const app = express()

app.use(express.json())
app.use(routes)

export default app