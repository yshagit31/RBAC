import express from 'express';
 import {
    getAllUsers,
    createUser,
    getUserById,
    updateUserRole,
    deleteUser,
   //  createGoogleUser
 } from '../controllers/user.controller.js'

 const router= express.Router();

 router.route('/').get(getAllUsers);
 router.route('/').post(createUser);
//  router.route('/google').post(createGoogleUser);
 router.route('/:id').get(getUserById);
 router.route('/:id').patch(updateUserRole);
 router.route('/:id').delete(deleteUser);

 export default router;