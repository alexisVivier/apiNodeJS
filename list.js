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
            res.json(obj.list)
        }
    })

});


//GET by ID
router.get('/:listId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            var id = `${req.params.listId}`

            //Affichage du JSON
            res.json(obj.list[id])
        }
    })
});


//DELETE
router.delete('/:listId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            let obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            let id = `${req.params.listId}`

            //Suppression du JSON
            delete obj.list[id]

            //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.list)
        }
    })
});


//POST
router.post('/', (req, res) => {
    let updateListName = req.body.name
    let updateListUser = req.body.user
    let newListItem = req.body.item
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Init de l'id de la liste
            let newListId = 0;

            //Variables du while
            let end = false
            let i = 0;


            while(end == false){

                //Si l'emplacement dans la liste est dispo
                if(obj.list[i] == null){
                    newListId = i
                    end = true
                }
                
                //Sinon
                else{
                    i++
                }
            }

            // On créé le nouveau user a ajouter en suivant le model du JSON qui contient tout
            var newList = {
                "name" : updateListName,
                "user" : updateListUser,
                "item" : newListItem
            }

            //On ajoute l'utilisateur
            obj.list[newListId] = newList;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.list)
        }
    })
})


//PUT
router.put('/', (req, res) => {
    let updateListName = req.body.name
    let updateListUser = req.body.user
    let updateListItem = req.body.item
    let updateListId = req.body.id
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            // On créé le nouveau user a ajouter en suivant le model du JSON qui contient tout
            var updateList = {
                "name" : updateListName,
                "user" : updateListUser,
                "item" : updateListItem
            }

            //On ajoute l'utilisateur
            obj.list[updateListId] = updateList;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.list)
        }
    })
})

module.exports = router;