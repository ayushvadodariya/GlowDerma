import {Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send("Welcome to GlowDerma");
});

router.get("/about", (req, res) => {
    return res.send("<h3>We are a premium skincare brand committed to bringing you dermatologist-approved, clean beauty products.</h3>");
});

router.get("/contact", (req, res) => {
    return res.json({
        email: "care@glowderma.com",
        instagram: "http://instagram.com/glowderma",
        consultation: "http://glowderma.com/book-appointment"
    });
});

export default router;