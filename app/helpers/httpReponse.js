
class httpResponse {
    constructor(status,success,error,message,data){
      this.status = status?status:200
      this.data = data
      this.message = message
      this.error = error
      this.success = success
  
  return {
    status:status?status:200,
    success:success?success:false,
    error:error?error:"",
    message :message?message:"",
    data:data?data:[]
  }
        
    }
  }

  module.exports = {
    httpResponse
  }