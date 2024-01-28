const {db} = require("../configs/database");
const  {decoding} = require('../services/jwt')

const Role = {
    Get:{
        singleUser(req, res){
            let role_id = req.params.id;
            user = decoding(req)
            console.log(user. userId)
            if (!role_id) {
                return res.status(400).send({error: true, message :'Please provide role id'});
            }
            try{
                db.query('select role_name, role_code FROM roles WHERE id = ?', role_id, (err, result) => {
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
                db.query('SELECT id, role_code, role_name FROM roles',(err, result) => {
        
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
    Post:{
        async singleRole(req,res){
            try{
                const {role_code, role_name} = req.body;;
        
                const queryInsert = 'INSERT INTO roles (role_code, role_name) VALUES (?, ?)'
                await db.promise().execute(queryInsert, [role_code, role_name])
        
                res.status(201).json({message: 'Role added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    },
    Put:{
        async singleRole(req, res){
            let role_id = req.params.id;
        
            const{role_code, role_name} = req.body;
        
            if (!role_code || !role_name) {
                return res.status(400).send({error: user,message:'please provide role_code and role_name'});
            } 
        
            try { 
                db.query('UPDATE roles SET role_code = ?, role_name = ? WHERE id = ?',[role_code, role_name, role_id],(err,result, fields) => {
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
        singleRole (req, res) {

        let role_id = req.params.id;
    
        if (!role_id) {
            return res.status(400).send({ error: true, message: 'pese provide user_id' });
        }
           try {
            db.query('Select * from users where role_id = ?;', role_id, (err, result, fields) => {
    
                if (err) {
                    console.error('error deleting items', err);
                    res.status(500).json({message: 'inetrnal server error'});
                } else {
                    if(result.length == 0 ){
                        db.query('DELETE FROM roles WHERE id = ?', role_id, (err, results, fields) => {
            
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

module.exports = Role