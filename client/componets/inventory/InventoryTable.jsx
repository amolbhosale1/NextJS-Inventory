import React, { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import Link from 'next/link';

let InventoryTable = () => {
  const [userData, setUserData] = useState(new Map());
  const callInventoryTable = async () => {
    try {
      const res = await fetch("/inventorytableget", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      //  console.log(data);
      setUserData(data);
      if (!res.status === 200) {
        throw new Error(res.error);
      }
    } catch (err) {
      console.log(err);
    }


  };
  // console.log(userData);

  useEffect(() => {
    callInventoryTable();
  });

  return (
    <React.Fragment>
      <Table striped bordered hover >
        <thead>
          <tr>
            {/* <th>#</th> */}
            <th>Name</th>
            <th>Milk</th>
            <th>Liter</th>
            <th>Phone</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody >
          {
            [...userData].map((usr) => (
              <Link href={`/inventory/${usr._id}`}>
                <tr key={usr.cname}>
                  {/* <td >{usr.number}</td> */}
                  <td>{usr.cname}</td>
                  <td>{usr.milk}</td>
                  <td>{usr.liter}</td>
                  <td>{usr.cphone}</td>
                  <td>{usr.createdAt}</td>
                </tr>
              </Link>
            )
            )
          }
        </tbody>
      </Table>

    </React.Fragment>
  );
};

export default InventoryTable;