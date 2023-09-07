// =======================================
//              DATABASE
// =======================================
const { Pool } = require("pg");
const pool = new Pool();

// Create all Cats CRUD operations
// status errors refer: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

// For creating cat
const createCat = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a cat",
    });
  }

  try {
    // req.body exists, so make a new cat
    const { name, description, image, gender, adoptable, cage } = req.body;
    // if cat image url is empty, fill in with default cat image
    const imageUrl =
      image ||
      "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

    const queryText = `
      INSERT INTO cats (name, description, image, gender, adoptable, cage)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [name, description, imageUrl, gender, adoptable, cage];

    const { rows } = await pool.query(queryText, values);

    const cat = rows[0];

    // success!
    res.status(201).json({
      success: true,
      id: cat.id,
      message: "Cat created!",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      err,
      message: "Cat not created!",
    });
  }
};

// For updating cat
const updateCat = async (req, res) => {
  // if there is no req.body, return error
  if (!req.body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  try {
    // req.body exists, so find the cat by id and then update
    const catId = req.params.id;
    const { name, description, image, gender, adoptable, cage } = req.body;

    // if cat image url is empty, fill in with default cat image
    const imageUrl =
      image ||
      "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

    const queryText = `
      UPDATE cats
      SET name = $1, description = $2, image = $3, gender = $4, adoptable = $5, cage = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      name,
      description,
      imageUrl,
      gender,
      adoptable,
      cage,
      catId,
    ];

    const { rows } = await pool.query(queryText, values);

    const cat = rows[0];

    if (!cat) {
      return res.status(404).json({
        error: "Cat not found!",
      });
    }

    res.status(200).json({
      success: true,
      id: cat.id,
      message: "Cat updated!",
    });
  } catch (err) {
    console.error(err);
    res.status(404).json({
      error,
      message: "Cat not updated!",
    });
  }
};

// For deleting cat
// When deleting cat, all the corresponding comments are deleted too
const deleteCat = async (req, res) => {
  try {
    const catId = req.params.id;

    // First, remove comments associated with the cat
    await pool.query("DELETE FROM comments WHERE cat_id = $1", [catId]);

    // Then, remove the cat
    const { rowCount } = await pool.query("DELETE FROM cats WHERE id = $1", [
      catId,
    ]);

    if (rowCount === 0) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }

    res.status(200).json({ success: true, message: "Cat deleted!" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err });
  }
};

// For showing a particular cat
const getCatById = async (req, res) => {
  try {
    // Find the cat by id
    const catId = req.params.id;
    const queryText = "SELECT * FROM cats WHERE id = $1";
    const { rows } = await pool.query(queryText, [catId]);

    const cat = rows[0];

    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }

    // Return JSON response if successful
    res.status(200).json({ success: true, data: cat });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err });
  }
};

// For showing all cats - this is the cat index page
const getCats = async (req, res) => {
  try {
    // Find all cats
    const queryText = "SELECT * FROM cats";
    const { rows } = await pool.query(queryText);

    const cats = rows;

    if (!cats || cats.length === 0) {
      return res.status(404).json({ success: false, error: `Cats not found` });
    }

    // Return JSON response if successful
    res.status(200).json({ success: true, data: cats });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, error: err });
  }
};

// Export the modules - CRUD
module.exports = {
  createCat,
  updateCat,
  deleteCat,
  getCats,
  getCatById,
};
