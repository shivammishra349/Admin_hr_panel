let express = require('express');


let cors = require('cors')
let app = express();
app.use(cors());
app.use(express.json());


const sequelize = require('./connection/database')
const user = require('./models/user')

const userRoute = require('./routes/users')
const hrRoute = require('./routes/hr')
const adminRoute = require('./routes/admin')

app.use(userRoute)
app.use(adminRoute)
app.use(hrRoute)


sequelize.sync()
    .then(()=>{
        app.listen(3000,()=>{
            console.log('server is running on port 3000')
        })
    })
    .catch((err)=>{
        console.log(err)
    })
