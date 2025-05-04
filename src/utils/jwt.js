import jwt from "jsonwebtoken";

const createToken =(data)=>{
    return jwt.sign(data,"$2y$10$bV.wbPGJrUmL91h8fwDuUu36");
}

const verifyToken=async(token)=>{
   return await new Promise((resolve,reject)=>{
        jwt.verify(token,"$2y$10$bV.wbPGJrUmL91h8fwDuUu36",(error,data)=>{
            if(error) return reject(error.message)
                resolve(data);
           })
    })
}

export {createToken,verifyToken}