const generateOtp = async ()=>{
    try {
        return {
            data:Math.round(Math.random()*9000),
            success:true,
            message:"Otp create successfully !",
            error:""
        }
    } catch (error) {
       console.error("Error generate otp",error) 
       return {
        data:null,
        message:"Error occured create otp",
        error:error.message || "Unknown error"
       }
    }
}

module.exports = generateOtp