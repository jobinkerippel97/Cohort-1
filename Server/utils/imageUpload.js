const { cloudinaryInstance } = require("../config/cloudinaryConfig")

const handleImageUpload = async(path)=>{
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path)  //image is collecting from the path and save to the uploaResult//
            //console.log(uploadResult, "======uploadResult");
            return uploadResult.url
        //returning path and image url
    } catch (error) {
        console.log(error)
        next(error)
    }
}
module.exports = {handleImageUpload}