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
            res.json(obj.item)
        }
    })

});


//GET by ID
router.get('/:itemId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            var id = `${req.params.itemId}`

            //Affichage du JSON
            res.json(obj.item[id])
        }
    })
});


//DELETE
router.delete('/:itemId', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            let obj = JSON.parse(data);

            //Enregistrement de l'id passé dans l'URL pour pouvoir l'utiliser dans la recherche JSON
            let id = `${req.params.itemId}`

            //Suppression du JSON
            delete obj.item[id]

            //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.item)
        }
    })
});


//PUT
router.put('/', (req, res) => {
    let updateItemName = req.body.name
    let updateItemPrice = req.body.price
    let updateItemId = req.body.id
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //On créé le nouveau user a ajouter en suivant le model du JSON qui contient tout
            var updateItem = {
                "name" : updateItemName,
                "price" : updateItemPrice
            }

            //On ajoute l'utilisateur
            obj.item[updateItemId] = updateItem;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.item)
        }
    })
})


//POST
router.post('/', (req, res) => {
    let newitemName = req.body.name
    let newitemPrice = req.body.price
    
    fs.readFile('data.json', 'utf8', (err, data) => {
        if(err){
            console.error(err);
        }else{
            //On parse le JSON obtenu pour pouvoir l'utiliser
            obj = JSON.parse(data);

            //Init de l'id de l'user à créer
            var newitemId = 0;

            //Variables du while
            let end = false
            let i = 0;


            while(end == false){

                //Si l'emplacement dans la liste est dispo
                if(obj.list[i] == null){
                    newitemId = i
                    end = true
                }
                
                //Sinon
                else{
                    i++
                }
            }

            //On créé le nouveau item a ajouter en suivant le model du JSON qui contient tout
            var newitem = {
                "name" : newitemName,
                "price" : newitemPrice
            }

            //On ajoute l'utilisateur
            obj.item[newitemId] = newitem;

            // //JSON to String
            obj = JSON.stringify(obj, null, 4);

            //On écrit sur le fichier
            fs.writeFile('data.json', obj, 'utf8');

            //String to JSON
            obj = JSON.parse(obj)

            //Affichage du JSON
            res.json(obj.tem)
        }
    })
})

module.exports = router;