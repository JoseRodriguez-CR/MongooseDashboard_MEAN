
const  {DogModel} = require( './../models/dogModel' );

const DogController = {
    loadIndex : function(request, response){
        DogModel.getDog()
        .then(result =>{
            //console.log(result[0].name); dogs ifo is getting correctly from DB
            response.render('index', { dogs: result });
        })
    },
    loadNew : function(request, response){
            response.render('new');
        
    },
    createDog : function(request, response){
        DogModel.createDog(request.body)
        .then (result => {
            request.session.name = result.name;
            request.session.weight = result.weight;
            request.session.color = result.color;
            response.redirect('/');
        })
        .catch( error=>{
            request.flash( 'dogError', 'Your input has an error or it is in blank!')
            response.redirect('/');
        });
    },
    deleteDog : function(request, response){
        let name = request.params._id
        
        DogModel
            .getDogById( name )
            .then( dog => {
                if( dog === null ){
                    throw new Error( "That dog doesn't exist" );
                }
                else{
                    DogModel
                        .deleteDogById( name )
                        .then( result => {
                            response.redirect('/');
                            console.log('Dog deleted');
                        });
                }
            })
            .catch( error => {
                request.flash( 'deletionError', 'Something went wrong!')
                response.redirect('/');
                //response.statusMessage = error.message;
                //response.status( 404 ).end();
            });
        /*
        DogModel.remove({ _id: request.params.id })
        .then( deleteDogById=>{

            response.redirect('/');
        })
        .catch( error=>{
            response.json(error);
        });*/
    },
    editDog :  function(request, response){
        let name = request.params._id
        console.log('Testing shown');
        DogModel
            .getDogById( name )
            .then( dog => {
                if( dog === null ){
                    throw new Error( "That dog doesn't exist" );
                }
                else{
                    DogModel
                        .getDogById( name )
                        .then( result => {
                            console.log(result);
                            response.render('edit', { dog });
                            console.log('Dog was shown on edit');
                        });
                }
            })
            .catch( error => {
                request.flash( 'deletionError', 'Something went wrong!')
                response.redirect('/');
            });
    },

    showDog : function(request, response){
    let name = request.params._id
    console.log('Testing shown');
    DogModel
        .getDogById( name )
        .then( dog => {
            if( dog === null ){
                throw new Error( "That dog doesn't exist" );
            }
            else{
                DogModel
                    .getDogById( name )
                    .then( result => {
                        console.log(result);
                        response.render('show', { dog });
                        console.log('Dog was shown');
                    });
            }
        })
        .catch( error => {
            request.flash( 'deletionError', 'Something went wrong!')
            response.redirect('/');
            //response.statusMessage = error.message;
            //response.status( 404 ).end();
        });

    },
    updateDog : function(request, response){
        let { name, weight, color } = request.body;
        //let name = request.params.name;

        let fieldsToUpdate = {}

        if( name ){
            fieldsToUpdate.name = name;
        }
        if( weight ){
            fieldsToUpdate.weight = weight;
        }
        if( color ){
            fieldsToUpdate.color = color;
        }
        if( Object.keys( fieldsToUpdate ).length === 0 ){
            response.statusMessage = "You need to provide at least one of the following fields to update the user ('name', 'weight', 'color')";
            response.redirect('/dogs/edit/:id');
        }
        DogModel
            .getDogById( name )
            .then( dog => {
                if( dog === null ){
                    throw new Error( "That user doesn't exist" );
                }
                else{
                    DogModel
                        .updateUser( name, fieldsToUpdate )
                        .then( result => {
                            response.redirect('/');
                        });
            }
        })
        .catch( error=>{
            request.flash( 'dogError', 'Your input has an error or it is in blank!')
            response.redirect('/dogs/edit/:id');
        });
    },

}

module.exports = {DogController};