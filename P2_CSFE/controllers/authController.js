const bcrypt = require("bcrypt");
const {db} = require("../configs/database");
const {jsonwebtoken} = require('../middlewares/authMiddleware');

const  authentication = {

    async register(req,res){
        const {name, username, password, role_id} = req.body;
        try{
            const hashPass = await bcrypt.hash(password, 10);
    
            const queryInsert = 'INSERT INTO users (name, username, password, role_id) VALUES (?, ?, ?, ?)'
            await db.promise().execute(queryInsert, [name, username, hashPass, role_id])
    
            res.status(201).json({message: 'User registered successfuly'})
        } catch (error){
             console.error("ERROR!!: ", error)
             if(error.code === 'ER_DUP_ENTRY'){
                res.status(500).json({message: `${username} is already existing`})
             }
            //  res.status(500).json({error: "internal server error"})
        }
    },

    async login(req, res){
    
        try {
            const{username, password} = req.body;
    
            const getUserQuery = 'SELECT * FROM users WHERE username = ?';
            const[rows] = await db.promise().execute(getUserQuery,[username]);
    
            if ( rows.length === 0) {
                return res.status(404).json({ error: 'Invalid username or password'});
            }
            
        const user = rows[0];
        const passwordMatch = await bcrypt.compare( password, user.password);
    
        if(!passwordMatch) {
            return res.status(404).json({ error: 'invalid username or password'});
        }
        const token = jsonwebtoken.sign({ userId: user.id, username: username}, process.env.SECRETKEY, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (error) {
        console.error('error logging in', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    }
}



module.exports = authentication