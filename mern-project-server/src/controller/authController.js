const jwt = require('jsonwebtoken');
const secret ="9fbd60ec-764d-40f1-adf9-e318e807b024";
const authController={

    //---------------------------------------login function to authenticate user
    login: (request, response) =>{
        const { username, password } = request.body;
        if( username === 'admin' && password === 'admin') {
              const user={
                name:'john cena',
                email:'john@gmail.com'

              };

              const token = jwt.sign(user,secret,{expiresIn:'1h'})   // This function jet.sign ceates token by combining user data and secret key
               response.cookie('jwtToken',token,{
                httpOnly: true,  // this means only server can read and write this cookie
                secure: true, // this means cookie will be sent only over HTTPS
                domain:'localhost', // specify the domain for the cookie
                path:'/' // specify the path for the cookie , who can access this cookies , '/' this means all the our react pages can access this path
               });
               response.status(200).json({user: user,message: 'User is Authenticated'});
            }else{
            response.status(401).json({ message: 'Invalid Credentials' });
        }
    },



   // --------------------------------------------------------------logout function to clear the cookie
    logout: (request, response) => {
        response.clearCookie('jwtToken');
        response.status(200).json({ message: 'User is logged out' });
    },



    // --------------------------------------------------------------isUserLoggedIn function to check if user is logged in
   // how to know user is logid in if in request in cookies if jwt token is present that means user is logged in
    isUserLoggedIn: (request, response) => {
           const token = request.cookies.jwtToken; // get the token from cookies
           if(!token) {
               return response.status(401).json({ message: 'User is not logged in' });
           }

           jwt.verify(token, secret, (err, user)=>{
                 if(err){
                    return response.status(401).json({ message: 'Invalid Token' });            
                }else{
                    return response.status(200).json({ user: user, message: 'User is logged in' });
                }
           });
           
    },
        
};
module.exports = authController;