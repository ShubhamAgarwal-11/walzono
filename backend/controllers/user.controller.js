const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const sendEmail = require('../config/mailer');
const emailTemplate = require("../emails/EmailForInquiry");
const emailTemplateForNotifyMe = require("../emails/EmailForNotifyMe");

exports.register = async(req,res)=>{
    try{
        const {name,email,password,phone} = req.body;

        if(!name || !email || !phone || !password){
            return res.status(401).json({
                success : false,
                message : "All Fields Are required {name , phone , email , password}."
            })
        }
        if(phone.length !== 10){
            return res.status(401).json({
                success : false,
                message : "Phone number must be 10 digits."
            })
        }
        const userExisted = await User.findOne({email});
        if(userExisted){
            return res.status(401).json({
                success : false,
                message : "User Already Exist...please login"
            })
        }
        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            phone,
            email,
            password : hashPassword
        })
        return res.status(201).json({
            success : true,
            message : "User Register Successfully",
            user : user
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error While register user."
        })
    }
}

exports.login = async(req,res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success : false,
                message : "All Fiends Are Required."
            })
        }

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(401).json({
                success : false,
                message : "User not exist....please create account"
            })
        } 
        const match = await bcrypt.compare(password , userExist.password)
        if(!match){
            return res.status(401).json({
                success : false,
                message : "incorrect password"
            })
        }
        const payload = {
            id : userExist._id,
            email : userExist.email
        }
        // console.log(payload);
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : "1d"});
        return res.status(200).cookie("token",token,{expiresIn : "1d"}).json({
            success : true,
            message : "Welcome Back Buddy!!",
            user : userExist
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Error While login user."
        })
    }
}

exports.logout = async(req,res)=>{
    return res.clearCookie("token").json({
        success : true,
        message : "logged out successfully"
    })
}

// exports.bookmark = async(req,res)=>{
//     try {
//         const currentUserId = req.body.id;
//         const tweetId = req.params.id;
//         const user = await User.findById(currentUserId);
//         // const tweet = await Tweet.findById(tweetId);
//         // && tweet.userDetails[0].bookmarks.includes(tweetId)
//         if(user.bookmarks.includes(tweetId) ){
//             // remove from bookmark.
//             const updatedUser = await User.findByIdAndUpdate({_id : currentUserId},{$pull:{bookmarks : tweetId}},{new : true})
//             // await Tweet.findByIdAndUpdate({_id : tweetId},{userDetails : updatedUser});
//             return res.status(200).json({
//                 success : true,
//                 message : "Tweet Remove from bookmark successfully.",
//                 user : updatedUser
//             })
//         }else{
//             // saved (bookmark the tweet)
//             const updatedUser = await User.findByIdAndUpdate({_id : currentUserId},{$push : {bookmarks : tweetId}},{new : true})
//             // await Tweet.findByIdAndUpdate({_id : tweetId},{userDetails : updatedUser});
//             return res.status(200).json({
//                 success : true,
//                 message : "Tweet Saved successfully.",
//                 user : updatedUser
//             })
//         }
        
//     } catch (error) {
//         return res.status(500).json({
//             success : false,
//             message : "Error while bookmark the tweet.",
//             error : error.message
//         })
//     }
// }

// exports.getProfile = async(req,res)=>{
//     try {
//         const id = req.params.id;
//         const user = await User.findById(id).select('-password');
//         return res.status(200).json({
//             success : true,
//             user : user
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success : false,
//             message : "Error while access the user profile.",
//             error : error.message
//         })
//     }
// }

// exports.getAllOtherUsers = async(req,res)=>{
//     try {
//         const id = req.params.id;
//         const allUsers = await User.find({_id : {$ne : id}}).select('-password')
        
//         return res.status(200).json({
//             success : true,
//             users : allUsers
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success : false,
//             message : "Error while access other users.",
//             error : error.message
//         })
//     }
// }

