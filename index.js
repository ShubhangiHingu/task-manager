require('dotenv').config()

const app = require('./src/app')

const port = 8080

require('./src/config/db')

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})







