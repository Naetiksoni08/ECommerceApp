 const success = (res, message="User created successfully", status=200) => {
    return res.status(status).json({
        success: true,
        message,
    });
}


const usererror = (res,message="Username or Password is Incorrect",status=401)=>{
    return res.status(status).json({
        success:false,
        message:message
    })
}

 const error = (res,message="Internal Server Error",err,status=500)=>{
    return res.status(status).json({
        success:false,
        message:message,
        error:err
    })
 }


 module.exports ={
    success,
    usererror,
    error

 }