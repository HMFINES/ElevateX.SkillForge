window.SKILLFORGE_CONFIG={
  contact:{
    email:'wakodeaharshal@gmail.com',
    phone:'+91 9209630283',
    founderName:'Harshal Panjabrao Wakode',
    social:{
      linkedin:'YOUR_LINKEDIN_PROFILE_URL',
      instagram:'YOUR_INSTAGRAM_PROFILE_URL',
      youtube:'YOUR_YOUTUBE_CHANNEL_URL',
      github:'YOUR_GITHUB_PROFILE_URL',
      twitter:'YOUR_TWITTER_PROFILE_URL',
    },
  },
  payment:{
    razorpayKey:'YOUR_RAZORPAY_KEY_ID',
    createOrderUrl:'YOUR_RAZORPAY_ORDER_API_URL',
    verifyPaymentUrl:'YOUR_RAZORPAY_VERIFY_API_URL',
    currency:'INR',
    companyName:'SkillForge AI',
    themeColor:'#4f8eff',
    allowDemoFallback:false,
  },
  auth:{
    emailOtp:{
      // Use 'auto' for production: email OTP becomes live only when both URLs below are configured.
      // Set 'demo' only for local testing.
      mode:'auto',
      sendUrl:'YOUR_EMAIL_OTP_SEND_API_URL',
      verifyUrl:'YOUR_EMAIL_OTP_VERIFY_API_URL',
      otpLength:6,
      otpTtlMs:300000,
    },
    // Public OAuth client IDs are safe to expose here. Keep secrets on your backend only.
    googleClientId:'903254076980-186v0f8nq71nf0g2pp6a362rh4hqm19g.apps.googleusercontent.com',
    githubClientId:'YOUR_GITHUB_CLIENT_ID',
    githubRedirectUri:'',
    githubExchangeUrl:'YOUR_GITHUB_EXCHANGE_API_URL',
    githubScope:'read:user user:email',
  },
};

/*
Expected backend contracts:

1. payment.createOrderUrl
POST JSON:
{
  "amount": 49900,
  "currency": "INR",
  "planName": "Pro Plan"
}

Return JSON:
{
  "orderId": "order_xxx",
  "amount": 49900,
  "currency": "INR",
  "name": "SkillForge AI",
  "description": "Pro Plan"
}

2. payment.verifyPaymentUrl
POST JSON:
{
  "planName": "Pro Plan",
  "amount": 49900,
  "currency": "INR",
  "orderId": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_order_id": "order_xxx",
  "razorpay_signature": "signature_xxx"
}

Return JSON:
{
  "paymentId": "pay_xxx",
  "message": "Payment verified"
}

3. auth.emailOtp.sendUrl
POST JSON:
{
  "mode": "signup",
  "name": "Harshal Wakode",
  "email": "you@example.com"
}

Return JSON:
{
  "requestId": "otp_req_xxx",
  "expiresIn": 300,
  "message": "Verification code sent"
}

4. auth.emailOtp.verifyUrl
POST JSON:
{
  "mode": "signup",
  "name": "Harshal Wakode",
  "email": "you@example.com",
  "otp": "123456",
  "requestId": "otp_req_xxx"
}

Return JSON:
{
  "message": "Account verified successfully",
  "user": {
    "id": "user_xxx",
    "name": "Harshal Wakode",
    "email": "you@example.com"
  }
}
*/
