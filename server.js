const express = require("express"); // instancia o express
const nunjucks = require("nunjucks");
const routes = require("./routes");

const server = express(); //executa a funcao

//pra funcionar o req.body
server.use(express.urlencoded({ extended:true }));
//serve os arquivos estaticos da pasta public para o servidor
server.use(express.static("public"));
server.use(routes); //middleware routes

//configuracao da template engine
//motor de view njk
server.set("view engine", "njk");

//configuracao do nunjucks
nunjucks.configure("views", {
    express:server,
    noCache: true,
    autoescape: false
});

//inicializa o servidor
server.listen(5000, function(){
    console.log("server is running");
}) 