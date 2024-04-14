import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Students = () => {
  const [data, setData] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const Records = records.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    axios
      .get("http://localhost:3000/students")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Filter = (event) => {
    setRecords(
      Records.filter(
        (el) =>
          el.name.toLowerCase().includes(event.target.value) ||
          el.lastName.toLowerCase().includes(event.target.value) ||
          el.group.toLowerCase().includes(event.target.value)
      )
    );
  };

  const navigation = useNavigate();

  const editProduct = (id) => {
    navigation(`/edit/${id}`);
  };

  const handlePrePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="input-group w-100">
        <input
        name="search"
          type="search"
          id="search"
          placeholder="Search"
          className="form-control w-75 mt-4"
          onChange={Filter}
        />

        <Link className="btn btn-success mt-4" to={'/add'}>
          Add
        </Link>
      </div>
      <table className="table mt-5 text-center">
        <thead>
          <tr className="border">
            <th className="border" scope="col">
              Id
            </th>
            <th className="border" scope="col">
              FirstName
            </th>
            <th className="border" scope="col">
              LastName
            </th>
            <th className="border" scope="col">
              Group
            </th>
            <th className="border" scope="col">
              DoesWork
            </th>
            <th className="border" scope="col">
              Edit/Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {Records.map((el, i) => {
            return (
              <tr scope="row" key={i}>
                <td className="border">{i + 1}</td>
                <td className="border">{el.name}</td>
                <td className="border">{el.lastName}</td>
                <td className="border">{el.group}</td>
                <td className="border">{el.doesWork ? "✅" : "❌"}</td>
                <td className="border  d-flex gap-2">
                  <Link to={`/edit/${el.id}`} className="btn btn-primary w-50">
                    <FaEdit />
                  </Link>
                  <button className="btn btn-danger w-50" onClick={() => handleDelete(el.id) }>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link mb-3" onClick={handlePrePage}>
              Prev
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number && "active"}`}>
              <button
                className="page-link mb-3"
                onClick={() => handleChangePage(number)}>
                {number}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
  function handleDelete (id) {
    const newList = Records.filter(li => li.id !== id);
    setRecords(newList);
  }
};

export default Students;
