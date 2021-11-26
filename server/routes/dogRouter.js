const express = require( 'express' );
const DogRouter = express.Router();
const {DogController} = require( '../controllers/dogController');


DogRouter
    .route( '/' )
    .get( DogController.loadIndex )
    .post( DogController.createDog );

DogRouter
    .get( '/dogs/new', DogController.loadNew );
    
DogRouter
    .post( '/dogs/destroy/:id', DogController.deleteDog );

DogRouter
    .get( '/dogs/edit/:id', DogController.editDog );

DogRouter
.route( '/dogs/:id' )
    .get( DogController.showDog )
    .post( DogController.updateDog );
            

module.exports = {DogRouter};

/*

// Update
app.post('/:id', function(req, res){
    Dog.update({ _id: req.params.id }, req.body, function(err, result){
    if (err) { console.log(err); }
    res.redirect('/');
    });
});

*/