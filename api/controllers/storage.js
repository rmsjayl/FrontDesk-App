const Package = require("../models/package");
const Storage = require("../models/storage");

exports.getstorage = async (req, res) => {
  const storage = await Storage.findAll();

  try {
    if (!storage) {
      return res.status(404).send({
        success: false,
        message: "Storage not found.",
      });
    }

    if (storage.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No storage available.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Storage retrieved successfully.",
      data: storage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.checkstorage = async (req, res) => {
  const storage = await Storage.findByPk(req.params.id);

  try {
    if (!storage) {
      return res.status(404).send({
        success: false,
        message: "Storage not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Storage retrieved successfully.",
      data: storage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.addstorage = async (req, res) => {
  const { storageName, storageCapacity } = req.body;

  try {
    if (!storageName) {
      return res.status(400).send({
        success: false,
        message: "Storage name is required.",
      });
    }

    if (!storageCapacity) {
      return res.status(400).send({
        success: false,
        message: "Storage capacity is required.",
      });
    }

    const storage = await Storage.create({
      ...req.body,
    });

    return res.status(200).send({
      success: true,
      message: "Storage created successfully.",
      data: storage,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
