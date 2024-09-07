
const express = require("express");
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const dbPath = path.join(__dirname, "database.db");
let db = null

const initializeDbAndServer = async () => {
    try{
        db = await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(3000, () => console.log("app starting at 3000"))
    }
    catch(e){
        console.log(e.message)
        process.exit(1);
    }
}


app.get("/", async(request,response)=>{
    const data = `SELECT * FROM users`;
    const result = await db.all(data)
    response.send(result)
})

initializeDbAndServer()