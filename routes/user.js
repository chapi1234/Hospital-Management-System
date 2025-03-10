const router = require('express').Router();
const userController = require('../controllers/userController')

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser)

module.exports = router