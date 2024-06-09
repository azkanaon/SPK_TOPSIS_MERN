const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  namaTempat: { type: String, required: true },
  jarak: { type: Number, required: true },
  ratingGoogle: { type: Number, required: true },
  fasilitas: { type: Number, required: true },
  tiketMasuk: { type: Number, required: true },
  waktuKunjungan: { type: Number, required: true },
  aksesibilitas: { type: Number, required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Note", noteSchema);
