const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')


app.use(bodyParser.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nyepeda_db'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('mysql Connected...');
});

// all data
app.get('/api/users',(req,res)=>{
    let sql = "SELECT * FROM account_nyepeda";
    let query = conn.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response":result}));
    });
});

// data id
app.get('/api/users/:id',(req,res)=>{
    let sql = "SELECT * FROM account_nyepeda WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response":result}));
    });
});

//data email
app.get('/api/users/nama',(req,res)=>{
    let sql = "SELECT nama FROM account_nyepeda";
    let query = conn.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response":result}));
    });
});

//create data baru
app.post('/api/users',(req,res)=>{
    let data = {nama: req.body.nama, 
        email: req.body.email, 
        kata_sandi: req.body.kata_sandi}
    conn.query('INSERT INTO account_nyepeda SET ?',data,function(err,rows){
        if(err){
            return res.status(500).json({
                status:false,
                message: 'gagal',
            })
        } else{
            return res.status(200).json({
                status:true,
                message:'Berhasil'
            })
        }
    })
});

//edit data
app.put('/api/users/:id',(req,res)=>{
    let sql = "UPDATE account_nyepeda SET nama='"+req.body.nama+"', email='"+req.body.email+"', kata_sandi='"+req.body.kata_sandi+"' WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response":result}));
    });
});

//hapus data
app.delete('/api/users/:id',(req,res)=>{
    let sql = "DELETE FROM account_nyepeda WHERE user_id="+req.params.id;
    let query = conn.query(sql, (err,result) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response":result}));
    });
});


app.listen(3001,() => {
    console.log("MYSQL BERJALAN")
})