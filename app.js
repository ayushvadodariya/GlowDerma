import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let items = [
  {
      name: "Soothing Aloe Gel",
      price: "$15",
      description: "A calming gel that reduces redness and soothes irritated skin."
  },
  {
      name: "Gentle Foaming Cleanser",
      price: "$20",
      description: "A mild cleanser that removes impurities without stripping moisture."
  },
  {
      name: "Revitalizing Night Cream",
      price: "$40",
      description: "Deeply nourishes and repairs skin overnight for a glowing complexion."
  },
];



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
    return res.json(items);
});

// Route Parameter
app.get("/product/:pid", (req, res) => {
    let pid = parseInt(req.params.pid)
    let product = items[pid-1] 
    if(!product){
      res.status(404).send(`Product not found`)
    }
    res.status(200).send(`Your requested product is ${product.name}` )
});

// Handle undefined routes
app.use((req, res) => {
    return res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
