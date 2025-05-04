import Contact from "../models/Contact.js"
import resendEmail from "../utils/resend.js";

const createContact = async (data) => {
    await resendEmail(data.email,{
        subject:data.subject,
        body:data.message,
        name:data.name
    })
    return await Contact.create(data);
}

export default { createContact }