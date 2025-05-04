import contactService from "../Services/contactService.js";
const createContact =async(req,res)=>{
  const data = req.body;
  
try {
    if(!data.name) return res.status(428).send("Name is required")
    if(!data.email) return res.status(428).send("Email is required")
    if(!data.subject) return res.status(428).send("Subject is required")
    if(!data.message) return res.status(428).send("Message is required")
    const contact = await contactService.createContact(data);
    res.json(contact);
} catch (error) {
    res.status(error.statusCode || 500).send(error.message)
}
}
export {createContact}