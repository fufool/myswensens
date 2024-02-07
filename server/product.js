const conn = require('./database');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// require('dotenv').config();
const { SECRETKEY } = process.env;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where uploaded images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
  }
});

const upload = multer({ storage });

async function getAllProducts() {
    try {
            return new Promise((resolve, reject) => {
                const sql = 'SELECT * FROM products';
                conn.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
    } catch (error) {
        throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
    }
}

async function getProductById(id, token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);

            if (payload.role === 'admin') {
                return new Promise((resolve, reject) => {
                    const sql = 'SELECT * FROM products WHERE id = ?';
                    conn.query(sql,[id], (err, result) => {
                        if (err) {
                            reject(err);
                        } else if (result.length === 0) { 
                            reject(new Error('Product not found'));
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            }
        } catch (error) {
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
        }
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    }
}

async function addProducts(itemData, token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);

            if (payload.role == 'admin') {
                return new Promise((resolve, reject) => {
                const { name, price, category, description } = itemData;
                const image = itemData.file ? itemData.file.filename : null;
                    
                const sql = `INSERT INTO Products (nameProducts, priceProducts, imageProducts, category, descriptionProducts) VALUES (?, ?, ?, ?, ?)`;
                    conn.query(sql, [name, price, image, category, description], (err, result) => {
                        if (err) {
                            console.error('Error executing query:', err.message);
                            reject(err);
                        } else {
                            resolve(result.insertId);
                        }
                    });
                });
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            }
        } catch (error) {
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
        }
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    }
}

async function updateProducts(productId, itemData, token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);
            if (payload.role === 'admin') {
                const existingProduct = await getProductById(productId,token);
                if (!existingProduct) {
                    throw new Error('Product not found');
                }
                return new Promise((resolve, reject) => {
                const { name, price, images, category, description } = itemData;
                console.log("query data",name, price, images, category, description);
        
                const sql = `UPDATE Products SET nameProducts=?, priceProducts=?, imageProducts=?, category=?, descriptionProducts=? WHERE id=?`;
                conn.query(sql, [name, price, images, category, description, productId], (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err.message);
                        reject(err);
                    } else {
                        resolve(result.insertId);
                    }
                });
            });
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            }
        } catch (error) {
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
        }
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    }
}

async function deleteProducts(productId, token) {
    if (token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);
            const payload = jwt.decode(token);
    
            if (payload.role === 'admin') {
                const existingProduct = await getProductById(productId, token);
                if (!existingProduct) {
                    throw new Error('Product not found');
                }
                const query = `DELETE FROM Products WHERE id=?`;
                conn.query(query, [productId]);

                console.log('Product deleted successfully');
            } else {
                throw new Error('Unauthorized - ไม่สามารถเข้าถึงได้');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw new Error('Unauthorized - ไม่สามารถยืนยันสิทธิ์ได้');
        }
    } else {
        throw new Error('Unauthorized - ไม่มีสิทธ์เข้าถึงข้อมูล');
    }
}

module.exports = { getAllProducts, getProductById, addProducts, updateProducts, deleteProducts }