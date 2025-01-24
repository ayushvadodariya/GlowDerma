import { Router } from "express";
import {validateFeild,shoppingCart} from "../data/store.js"

const router = Router();

router.get("/", (req, res)=>{
    return res.status(200).json(shoppingCart);
})

router.post("/", (req, res)=>{
    try{

        console.log(req.body);
        const requireFeild = ["id", "name", "price", "qty"];
        const missingFeild = validateFeild(requireFeild, req.body);

        if(missingFeild.length>0) return res.json({message: `provide missing feild ${missingFeild}`});

        const { id, name, price, qty} = req.body;

        shoppingCart.push({
            id,
            name,
            price,
            qty
        });
        res.status(400).json({message: "item added succesfully"});
    }
    catch(error){
        return res.status(500).json({message: "Someting want wrong"});
    }
})

export default router;