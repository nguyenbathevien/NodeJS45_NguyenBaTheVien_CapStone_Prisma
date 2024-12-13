import express from "express";
import rootRouter from "./src/routers/root.router.js";
import { handleError } from "./src/common/helpers/error.helper.js";

const app = express();
app.get(`/`,(req,res,next) => { 
    res.json("Oke")
 })
app.use(express.json());


app.use(rootRouter)
app.use(handleError)

const PORT = 3069;
app.listen(PORT, () => {
   console.log(`Server online at port ${PORT}`);
});