import express from "express";
import { rateLimit } from 'express-rate-limit'

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    message: "Sorry you have exhausted you plan",
});

app.use(limiter)
app.use(express.json());
app.use(express.static("assets"));

let products= [
  { id: 11, name: "Retinol Serum", price: 1200, availableQty: 50 },
  { id: 12, name: "Niacinamide Solution", price: 800, availableQty: 30 },
  { id: 14, name: "Peptide Moisturizer", price: 1500, availableQty: 100 },
  { id: 15, name: "Glycolic Acid Toner", price: 900, availableQty: 20 }
];

let orders = [
  { id: 1, product: 'Anti-Aging Serum', quantity: 2 },
  { id: 2, product: 'Vitamin C Moisturizer', quantity: 1 },
  { id: 3, product: 'Hyaluronic Acid', quantity: 3 }
];

let shoppingCart =[];

const validateFeild = (requireFeild, data)=>{
    const missingFeild = requireFeild.filter(feild => !data[feild]);
    return missingFeild;
}

app.get("/about", (req, res) => {
    return res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products.</h3>");
});

app.get("/contact", (req, res) => {
    return res.json({
        email: "care@glowderma.com",
        instagram: "http://instagram.com/glowderma",
        consultation: "http://glowderma.com/book-appointment"
    });
});

app.get("/products", (req, res) => {
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

// Route Parameter
app.get("/product/:pid", (req, res) => {
    let pid = parseInt(req.params.pid)
    let product = products[pid-1] 
    if(!product){
      res.status(404).send(`Product not found`)
    }
    res.status(200).json(product)
});

app.get("/orders/:orderId",(req,res)=>{
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

app.get("/cart", (req, res)=>{
    return res.status(200).json(shoppingCart);
})

app.post("/cart", (req, res)=>{
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

// Handle undefined routes
app.use((req, res) => {
    return res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
