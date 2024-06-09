require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

const Item = require("./models/item.model");

const cors = require("cors");
const express = require("express");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// add item
app.post("/create-item", async (req, res) => {
  const {
    namaTempat,
    jarak,
    ratingGoogle,
    fasilitas,
    tiketMasuk,
    waktuKunjungan,
    aksesibilitas,
  } = req.body;

  if (!namaTempat) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!jarak) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!ratingGoogle) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!fasilitas) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!tiketMasuk) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!waktuKunjungan) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }
  if (!aksesibilitas) {
    return res
      .status(400)
      .json({ error: true, message: "Nama Tempat is required" });
  }

  const item = new Item({
    namaTempat,
    jarak,
    ratingGoogle,
    fasilitas,
    tiketMasuk,
    waktuKunjungan,
    aksesibilitas,
  });

  await item.save();

  return res.json({
    error: false,
    item,
    message: "Add New Item Successfully",
  });
});

// get all item
app.get("/get-all-items/", async (req, res) => {
  try {
    const items = await Item.find();

    return res.json({
      error: false,
      items,
      message: "All item retrieved succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// delete item
app.delete("/delete-item/:itemId", async (req, res) => {
  const { itemId } = req.params;

  try {
    const item = await Item.findOne({ _id: itemId });

    if (!item) {
      return res.status(404).json({ error: true, message: "Item not found" });
    }

    await Item.deleteOne({ _id: itemId });

    return res.json({
      error: false,
      message: "Item deleted succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// update item
app.put("/edit-item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const {
    namaTempat,
    jarak,
    ratingGoogle,
    fasilitas,
    tiketMasuk,
    waktuKunjungan,
    aksesibilitas,
  } = req.body;

  if (
    !namaTempat &&
    !jarak &&
    !ratingGoogle &&
    !fasilitas &&
    !tiketMasuk &&
    !waktuKunjungan &&
    !aksesibilitas
  ) {
    return res.status(400).json({
      error: true,
      message: "No changes provided",
    });
  }

  try {
    const item = await Item.findOne({ _id: itemId });
    if (!item) {
      return res.status(404).json({
        error: true,
        message: "item not found",
      });
    }

    if (namaTempat) item.namaTempat = namaTempat;
    if (jarak) item.jarak = jarak;
    if (ratingGoogle) item.ratingGoogle = ratingGoogle;
    if (fasilitas) item.fasilitas = fasilitas;
    if (tiketMasuk) item.tiketMasuk = tiketMasuk;
    if (waktuKunjungan) item.waktuKunjungan = waktuKunjungan;
    if (aksesibilitas) item.aksesibilitas = aksesibilitas;

    await item.save();

    return res.json({
      error: false,
      item,
      message: "item updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

app.listen(8000);
