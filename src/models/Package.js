const mongoose = require('mongoose');
const { Schema } = mongoose;

const PackageSchema = new Schema({
  initial: { type: Boolean },
  packageName: { type: String, unique: true, required: true },
  minInvestment: { type: Number, required: true },
  maxInvestment: { type: Number, required: true },
  increment: { type: Number, required: true },
  period: { type: Number, required: true },
  user: { type: String }
});

module.exports = mongoose.model('Package', PackageSchema)