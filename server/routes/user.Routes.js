import express from 'express';
 import {
    getAllUsers,
    createUser,
    getUserById,
    updateUserRole
 } from '../controllers/user.controller.js'

 const router= express.Router();

 router.route('/').get(getAllUsers);
 router.route('/').post(createUser);
 router.route('/:id').get(getUserById);
 router.route('/:id').patch(updateUserRole);

 export default router;