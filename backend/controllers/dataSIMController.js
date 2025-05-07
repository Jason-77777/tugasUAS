const SIM = require("../models/SIM");

// Create New Data SIM
exports.createSIM = async (req, res) => {
  const { layanan, nama, alamat, tipe, tahun, harga } = req.body;
  try {
    if (!layanan || !nama || !alamat || !tipe || !tahun || !harga) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const newSIM = new SIM({ 
      layanan, 
      nama, 
      alamat, 
      tipe, 
      tahun, 
      harga,
      status: 'Pending'
    });
    const savedSIM = await newSIM.save();
    res.status(201).json({ message: `Successfully created new ${layanan} data`, savedSIM });
  } catch (err) {
    res.status(500).json({ message: `Error creating new ${layanan} data`, err });
  }
};

// Get All SIM
exports.getAllSIM = async (req, res) => {
  try {
    const sim = await SIM.find().sort({ createdAt: -1 });
    res.status(200).json(sim);
  } catch (err) {
    res.status(500).json({ message: "Error fetching SIM data", err });
  }
};

// Get SIM by ID
exports.getSIMById = async (req, res) => {
  const id = req.params.id;
  try {
    const sim = await SIM.findById(id);
    if (!sim) {
      return res.status(404).json({ message: `SIM data with ID ${id} not found` });
    }
    res.status(200).json(sim);
  } catch (err) {
    res.status(500).json({ message: `Error fetching SIM data with ID ${id}`, err });
  }
};

// Update SIM
exports.updateSIMById = async (req, res) => {
  const id = req.params.id;
  const { tipe, status } = req.body;
  try {
    const updateData = {
      ...(tipe && { tipe }),
      ...(status && { status }),
      updatedAt: new Date()
    };

    const updatedSIM = await SIM.findByIdAndUpdate(
      id, 
      updateData,
      { new: true }
    );

    res.status(200).json({ 
      message: `Successfully updated SIM ${id} data`, 
      updatedSIM 
    });
  } catch (err) {
    res.status(500).json({ message: `Error updating SIM ${id} data`, err });
  }
};

// Delete SIM
exports.deleteSIMById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSIM = await SIM.findByIdAndDelete(id);
    if (!deletedSIM) {
      return res.status(404).json({ message: `SIM with ID ${id} not found` });
    }

    res.status(200).json({ 
      message: `SIM ${id} deleted successfully`,
      deletedSIM 
    });
  } catch (err) {
    res.status(500).json({ message: `Error deleting SIM ${id} data`, err });
  }
};
