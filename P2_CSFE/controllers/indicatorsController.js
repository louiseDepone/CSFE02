const {db} = require("../configs/database");
const {decoding} = require ("../services/jwt")

const Indicator = {
    Get:{
        singleindicator(req, res){
            let indicator_id = req.params.id;
        
        
            if (!indicator_id) {
                return res.status(400).send({error: true, message :'Please provide indicator id'});
            }
            try{
                db.query('SELECT id, description, user_id, evaluation_id FROM indicator WHERE id = ?', indicator_id, (err, result) => {
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

        allindicators (req, res) {
            try {
                db.query('SELECT id, description, user_id, evaluation_id FROM indicator',(err, result) => {
        
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
        async singleindicator(req,res){
            
            token = decoding(req).userId
            try{
                const {description,evaluation_id} = req.body;

                console.log([description, token,evaluation_id])
        
                const queryInsert = 'INSERT INTO indicator (description, user_id,evaluation_id) VALUES (?,?,?)'
                await db.promise().execute(queryInsert, [description, token,evaluation_id])
        
                res.status(201).json({message: 'Indicator added successfuly'})
            } catch (error){
                 console.error("ERROR!!: ", error)
                 res.status(500).json({error: "internal server error"})
            }
        }
    },
    Put:{
        async singleindicator(req, res){
            let indicator_id = req.params.id;

            const {description,evaluation_id} = req.body;
            token = decoding(req).userId

            if (!description || !evaluation_id) {
                return res.status(400).send({error: user,message:'please provide role_code and role_name'});
            } 
        
            try { 
                db.query('UPDATE indicator SET description = ?, evaluation_id = ?, user_id =? WHERE id = ?',[description,evaluation_id, token,indicator_id],(err,result, fields) => {
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

    // //This up for change to update and setting the isDeleted column to True or 1.  
    Delete: {
        singleindicator (req, res) {

        let indicator_id = req.params.id;
    
        if (!indicator_id) {
            return res.status(400).send({ error: true, message: 'pese provide indicator_id' });
        }
           try {
            db.query('DELETE FROM indicator WHERE id = ?', indicator_id, (err, result, fields) => {
    
                if (err) {
                    console.error('error deleting items', err);
                    res.status(500).json({message: 'inetrnal server error'});
                } else {
                    res.status(200).json(result);
            }
        });
    
           }catch (error){
            console.error('error loadng user:', error);
            res.status(500).json({error: ' internal serever error'});
           }
        }
    },
}

module.exports = Indicator