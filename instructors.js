const fs = require("fs");
const data = require("./data.json");

//create
exports.post = function(req, res){
    //req.body para requisicoes do tipo post
    const keys = Object.keys(req.body);

    for (const key of keys) {
        //req.body.key == ""
        if(req.body[key] == ""){
            return res.send("Please, fill all fields!");
        }
    }
    //coloca o novo instrutor no array de instrutores
    data.instructos.push(req.body);

    //salva a alteracao localmente
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!");

        return res.redirect("/instructors");
    })
}