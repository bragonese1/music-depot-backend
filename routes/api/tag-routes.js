const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  
  try {
    // Include associated Product data
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single tag by its `id`
router.get('/:id', async (req, res) => {
  
  try {
    // Include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag ID not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id`
router.put('/:id', async (req, res) => {
  
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tagData[0]) {
      res.status(404).json({ message: 'Tag ID not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag by its `id`
router.delete('/:id', async (req, res) => {
  
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag ID not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
