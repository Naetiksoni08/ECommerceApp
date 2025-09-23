const userexists = (res,message="User Already Exists",status=400)=>{
    return res.status(status).json({
     success:false,
     message:message,
    })
 }

 const success = (res, message="User created successfully", status=200) => {
    return res.status(status).json({
        success: true,
        message,
    });
}


 const error = (res,message="Internal Server Error",err,status=500)=>{
    return res.status(status).json({
        success:false,
        message:message,
        error:err
    })
 }


 module.exports= {
    userexists,
    success,
    error
 }