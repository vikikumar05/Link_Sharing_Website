const jwt = require('jsonwebtoken');
const Users = require('../model/Users');
const bcrypt = require('bcryptjs');

const secret = "9fbd60ec-764d-40f1-adf9-e318e807b024";

const authController = {
    // ------------------ LOGIN ------------------
    login: async (request, response) => {
        try {
            const { username, password } = request.body;
             console.log(username, password);
            // Find user by email (username)
            const data = await Users.findOne({ email: username });
            console.log(data);
            if (!data) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }
             console.log(data);

            // Compare hashed password
            const isMatch = await bcrypt.compare(password, data.password);
            if (!isMatch) {
                return response.status(401).json({ message: 'Invalid credentials' });
            }

            const user = {
                id: data._id,
                name: data.name,
                email: data.email
            };

            // Sign token
            const token = jwt.sign(user, secret, { expiresIn: '1h' });

            // Set cookie
            response.cookie('jwtToken', token, {
                httpOnly: true,
                secure: true,
                domain: 'localhost',
                path: '/'
            });

            response.json({ user: user, message: 'User authenticated' });

        } catch (error) {
            console.error('Login error:', error);
            response.status(500).json({ error: 'Internal server error' });
        }
    },

    // ------------------ LOGOUT ------------------
    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.status(200).json({ message: 'User is logged out' });
    },

    // ------------------ IS USER LOGGED IN ------------------
    isUserLoggedIn: (request, response) => {
        const token = request.cookies.jwtToken;
        if (!token) {
            return response.status(401).json({ message: 'User is not logged in' });
        }

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return response.status(401).json({ message: 'Invalid token' });
            } else {
                return response.status(200).json({ user: user, message: 'User is logged in' });
            }
        });
    }
};

module.exports = authController;


































// const jwt = require('jsonwebtoken');
// const Users = require('../model/Users');
// const bcrypt = require('bcryptjs'); // to hash the password

// const secret ="9fbd60ec-764d-40f1-adf9-e318e807b024";
// const authController={

//     //---------------------------------------login function to authenticate user
//     login: async (request, response) =>{

//         try {
//         const { username, password } = request.body;
   
//          const data= await Users.findOne({ email:username});
//          if(!data){
//             return response.status(401).json({ message: 'Invalid Credentials' });
//          }

//         const isMatch = await bcrypt.compare(password, data.paswword);

//         if(!isMatch){
//             return response.status(401).json({ message: 'Invalid Credentials' });
//         }
      
//         const user = {
//             id:data._id,
//             name:data.name,
//             email:data.email        
//         };
         
//         if( username === 'admin' && password === 'admin') {
//               const user={
//                 name:'john cena',
//                 email:'john@gmail.com'

//               };

//               const token = jwt.sign(user,secret,{expiresIn:'1h'})   // This function jet.sign ceates token by combining user data and secret key
//                response.cookie('jwtToken',token,{
//                 httpOnly: true,  // this means only server can read and write this cookie
//                 secure: true, // this means cookie will be sent only over HTTPS
//                 domain:'localhost', // specify the domain for the cookie
//                 path:'/' // specify the path for the cookie , who can access this cookies , '/' this means all the our react pages can access this path
//                });
//                response.status(200).json({user: user,message: 'User is Authenticated'});
//             }else{
//             response.status(401).json({ message: 'Invalid Credentials' });
//         }

//     }catch (error) {
//         console.error('Error during login:', error);    }
//     },



//    // --------------------------------------------------------------logout function to clear the cookie
//     logout: (request, response) => {
//         response.clearCookie('jwtToken');
//         response.status(200).json({ message: 'User is logged out' });
//     },



//     // --------------------------------------------------------------isUserLoggedIn function to check if user is logged in
//    // how to know user is logid in if in request in cookies if jwt token is present that means user is logged in
//     isUserLoggedIn: (request, response) => {
//            const token = request.cookies.jwtToken; // get the token from cookies
//            if(!token) {
//                return response.status(401).json({ message: 'User is not logged in' });
//            }

//            jwt.verify(token, secret, (err, user)=>{
//                  if(err){
//                     return response.status(401).json({ message: 'Invalid Token' });            
//                 }else{
//                     return response.status(200).json({ user: user, message: 'User is logged in' });
//                 }
//            });
           
//     },
        
// };
// module.exports = authController;