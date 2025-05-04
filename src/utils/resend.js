import { Resend } from 'resend';



const resendEmail = async(recipient,{subject,body,name}) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
        from: `${name} <onboarding@resend.dev>`,
        to:recipient,
        subject: subject,
        html:body,
    });

    if (error) {
        return console.error({ error });
    }

    console.log({ data });
};
export default resendEmail