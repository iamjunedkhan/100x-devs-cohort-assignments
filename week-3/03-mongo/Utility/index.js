const zod = require('zod');

const usernameSchema = zod.string().email();
const passSchema = zod.string().min(4);

 const  validateCredentials = (...params)=> {
    let username = params[0];
    let password = params[1];

    let validation = usernameSchema.safeParse(username);
    if(!validation.success){
        return {success:false,msg:'username is not valid'};
    }
    
    validation = passSchema.safeParse(password);
    if(!validation.success){
        return {success:false,msg:'password is not valid'};
    }
    return {success:true,msg:'all cred validated'};
}


module.exports ={
    validateCredentials
}