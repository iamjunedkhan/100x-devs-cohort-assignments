const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { validateCredentials } = require("../Utility");
const { User, Course, Purchase } = require("../db");
const { signJWT } = require("../JWT");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let username = req.headers.username;
    let password = req.headers.password;

    let validation= validateCredentials(username,password);

    if (!validation.success)
        return res.status(403).json({ msg: validation.msg });

    let data = await User.findOne({ username });

    if (data != null) {
        return res.status(409).json({ msg: 'duplicate record found' });
    }

    const newUser = new User({ username: username, password: password });
    try {
        let data = await newUser.save();
        let token = signJWT({username});
        res.status(200).json({ username,token });
    } catch (err) {
        console.log(err);
        res.status(404).json({ msg: 'some error occured at server', err:err.message })
    }
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try{
        let data= await Course.find();
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(404).json({msg:"some error occred at server",err});
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    let courseId = req.params.courseId;
    let username = req.headers.username;
    
    let userData= await User.findOne({username},{_id:1});
    let courseData= await Course.findOne({_id:courseId},{_id:1,price:1});

    let newPurchase = new Purchase({
        user_id:userData._id,
        course_id:courseData._id,
        amount_paid:courseData.price,
        user_username:username
    })

    try{
        let data = await newPurchase.save();
        res.status(200).json({msg:'course Purchased successfully',data})
    } catch(err){
        res.status(404).json({msg:'some error occured',err});
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    let username = req.headers.username;
    let purchasedData= await Purchase.find({user_username:username},{_id:0,course_id:1});
    let courseIds= purchasedData.map(ele=>{
        return ele.course_id;
    })
    let finalData = await Course.find({_id:{$in:courseIds}});
    res.status(200).json({msg:"purchasedCourse Request",finalData});

});

module.exports = router