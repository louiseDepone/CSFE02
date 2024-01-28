const express = require("express");
const router = express.Router();

const indicatorsController = require("../controllers/indicatorsController");
const {authenticateToken} = require('../middlewares/authMiddleware');

router.post('/indicator', authenticateToken, indicatorsController.Post.singleindicator)
router.put('/indicator/:id', authenticateToken, indicatorsController.Put.singleindicator)
router.delete('/indicator/:id', authenticateToken, indicatorsController.Delete.singleindicator)
router.get('/indicator/:id', authenticateToken, indicatorsController.Get.singleindicator)

router.get('/indicators', authenticateToken, indicatorsController.Get.allindicators)


module.exports = router