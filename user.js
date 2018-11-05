const express = require('express');
const router = express.Router();
const fs = require('fs')


//GET
router.get('/', (req, res) => {

    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Affichage du JSON
            res.json(obj.user)
        }
    })

});


//GET by ID
router.get('/:userId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            var id = `${req.params.userId}`

            //Affichage du JSON
            res.json(obj.user[id])
        }
    })
});


//DELETE
router.delete('/:userId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            let obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            let id = `${req.params.userId}`

            //Suppression du JSON
            delete obj.user[id]

            //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.user)
        }
    })
});


//POST
router.post('/', (req, res) => {
    let newUserName = req.body.name
    let newUserAge = req.body.age
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Init de l'id de l'user à créer
            var newUserId = 0;

            //Variables du while
            let end = false
            let i = 0;


            while(end == false){

                //Si l'emplacement dans la liste est dispo
                if(obj.list[i] == null){
                    newUserId = i
                    end = true
                }
                
                //Sinon
                else{
                    i++
                }
            }

            //On créé le nouveau user a ajouter en suivant le model du JSON qui contient tout
            var newUser = {
                "name" : newUserName,
                "age" : newUserAge
            }

            //On ajoute l'utilisateur
            obj.user[newUserId] = newUser;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.user)
        }
    })
})


//PUT
router.put('/', (req, res) => {
    let updateUserName = req.body.name
    let updateUserAge = req.body.age
    let updateUserId = req.body.id
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //On créé le nouveau user a ajouter en suivant le model du JSON qui contient tout
            var updateUser = {
                "name" : updateUserName,
                "age" : updateUserAge
            }

            //On ajoute l'utilisateur
            obj.user[updateUserId] = updateUser;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj)
        }
    })
})

module.exports = router;