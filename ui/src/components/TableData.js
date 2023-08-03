import React, { useState, useEffect } from "react";
import STYLE from "styles/frondeskapp.module.css";
import instance from "api/instance";
import { Buttons } from "./Buttons";
import { toast } from "react-toastify";

const TableData = ({ header }) => {
  const [packages, setPackages] = useState([]);
  const [addPackage, setAddPackage] = useState(false);
  const [addPackageData, setAddPackageData] = useState({
    packageSize: "",
    ownerFirstName: "",
    ownerLastName: "",
    ownerContactNum: "",
  });

  const isClicked = () => {
    addPackage ? setAddPackage(false) : setAddPackage(true);
  };

  const handleChange = (event, name) => {
    setAddPackageData({
      ...addPackageData,
      [name]: event.target.value,
    });
  };

  const retrievePackage = async (id) => {
    await instance
      .post(`/package/${id}`)
      .then((response) => {
        toast.success(response.data.message);
        setPackages([...packages, response.data.data]);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }

        if (error.response.status === 500) {
          toast.error(error.response.data.error);
        }
      });

    setAddPackage(false);
  };

  const createPackage = async (event) => {
    event.preventDefault();

    await instance
      .post("/package", addPackageData)
      .then((response) => {
        toast.success(response.data.message);
        setPackages([...packages, response.data.data]);
        window.location.reload();
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        }

        if (error.response.status === 500) {
          toast.error(error.response.data.error);
        }
      });

    setAddPackage(false);
  };

  // const retrievePackage = async (event) => {
  /*
   *
   *
   *
   *        TO DOOOOOOOOOOOOOO
   *
   *
   *
   *
   * */
  //   event.preventDefault();

  useEffect(() => {
    const getPackages = async () => {
      await instance
        .get("/package")
        .then((response) => {
          setPackages(response.data.data);
          toast.success(response.data.message);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };

    getPackages();
  }, []);

  return (
    <>
      <h3>{header}</h3>
      <div className={STYLE.button}>
        <Buttons buttonStyle="btn-primary" onClick={isClicked}>
          {addPackage ? "Close" : "Add Package"}
        </Buttons>
      </div>
      <div className={STYLE.container}>
        <div className={STYLE.wrapper}>
          <table className={STYLE.tabledata}>
            <thead>
              <tr>
                <th> package ID: </th>
                <th> Package Size </th>
                <th> Owner First Name </th>
                <th> Owner Last Name </th>
                <th> Contact Number </th>
                <th> Stored At </th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr>
                  <td colSpan="7"> No records found. </td>
                </tr>
              ) : (
                <>
                  {packages.map((box, id) => {
                    const {
                      packageId,
                      packageSize,
                      ownerFirstName,
                      ownerLastName,
                      ownerContactNum,
                      createdAt,
                    } = box;

                    return (
                      <tr key={id}>
                        <td>{packageId}</td>
                        <td> {packageSize} </td>
                        <td>{ownerFirstName}</td>
                        <td>{ownerLastName}</td>
                        <td> {ownerContactNum} </td>
                        <td>
                          {new Date(createdAt)
                            .toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })
                            .replace("at", ",")}
                        </td>
                        <td>
                          <Buttons
                            buttonStyle="btn-danger"
                            onClick={() => retrievePackage(packageId)}
                          >
                            Retrieve
                          </Buttons>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {addPackage && (
        <div className={STYLE.configure}>
          <div>
            <div className={STYLE.header}>Create Package</div>
            <form className={STYLE.form}>
              <div className={STYLE.packageNameInput}>
                <label> Package Size </label>
                <input
                  onChange={(event) => handleChange(event, "packageSize")}
                  className={STYLE.userInput}
                  type="text"
                />
              </div>

              <div className={STYLE.packageNameInput}>
                <label> Owner First Name </label>
                <input
                  onChange={(event) => handleChange(event, "ownerFirstName")}
                  className={STYLE.userInput}
                  type="text"
                />
              </div>
              <div className={STYLE.packageNameInput}>
                <label> Owner Last Name </label>
                <input
                  onChange={(event) => handleChange(event, "ownerLastName")}
                  className={STYLE.userInput}
                  type="text"
                />
              </div>
              <div className={STYLE.packageNameInput}>
                <label> Owner Contact Number </label>
                <input
                  onChange={(event) => handleChange(event, "ownerContactNum")}
                  className={STYLE.userInput}
                  type="text"
                />
              </div>

              <div className={STYLE.confirmButton}>
                <Buttons buttonStyle={"btn-primary"} onClick={createPackage}>
                  Save Package
                </Buttons>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TableData;
