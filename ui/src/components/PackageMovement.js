import React, { useState, useEffect } from "react";
import STYLE from "styles/frondeskapp.module.css";
import instance from "api/instance";

const PackageMovement = ({ header }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackageMovement = async () => {
      const response = await instance.get("/packagemovement");
      setPackages(response.data.data);
    };

    getPackageMovement();
  }, []);

  return (
    <>
      <h3>{header}</h3>
      <table className={STYLE.tabledata}>
        <thead>
          <tr>
            <th> No. </th>
            <th> Package ID: </th>
            <th> Type </th>
            <th> Modified At </th>
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
                const { packageId, type, createdAt } = box;

                return (
                  <tr key={id}>
                    <td>{packages.indexOf(box) + 1}</td>
                    <td> {packageId} </td>
                    <td>{type}</td>

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
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>
    </>
  );
};

export default PackageMovement;
