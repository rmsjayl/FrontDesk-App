const Package = require("../models/package");
const Storage = require("../models/storage");
const PackageMovement = require("../models/packagemovement");

exports.getpackage = async (req, res) => {
  const package = await Package.findAll();

  try {
    if (!package) {
      return res.status(404).send({
        success: false,
        message: "Package not found.",
      });
    }

    if (package.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No package available.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Package retrieved successfully.",
      data: package,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getpackageid = async (req, res) => {
  const package = await Package.findByPk(req.params.id);

  try {
    if (!package) {
      return res.status(404).send({
        success: false,
        message: "Package not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Package retrieved successfully.",
      data: package,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.createpackage = async (req, res) => {
  try {
    const { packageSize, ownerFirstName, ownerLastName, ownerContactNum } =
      req.body;

    if (!packageSize) {
      return res.status(400).send({
        success: false,
        message: "Package size is required.",
      });
    }

    if (!ownerFirstName) {
      return res.status(400).send({
        success: false,
        message: "Owner first name is required.",
      });
    }

    if (!ownerLastName) {
      return res.status(400).send({
        success: false,
        message: "Owner last name is required.",
      });
    }

    if (!ownerContactNum) {
      return res.status(400).send({
        success: false,
        message: "Owner contact number is required.",
      });
    }

    const recordPackageMovement = async (packageId, type) => {
      const packageMovement = await PackageMovement.create({
        packageId,
        type,
      });

      return packageMovement;
    };

    const movementType = "store";

    const checkStorageAvailability = async (packageSize) => {
      const storageCapacity = await Storage.findOne({
        where: {
          storageName: packageSize,
        },
      });

      if (!storageCapacity) {
        throw new Error("Storage not found.");
      }

      return storageCapacity.storageCapacity > 0;
    };

    const isAvailable = await checkStorageAvailability(packageSize, res);

    if (isAvailable) {
      const package = await Package.create({
        packageSize,
        ownerFirstName,
        ownerLastName,
        ownerContactNum,
      });

      const storage = await Storage.findOne({
        where: {
          storageName: packageSize,
        },
      });
      storage.storageCapacity -= 1;
      await storage.save();

      await recordPackageMovement(package.packageId, movementType);

      return res.status(201).send({
        success: true,
        message: "Package created successfully.",
        data: package,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Not enough space. Storage is full.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.retrievepackage = async (req, res) => {
  const package = await Package.findByPk(req.params.id);
  const movementType = "retrieve";

  const retrievePackage = async (packageId, type) => {
    await PackageMovement.create({
      packageId: package.packageId,
      type: movementType,
    });
  };

  try {
    await retrievePackage(package.packageId, movementType);

    return res.status(200).send({
      success: true,
      message: "Package retrieved successfully.",
      data: package,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
