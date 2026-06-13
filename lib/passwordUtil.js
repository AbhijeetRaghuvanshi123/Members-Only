import bcrypt from "bcryptjs";

const genPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}

const validPassword = async (password, password_hash) => {
    return await bcrypt.compare(password, password_hash);
}

export { genPassword, validPassword };