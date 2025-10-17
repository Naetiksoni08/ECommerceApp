const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const api = require("../utils/api");


const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;


const instance = new Razorpay({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
  });

  

router.post("/order",async (req,res)=>{
    try {
        const{amount,currency} = req.body;
        const options={
            amount:amount*100,
            currency:currency||"INR",
            receipt:"order_rcptid_11",
        }

        const order = await instance.orders.create(options);

        api.success(res,order);
        
    } catch (error) {
        api.error(res,error,"Something Went Wrong");
        
    }

})

module.exports = router;