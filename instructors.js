const fs = require("fs");

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

    fs.writeFile("data.js", JSON.stringify(req.body), function(err){
        if(err) return res.send("Write file error!");

        return res.redirect("/instructors");
    })
}