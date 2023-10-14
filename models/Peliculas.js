const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    "title": {
        type: String,
        required: true,
        trim: true
    },
    "releaseYear": {
        type: Number,
        required: true
    },
    "genre": {
        type: String,
        required: true,
        trim: true
    },
    "director": {
        type: String,
        required: true,
        trim: true
    },
    "actors": {
        type: [String],
        required: true,
        trim: true
    },
    "plot": {
        type: String,
        required: true,
        trim: true

    },
    "rating": {
        type: Number,
        required: true,
        trim: true
    }
},
{
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('movies', movieSchema);

