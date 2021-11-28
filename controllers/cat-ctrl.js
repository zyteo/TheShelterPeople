// =======================================
//              DATABASE
// =======================================
const Cat = require("../models/cats");
const Comment = require("../models/comments");

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
    const cat = new Cat(req.body);
    // if cat image url is empty, fill in with default cat image
    if (cat.image === "") {
      cat.image =
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
    }
    await cat.save();

    // somehow, if the new cat doesn't exist, return error
    if (!cat) {
      return res.status(400).json({ success: false, error: err });
    }

    // success!
    res.status(201).json({
      success: true,
      id: cat._id,
      message: "Cat created!",
    });
  } catch (err) {
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
    const cat = await Cat.findById(req.params.id);
    // update the cat details
    cat.name = req.body.name;
    cat.description = req.body.description;
    cat.image = req.body.image;
    cat.gender = req.body.gender;
    cat.adoptable = req.body.adoptable;
    cat.cage = req.body.cage;
    // if cat image url is empty, fill in with default cat image
    if (cat.image === "") {
      cat.image =
        "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";
    }
    // save the updated cat
    await cat.save();
    if (!cat) {
      return res.status(404).json({
        err,
        message: "Cat not found!",
      });
    }

    res.status(200).json({
      success: true,
      id: cat._id,
      message: "Cat updated!",
    });
  } catch (err) {
    res.status(404).json({
      error,
      message: "Cat not updated!",
    });
  }
};

// For deleting cat
// When deleting cat, all the corrresponding comments are deleted too
const deleteCat = async (req, res) => {
  try {
    const cat = await Cat.findById(req.params.id);
    // remove comments associated with the cat
    Comment.remove({ cat_id: { $in: req.params.id } }, (err, data) => {
      console.log(data);
    });
    // remove the cat
    await cat.remove();
    // if the cat doesnt exist, throw error
    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    res.status(200).json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing a particular cat
const getCatById = async (req, res) => {
  try {
    // find the cat by id
    const cat = await Cat.findById(req.params.id);
    if (!cat) {
      return res.status(404).json({ success: false, error: `Cat not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: cat });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// For showing all cats - this is the cat index page
const getCats = async (req, res) => {
  try {
    // find all cats
    const cats = await Cat.find();
    if (!cats) {
      return res.status(404).json({ success: false, error: `Cats not found` });
    }
    // return json response if successful
    res.status(200).json({ success: true, data: cats });
  } catch (err) {
    res.status(400).json({ success: false, error: err });
  }
};

// export the modules - CRUD
// Read has 2 (for the index page--> showing all cats, and for the show page--> show particular cat)
module.exports = {
  createCat,
  updateCat,
  deleteCat,
  getCats,
  getCatById,
};
