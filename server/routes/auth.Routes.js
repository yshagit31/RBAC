import express from 'express';
 import {
    getAllUsers,
    createUser,
    getUserById,
    getloginInfo
 } from '../controllers/auth.controller.js'

 const router= express.Router();

 router.route('/').get(getAllUsers);
 router.route('/').post(createUser);
 router.route('/:id').get(getUserById);
 router.route('/val').post(getloginInfo);
 export default router;