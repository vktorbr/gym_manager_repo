const fs = require("fs");
const data = require("./data.json");
const { age, date } = require("./utils");

//index
exports.index = function(req, res){
    return res.render("instructors/index", { instructors: data.instructors });
}

//show
exports.show = function(req, res){
    //req.params
    const { id } = req.params;
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    })

    if(!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundInstructor.created_at)
    }

    return res.render("instructors/show", {instructor});
}

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

    //desestruturacao 
    let {avatar_url, birth, gender, services, name} = req.body;

    birth = Date.parse(birth);
    const created_at = Date.now();
    const id = data.instructors.length + 1;

    //coloca o novo instrutor no array de instrutores
    data.instructors.push({
        id,
        avatar_url,
        birth,
        created_at,
        gender,
        services,
        name
    });

    //salva a alteracao localmente
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write file error!");

        return res.redirect("/instructors");
    })
}

//edit
exports.edit = function(req, res){
    const { id } = req.params;
    
    const foundInstructor = data.instructors.find(function(instructor){
        return instructor.id == id;
    })

    if(!foundInstructor) return res.send("Instructor not found!");

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth),
    }

    return res.render("instructors/edit", { instructor });
}

//put
exports.put = function(req, res){
    const { id } = req.body;

    let index = 0;

    const foundInstructor = data.instructors.find(function(instructor, foundIndex){
        if(id == instructor.id){
            index = foundIndex;
            return true;
        }
    })

    if(!foundInstructor) return res.send("Instrutor não encontrado!");

    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(id),
    }

    data.instructors[index] = instructor;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Write error!");

        return res.redirect(`/instructors/${id}`);
    })
}

//delete
exports.delete = function(req, res){
    const { id } = req.body;

    const filteredInstructors = data.instructors.filter(function(instructor){
        return id != instructor.id;
    })
    
    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2),function(err){
        if(err) return res.send("Write error!");
        return res.redirect("/instructors");
    })
}