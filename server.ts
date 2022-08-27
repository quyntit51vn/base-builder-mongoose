import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mainJob from "./src/services/cronjob/index";
import index from './src/routes/index';
import { connectMongoDb } from "./src/base/connection/mongo";
import { QueryBuilder } from "./src/repositories/queries/QueryBuilder";
import { IUser } from "./src/model/interface/IUser";
import mongoose from "mongoose";
import { IProduct } from "./src/model/interface/IProduct";
import UserModel from "./src/repositories/queries/UserModel";
import ProductModel from "./src/repositories/queries/Product";
// import User from "./src/model/user";


const app = express();
const PORT = process.env.PORT || 3009;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectMongoDb();
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app.use('/', index);

app.listen(PORT);

mainJob();


export default app;
