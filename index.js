import express from 'express'
import routes from './controllers/routes'

const app = express()
const port = 3000

app.set('view engine', 'pug')

app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
