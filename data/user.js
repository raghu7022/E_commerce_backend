import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Raghu',
        email: 'raghu@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Sohail',
        email: 'sohail@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
]

export default users