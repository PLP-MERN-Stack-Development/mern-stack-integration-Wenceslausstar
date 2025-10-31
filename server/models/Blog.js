import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        min: 3
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema)