const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");

const router = Router();
const zod = require('zod');
const { validateCredentials } = require("../Utility");

const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(8);
// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    let username = req.headers.username;
    let password = req.headers.password;

    let validation= validateCredentials(username,password);

    if (!validation.success)
        return res.status(403).json({ msg: validation.msg });

    let data = await Admin.findOne({ username });

    if (data != null) {
        return res.status(409).json({ msg: 'duplicate record found' });
    }

    const newAdmin = new Admin({ username: username, password: password });
    try {
        let data = await newAdmin.save();
        res.status(200).json({ data });
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: 'some error occured at server', err: JSON.stringify(err) })
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    console.log(req.body);

    const course = new Course(req.body);

    try{
        let data= await course.save();
        res.status(200).json({data});
    }catch(err){
        console.log(err);
        res.status(404).json({msg:'some error occured at server',err});
    }

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try{
        let data = await Course.find();
        res.status(200).json(data);
    }
    catch(err){
        res.status(401).json({msg:'some error occured at the server'});
    }

});



module.exports = router;