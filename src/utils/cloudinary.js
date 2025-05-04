import { v2 as cloudinary } from 'cloudinary';
const uploadImage = async (file) => {
   return await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream("uploadfile", (error, data) => {
            if (error) return reject(error);
            resolve(data);
        }).end(file.buffer)
    })
}

export default uploadImage;