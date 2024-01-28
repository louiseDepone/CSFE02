const express = require("express");
const router = express.Router();

const usersController = require("../controllers/rolesController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/role', authenticateToken, usersController.Post.singleRole)
router.put('/role/:id', authenticateToken, usersController.Put.singleRole)
router.delete('/role/:id', authenticateToken, usersController.Delete.singleRole)
router.get('/role/:id', authenticateToken, usersController.Get.singleUser)

router.get('/roles', authenticateToken, usersController.Get.allUsers)


module.exports = router