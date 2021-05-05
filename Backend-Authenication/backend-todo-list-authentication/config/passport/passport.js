const passport =require('passport')
const {Strategy, ExtractJwt} = require('passport-jwt');
const db = require('../../models')
//passport ทำหน้าที่สร้างโครงสร้าง token เช่น วันหมดอายุ
const option={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET_OR_KEY
};

//JWTStrategy เป็นตัวดึง payload มาให้เราด้วย
//ไว้เช็ค token ที่เข้ามาเป็นของจริงรึป่าว ถ้าจริงก็ไปดึง todolistมาใช้ต่อได้
const JWTStrategy = new Strategy(option, async (payload,done)=>{
    const targetUser = await db.User.findOne({where:{ id: payload.id}})
    if(targetUser){
        done(null, targetUser)
    }else{
        done(null,false);   
    }
})
passport.use("jwt",JWTStrategy);