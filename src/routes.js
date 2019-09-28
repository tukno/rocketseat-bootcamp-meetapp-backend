import { Router } from 'express';
import multer from 'multer';

// Middlewares
import authMiddleware from './app/middlewares/auth';

// Validation middleware
import schemaValidator from './app/middlewares/schemaValidator';

// Validation schemas
import UserSchema from './app/validations/UserSchema';
import SessionSchema from './app/validations/SessionSchema';
import FileSchema from './app/validations/FileSchema';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

// Multer (file upload configuration)
import multerConfig from './config/multer';

// file upload middleware
const upload = multer(multerConfig);

const routes = new Router();

// ROUTES CONFIGURATION

// Create (register) user
routes.post(
  '/users',
  schemaValidator(UserSchema.store, 'body'),
  UserController.store
);

// Create user session (generates JWT Token)
routes.post(
  '/sessions',
  schemaValidator(SessionSchema.store, 'body'),
  SessionController.store
);

// Middleware to verify if user is authenticated
routes.use(authMiddleware);

// Update user information
routes.put(
  '/users',
  schemaValidator(UserSchema.update, 'body'),
  UserController.update
);

// File upload
routes.post(
  '/files',
  upload.single('file'),
  schemaValidator(FileSchema.store, 'file'),
  FileController.store
);

export default routes;
