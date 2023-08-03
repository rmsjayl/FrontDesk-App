import React, { useState, useEffect } from "react";
import STYLE from "styles/frondeskapp.module.css";
import instance from "api/instance";

const CheckStorage = ({ header }) => {
  const [storage, setStorage] = useState([]);

  useEffect(() => {
    const getStorage = async () => {
      const response = await instance.get("/storage");
      setStorage(response.data.data);
    };

    getStorage();
  }, []);

  return (
    <>
      <h3>{header}</h3>
      <table className={STYLE.tabledata}>
        <thead>
          <tr>
            <th> No. </th>
            <th> Storage ID </th>
            <th> Storage Name </th>
            <th> Capacity </th>
            <th> created At </th>
          </tr>
        </thead>
        <tbody>
          {storage.length === 0 ? (
            <tr>
              <td colSpan="7"> No storage available found. </td>
            </tr>
          ) : (
            <>
              {storage.map((box, id) => {
                const { storageId, storageName, storageCapacity, createdAt } =
                  box;

                return (
                  <tr key={id}>
                    <td>{storage.indexOf(box) + 1}</td>
                    <td> {storageId}</td>
                    <td> {storageName} </td>
                    <td>{storageCapacity}</td>

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

export default CheckStorage;
