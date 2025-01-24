import express from "express";
import { rateLimit } from 'express-rate-limit'
import { engine} from "express-handlebars";

import {mainRouter, productRouter, ordersRouter, cartRouter, doctorRouter} from "./routes/index.js"
const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Sorry you have exhausted you plan",
});

app.engine('handlebars', engine());
app.set("view engine", "handlebars");

app.use(limiter)
app.use(express.json());
app.use("/assets",express.static('./public'));

app.use('/', mainRouter);
app.use('/doctors', doctorRouter)
app.use("/products", productRouter);
app.use("/orders", ordersRouter);
app.use('/cart', cartRouter);


// Handle undefined routes
app.use((req, res) => {
    return res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
