const app = require("../app");

require("../bootstrap/index");
const {bootstrap} = require("../bootstrap");

let server;
const PORT = 5000;

bootstrap().then(()=>{
    server = app.listen(PORT,()=>{
        console.log(`listening ${PORT}`)
    })
})