let LocalStrategy  = require("passport-local").Strategy;
let bcrypt = require("bcrypt") ;
const User = require('../model/entities/users')
const { logger } = require('./logger');

 function initializePassport(passport,emailVerified,getUserById) {
    
   let authenticateUser = async (email,password,done)=>{
      
     const user =  await emailVerified(email) ;
      if (user == null ) {
          return done(null,false,{message :" No User found with this Email"})
      } 
      try {
          
        if(await bcrypt.compare(password,user.password)) {
            return done(null,user)
          }else{
            return done(null,false,{message :" Password is incorrect "})
          }

      } catch (error) {
         return done(error)
      }

   }

    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    passport.serializeUser((user,done)=>{ done(null,user.id) })
    passport.deserializeUser(async (id,done)=> { return done(null, await getUserById(id)) })

}


function auth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect("/login")
  }
}

function authAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role =="ADMIN") {
    return next()
  } else {
    res.redirect("/login")
  }
}


function authLogin(req, res, next) {
  if (req.isAuthenticated()) {
    if(req.user.role =="ADMIN"){
      res.redirect("/all")
    }else{
      res.redirect("/")
    }
  } else {
    // res.redirect("/login")
    return next()
  }

}


async function registerUser(req, res, next) {
  req.body = JSON.parse(JSON.stringify(req.body));
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      // console.log("user",user)
      if (user) {
        logger.warn('user already taken    ' + JSON.stringify(user));
        res.send('This user is already taken  -> ' + req.body.email );
      }
      else {

        User.create({
          name: req.body.name,
          email: req.body.email,
          username: req.body.email,
          password: hashedPassword,
          role : req.body.role || "CUSTOMER"
        })
          .then(function (user) {
            // res.send('user created'+ JSON.stringify(user));
            console.log('user created' + JSON.stringify(user));
            console.log('success');
            res.redirect("/login")
          })
          .catch(function (err) {
            // print the error details
            logger.error(err);
          });
      }
    })
      .catch(function (err) {
        logger.error(err);
        res.send(err);
      })
  } catch (error) {
    res.redirect("/register")
  }

}

module.exports = {initializePassport,authLogin,auth,registerUser,authAdmin} ;