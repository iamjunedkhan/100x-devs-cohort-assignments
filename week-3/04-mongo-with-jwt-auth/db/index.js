const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://juned7734:MXTGktXVXahD8LLo@cluster0.6w5scpg.mongodb.net/course_selling_app');
// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    course_title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image_link: { type: String },
    published: { type: Boolean, default: true }
});

const purchaseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Refers to the 'User' model
        required: true
    },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',  // Refers to the 'Course' model
        required: true
    },
    purchase_date: {
        type: Date,
        default: Date.now
    },
    user_username:{
        type:String,
        required:true
    },
    amount_paid: {
        type: Number,
        required: true
    }
});


const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Purchase= mongoose.model('Purchase', purchaseSchema);

module.exports = {
    Admin,
    User,
    Course,
    Purchase
}