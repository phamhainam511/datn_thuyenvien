import db from '../models/index';
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.user.findAll({
                raw: false, 
                include: [
                    {
                        model: db.phanquyen, 
                        as: 'phanquyen', 
                        attributes: ['tenphanquyen'] 
                    }
                ]
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    });
};


module.exports = {
    getAllUser : getAllUser,
}