// exports.follow = async(req,res)=>{
//     try {
//         const currentUserId = req.body.id;
//         const targetUserId = req.params.id;
//         const currentUser = await User.findById({_id : currentUserId});
//         const targetUser = await User.findById({_id : targetUserId});
//         if(!currentUser.following.includes(targetUserId)){
//             await currentUser.updateOne({$push : {following : targetUserId}});
//             await targetUser.updateOne({$push : {followers : currentUserId}});
//         }else{
//             return res.status(400).json({
//                 success : false,
//                 message : `${currentUser.name} Already follow ${targetUser.name}`
//             })
//         }
//         return res.status(200).json({
//             success : true,
//             message : `${currentUser.name} Just Follow to ${targetUser.name}`
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success : false,
//             message : "Error while follow user",
//             error : error.message
//         })
//     }
// }
// exports.unFollow = async(req,res)=>{
//     try {
//         const currentUserId = req.body.id;
//         const targetUserId = req.params.id;
//         const currentUser = await User.findById({_id : currentUserId});
//         const targetUser = await User.findById({_id : targetUserId});
//         if(currentUser.following.includes(targetUserId)){
//             await currentUser.updateOne({$pull : {following : targetUserId}});
//             await targetUser.updateOne({$pull : {followers : currentUserId}});
//         }else{
//             return res.status(400).json({
//                 success : false,
//                 message : `${currentUser.name} dosen't follow ${targetUser.name}`
//             })
//         }
//         return res.status(200).json({
//             success : true,
//             message : `${currentUser.name} Just Unfollow to ${targetUser.name}`
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             success : false,
//             message : "Error while follow user",
//             error : error.message
//         })
//     }
// }
exports.sendEmail = async(req,res)=>{
    const { to, name } = req.body;
    try {
        // const emailHtml = render(CustomTemplate({name}));
        // console.log(resend.emails)
        // const emailHtml = render(<CustomTemplate name={name} />);
        // const emailHtml = render(React.createElement(CustomTemplate, { name })); // ✅ Fix JSX issue

        // console.log(to, name);

        const emailResponse = await resend.emails.send({
            from: "walzonowithus@gmail.com", 
            to,
            subject : "Welcome to Walzono!",
            html : <div><h1>Hello {name}</h1><p>Welcome to our platform! We're excited to have you.</p></div>
          });
      
          res.json({ success: true, message: "Email sent", data: emailResponse });
    }catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }

}


exports.send = async (req, res) => {
    const { email, name, message } = req.body;

  if (!email || !name || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const htmlContent = emailTemplate(name, message);

  try {
    await sendEmail(email, "Welcome to Our Platform", htmlContent);
    res.status(200).json({ success: "Email sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
};

exports.contactUs = async (req, res) => {
    const {name , email, subject, message} = req.body;

    if(!name || !email || !subject || !message){
        return res.status(400).json({
            success : false,
            message : "All fields are required."
        })
    }

    try {
            const htmlContent = emailTemplate(name , email , subject , message);
            try {
                await sendEmail('shubham2002jindal@gmail.com', "Email for Inquiry Form Walzono", htmlContent);
                // res.status(200).json({ success: "Email sent successfully" });
            } catch (error) {
                return res.status(500).json({ 
                    success: false,
                    error: "Failed to send email"
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Message Send.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error."
            })
        }
}


exports.notifyMe = async (req, res) => {
    const {email} = req.body;

    if(!email){
        return res.status(400).json({
            success : false,
            message : "Email required."
        })
    }

    try {
            const htmlContent = emailTemplateForNotifyMe(email);
            try {
                await sendEmail('shubham2002jindal@gmail.com', "Email for Notify Me Form Walzono", htmlContent);
                // res.status(200).json({ success: "Email sent successfully" });
            } catch (error) {
                return res.status(500).json({ 
                    success: false,
                    error: "Failed to send email"
                });
            }
    
            return res.status(200).json({
                success: true,
                message: "Thank you we will Notify you.",
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error."
            })
        }
}
