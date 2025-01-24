import { Router } from "express";
import { products} from '../data/store.js'

const router = Router();

router.get("/", (req, res) => {
    const queryParams = req.query;
    if(queryParams.name && queryParams.maxPrice) {
        const product = products.filter((product) => product["name"] === queryParams.name && product.price <= parseInt(queryParams.maxPrice));
        return res.status(200).json({product: product});
    }
    if(queryParams.name) {
        const product = products.filter((product) => product["name"] === queryParams.name);
        return res.status(200).json({products: product});
    }
    if(queryParams.maxPrice) {
        const product = products.filter((product) => product.price <= parseInt(queryParams.maxPrice));
        return res.status(200).json({products: product});
    }
    return res.json(products);
});

router.get("/:pid", (req, res) => {
    let pid = parseInt(req.params.pid)
    let product = products[pid-1] 
    if(!product){
      res.status(404).send(`Product not found`);
    }
    res.status(200).json(product)
});

export default router;