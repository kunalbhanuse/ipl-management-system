const verifyEmailTemplate = (name, verificationLink) => {
  return `
    <html>
      <body style="font-family: Arial; background:#f4f4f4; padding:20px;">
        <div style="background:#fff; padding:20px; border-radius:8px;">
          
          <h2>IPL Management</h2>

          <p>Hi ${name},</p>

          <p>Please verify your email:</p>

          <a href="${verificationLink}" 
             style="background:#e63946;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">
             Verify Email
          </a>

          <p style="margin-top:20px;">Link expires in 5 minutes.</p>

        </div>
      </body>
    </html>
  `;
};

export default verifyEmailTemplate;
