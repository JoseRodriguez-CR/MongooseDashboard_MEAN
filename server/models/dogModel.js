const mongoose = require( 'mongoose' );



// Create dog schema and attach it as a model to our database
const DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    weight: {
        type: Number
    },
    color: {
        type: String,
        required: true
    }
});

const Dog = mongoose.model('Dog', DogSchema);

const DogModel = {
    createDog : function ( newDog ){
        return Dog.create( newDog );
    },
    getDog : function(){
        return Dog.find();
    },
    getDogById : function( userName ){
        return Dog.findOne({ userName });
    },
    deleteDogById : function( _id ){
        return Dog.deleteOne( {_id} );
    },
    updateUser : function( dogName, dogToUpdate ){
        return Dog.findOneAndUpdate( {dogName}, {$set : dogToUpdate }, {new : true} )
    }

};


module.exports = {DogModel};
