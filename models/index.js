// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations
// Products belong to a Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // This is the foreign key in the Products table
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id', // This is the foreign key in the Products table
});

// Products belong to many Tags through ProductTag
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id', // This is the foreign key in the ProductTag table
});

// Tags belong to many Products through ProductTag
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id', // This is the foreign key in the ProductTag table
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

