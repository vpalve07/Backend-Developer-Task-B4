const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    'video Url': {
        type: String,
        required: true
    },
    pdf: String,
    quiz: String,
    topics: [String],
    duration: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    approved:{
        type:String,
        enum:['yes','no'],
        default:"no"
    }
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)