const nodemailer = require("nodemailer");

const sendEmail = async (params) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    let emailContent = {
        from: `"${process.env.SMTP_FROM}" <${process.env.SMTP_USERNAME}>`,
        subject: params?.subject,
        html: params?.content,
        "text": `To authenticate, please use the following One Time Password (OTP):
                ${params.otp}
                Don't share this OTP with anyone. Our customer service team will never ask you for your password, OTP, credit card, or banking info.
                We hope to see you again soon`
    };

    if(params?.email) {
        emailContent.to = params?.email;
    }

    if (params?.bcc) {
        if (Array.isArray(params.bcc)) {
            emailContent.bcc = params.bcc.join(", ");
        } else {
            emailContent.bcc = params.bcc;
        }
    }

    if (params?.cc) {
        if (Array.isArray(params.cc)) {
            emailContent.cc = params.cc.join(", ");
        } else {
            emailContent.cc = params.cc;
        }
    }

    try {
        await transporter.sendMail(emailContent);
        return { success: true, error: "", message: "Email sent successfully." };
    } catch (error) {
        console.log("Error send email",error)
        return { success: true, error: `Error: ${error}`, message: "" };
    }
}

module.exports = sendEmail