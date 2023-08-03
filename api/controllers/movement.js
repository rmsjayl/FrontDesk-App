const PackageMovement = require("../models/packagemovement");

exports.getpackagemovements = async (req, res) => {
  try {
    const packagemovements = await PackageMovement.findAll();

    return res.status(200).send({
      success: true,
      message: "Package movements retrieved successfully.",
      data: packagemovements,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: error.message,
    });
  }
};
