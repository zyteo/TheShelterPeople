// =======================================
//              DEPENDENCIES
// =======================================
const express = require("express");
const router = express.Router();
// get the CRUD operations
const CatCtrl = require("./cat-ctrl");

// =======================================
//              GET ROUTES
// =======================================
// This is for show page, showing particular cat
// :id is the cat's id
router.get("/cats/:id", CatCtrl.getCatById);
// This is for index page, showing all cats
router.get("/cats", CatCtrl.getCats);

// =======================================
//              POST ROUTES
// =======================================
// This is for new cat
router.post("/cats", CatCtrl.createCat);

// =======================================
//              PUT ROUTES
// =======================================
// This is for updating cat
// :id is the cat's id
router.put("/cats/:id", CatCtrl.updateCat);

// =======================================
//              DELETE ROUTES
// =======================================
// Goodbye cat :')
// :id is the cat's id
router.delete("/cats/:id", CatCtrl.deleteCat);

module.exports = router;