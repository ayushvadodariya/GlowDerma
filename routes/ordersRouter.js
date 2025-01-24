import { Router } from "express";
import { orders} from '../data/store.js'

const router = Router();

router.get("/:orderId",(req,res)=>{
    try{
        let orderId = req.params.orderId;
        const order = orders[orderId-1];
        if(!order){
            return res.status(404).json({
                message: "order not found"
            });
        }
        return res.json(order);
    }    
    catch(error){
        return res.status(500).json({message: "Someting want wrong"});
    }    
});

export default router;