import { PASSWORD_REGEX } from "../constants/regex.js";
import formatterUserData from "../helpers/formatter.js";
import authServices from "../Services/authServices.js";
import { createToken } from "../utils/jwt.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email && !password) return res.status(428).send("Email and Password is required.")
        if (!email) return res.status(428).send("Email is required.")
        if (!password) return res.status(428).send("Password is required.")
        const user = await authServices.login({ email, password });
        const formatterData = formatterUserData(user);
        const token = createToken(formatterData);
        res.cookie("authToken", token);


        res.json(formatterData);
    } catch (error) {
        res.status(500).send(error.message);
    }

}
const register = async (req, res) => {
    const { name, email, password, phone, confirmPassword } = req.body;
    try {
        if (!email && !password && !name && !phone) return res.status(428).send("All input fields is required.")
        if (!email) return res.status(428).send("Email is required.")
        if (!password) return res.status(428).send("Password is required.")
        if (!name) return res.status(428).send("Name is required.")
        if (!confirmPassword) return res.status(428).send("ConfirmPassword is required.")
        if (password != confirmPassword) return res.status(500).send("Password do not match.")
        if (!PASSWORD_REGEX.test(password)) return res.status(500).send("Password must be contain uppercase lowercase number and special character.")

        const user = await authServices.register(req.body);

        const formatterData = formatterUserData(user);

        res.json(formatterData);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export { login, register }