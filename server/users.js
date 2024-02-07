const conn = require('./database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRETKEY } = process.env;

async function queryDatabase(query, values) {
    return new Promise((resolve, reject) => {
        conn.query(query, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

function getRandomUniqueInt(min, max, usedValues) {
    let randomInt;
    do {
        randomInt = Math.floor(Math.random() * (max - min) + min);
    } while (usedValues.has(randomInt));

    usedValues.add(randomInt);
    return randomInt;
}

async function registerUser(req, res) {
    const { firstname, lastname, phone_number, email, password, gender, birthday } = req.body;
    const selectEmail = 'SELECT COUNT(*) AS emailCnt FROM users WHERE email = ?';
    const selectPhone = 'SELECT COUNT(*) AS phoneCnt FROM users WHERE phone_number = ?';

    try {
        const [emailResult, phoneResult] = await Promise.all([
            queryDatabase(selectEmail, [email]),
            queryDatabase(selectPhone, [phone_number]),
        ]);

        if (emailResult[0].emailCnt > 0) {
            return res.status(400).json({ message: 'อีเมล์ถูกใช้งานแล้ว !' });
        }

        if (phoneResult[0].phoneCnt > 0) {
            return res.status(400).json({ message: 'เบอร์โทรศัพท์ถูกใช้งานแล้ว !' });
        }

        const usedValues = new Set();
        const userId = getRandomUniqueInt(100000, 999999, usedValues);

        const hashedPassword = await bcrypt.hash(password, 10);

        if (!userId || !firstname || !lastname || !phone_number || !email || !hashedPassword || !gender || !birthday) {
            return res.status(400).json({ message: 'กรุณากรอกข้อมูลผู้ใช้งานให้ครบถ้วน !!' });
        }

        const sql =
            'INSERT INTO users (`id`, `firstname`, `lastname`, `phone_number`, `email`, `password`, `gender`, `birthday`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        conn.execute(
            sql,
            [userId, firstname, lastname, phone_number, email, hashedPassword, gender, birthday],
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).json({ message: 'อีเมล์ หรือรหัสผู้ใช้งาน หรือเบอร์โทรศัพท์ ถูกใช้งานแล้ว !!' });
                    }
                    res.status(500).json({
                        message: err.message,
                    });
                    return;
                }
                res.status(201).json({
                    message: 'สมัครสมาชิกเสร็จเรียบร้อย !!',
                });
            }
        );
    } catch (error) {
        console.error('Error checking duplicate values:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getAllUsers(token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);
            if (payload.role === 'admin') {
                return new Promise((resolve, reject) => {
                    const sql = "SELECT * FROM users";
                    conn.query(sql, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            }
        } catch (error) {
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้!');
        }
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    }
}

async function getUserById(userId, token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);

            if (payload.role === 'admin') {
                return new Promise((resolve, reject) => {
                    const sql = "SELECT * FROM users WHERE id = ?";
                    conn.query(sql, [userId], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                });
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            };
        } catch (error) {
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
        };
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    };
};

async function authenticateUser(req, res) {
    const { email, password } = req.body;
    const secretKey = SECRETKEY;

    try {
        const sql = 'SELECT * FROM users WHERE email =?';
        const results = await queryDatabase(sql, [email]);

        if (results.length > 0) {
            const user = results[0];
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        phone: user.phone_number,
                        gender: user.gender,
                        role: user.role,
                    },
                    secretKey,
                    { expiresIn: '1h' }
                );

                res.status(200).json({
                    message: 'Login successful',
                    token,
                    id: user.id,
                    email: user.email,
                    firstName: user.firstname,
                    lastName: user.lastname,
                    phone: user.phone_number,
                    gender: user.gender,
                    role: user.role,
                });
            } else {
                res.status(401).json({ error: 'กรุณากรอกข้อมูลให้ถูกต้อง' });
            }
        } else {
            res.status(401).json({ error: 'กรุณากรอกข้อมูลให้ถูกต้อง' });
        }
    } catch (error) {
        console.error('Error executing MySQL query: ' + error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateUser(req, res) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);
            const checkId = String(payload.id);
            const { id } = req.params;
            if (payload.role === 'user' && id === checkId) {
                console.log(payload.role)
                const { firstname, lastname, password } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const sql = "UPDATE users SET `firstname` = ?, `lastname` = ?, `password` = ? WHERE id = ?";
                await queryDatabase(sql, [firstname, lastname, hashedPassword, id]);

                res.status(200).json({
                    message: "แก้ไขข้อมูลผู้ใช้งานสำเร็จ",
                });
            } else if (payload.role === 'admin') {
                const { firstname, lastname, phone_number, email, password, gender, birthday } = req.body;
                const hashedPassword = await bcrypt.hash(password, 10);

                const sql = "UPDATE users SET `firstname` = ?, `lastname` = ?, `phone_number` = ?, `email` = ?, `password` = ?, `gender` = ?, `birthday` = ? WHERE id = ?";
                await queryDatabase(sql, [firstname, lastname, phone_number, email, hashedPassword, gender, birthday, id]);

                res.status(200).json({
                    message: "แก้ไขข้อมูลผู้ใช้งานสำเร็จ",
                });
            }
             else {
                return res.status(400).json({
                    message: "ไม่มีสิทธิ์เข้าถึงข้อมูล, Not Admin",
                });
            };
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized',
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: "ไม่มีสิทธิ์เข้าถึงข้อมูล, Not Autherization",
        });
    }
}

async function deleteUser(req, res) {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);
            const checkId = String(payload.id);
            const { id } = req.params;

            if (payload.role === 'user' && id === checkId || payload.role === 'admin') {
                const sql = "DELETE FROM users WHERE id = ?";
                await queryDatabase(sql, [id]);

                res.status(200).json({
                    message: "ลบข้อมูลผู้ใช้งานสำเร็จ",
                });
            } else {
                return res.status(400).json({
                    message: "ไม่พบข้อมูล",
                });
            };
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized',
                error: error.message,
            });
        }
    } else {
        res.status(400).json({
            message: "ไม่มีสิทธิ์เข้าถึงข้อมูล, No have Authorization",
        });
    }
}

module.exports = { registerUser, getAllUsers, getUserById, authenticateUser, updateUser, deleteUser };