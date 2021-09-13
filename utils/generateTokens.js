import jwt from 'JsonWebToken'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRATE, {
        expiresIn: '30d'
    })
}

export default generateToken