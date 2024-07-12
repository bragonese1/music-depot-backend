const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  // find all categories
  try {
    // finding all categories and including associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Return categoryData 200 'OK' response
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 Error response if something goes wrong
    res.status(500).json(err);
  }
});

// get a single category by its 'id'
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    // find a single category by its primary key ('id') and include associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no category is found, return a 404 Not Found response
    if (!categoryData) {
      res.status(404).json({ message: 'ID category not found' });
      return;
    }

    // Return categoryData 200 'OK' response
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 Internal Server Error response if something goes wrong
    res.status(500).json(err);
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category using the data provided in the req body
    const categoryData = await Category.create(req.body);
    // Return the newly created category data 200 OK response
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 400 Error response if something goes wrong
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    // Update an existing category by its primary key ('id') with the data provided in the req body
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no category is found, return a 404 Not Found response
    if (!categoryData[0]) {
      res.status(404).json({ message: 'ID category not found' });
      return;
    }

    // Return the updated category data 200 OK response
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 Error response if something goes wrong
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its primary key ('id')
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no category is found to delete, return a 404 Not Found response
    if (!categoryData) {
      res.status(404).json({ message: 'ID category not found' });
      return;
    }

    // Return the deleted category data 200 OK response
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 Error response if something goes wrong
    res.status(500).json(err);
  }
});

module.exports = router;

