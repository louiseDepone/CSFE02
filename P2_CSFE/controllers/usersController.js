const bcrypt = require("bcrypt");
const {db} = require("../configs/database");

const User = {

    Get: {
        
        singleUser(req, res){
            let user_id = req.params.id;
        
            if (!user_id) {
                return res.status(400).send({error: true, message :'Please provide user_ID'});
            }
            try{
                db.query('SELECT users.id, users.name, users.username, roles.role_name FROM users JOIN roles ON users.role_id = roles.id WHERE users.id = ?;', user_id, (err, result) => {
                    
                    if(err){
                    console.error('erroe fetching items:', err);
                    res.status(500).json({ message: 'Internal server error'})
                  } else {
                    res.status(200).json(result);
                  }  
                });
        
            } catch (errror){
        
                console.error('Error loadng user:', error);
                res.status(500).json({error: 'interrnal server error'})
            }
        },

        allUsers (req, res) {

            try {
                db.query('SELECT users.id, users.name, roles.role_name FROM users JOIN roles ON users.role_id = roles.id',(err, result) => {
        
                    if(err) {
                        console.error('error fetching items:', err);
                        req.status(500).json({ error: 'Internal Server Error' });
                    }else{
                        res.status(200).json({result});
                    }
                });
        
            } catch (error) {
                console.error('Error loading users', error);
                res.status(200).json({ error: 'Internal Server Error' });
            }
        }
    },
    Put: { 
        
        async singleUser(req,  res){

            let user_id = req.params.id;
        
            const{name,username,password} = req.body;
            const hashedPassword = await bcrypt.hash(password,10);
        
            if (!user_id || !name || !username || !password) {
                return res.status(400).send({error: user,message:'please provide name,username and password'});
            } 
        
            try { 
                db.query('UPDATE users SET name = ?, username = ?, password = ? WHERE id = ?',[name, username, hashedPassword, user_id],(err,result, fields) => {
                if (err){
                    console.error('error updating:', err);
                    res.status(500).json({message:'internall server error'});
                }else {
                    res.status(200).json(result);
                }
            });
        
            } catch (error) {
                console.error('error loading user', error);
                res.status(500).json({ error: 'internnal server error' });
            }
        }
    },

    //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
            singleUser (req, res) {
    
            let user_id = req.params.id;
        
            
            if (!user_id) {
                return res.status(400).send({ error: true, message: 'pese provide user_id' });
            }
            
               try {
                    db.query('Select * from indicator where user_id = ?;', user_id, (err, result, fields) => {
            
                        if (err) {
                            console.error('error deleting items', err);
                            res.status(500).json({message: 'inetrnal server error'});
                        } else {
                            if(result.length == 0 ){
                                db.query('DELETE FROM users WHERE id = ?', user_id, (err, results, fields) => {
                    
                                if (err) {
                                    console.error('error deleting items', err);
                                    res.status(500).json({message: 'inetrnal server error'});
                                } else {
                                    res.status(200).json(results);
                                }});
                            }else{
                                res.status(200).json({message:"Cannot be deleted due to connection to other field"})
                            }
                    }
                    });
        
               }catch (error){
                console.error('error loadng user:', error);
                res.status(500).json({error: ' internal serever error'});
               }
        }
    },


    
}

module.exports = User