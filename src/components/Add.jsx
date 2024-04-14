import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    lastName: "",
    group: "N45",
    doesWork: false,
  });
  const btnClose = () => {
    navigate("/");
  };

  const hendelChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value.trim() });
  };

  const handleCheckboxChange = (e) => {
    setProduct({ ...product, doesWork: e.target.checked });
  };

  const save = async () => {
    await axios.post("http://localhost:3000/students", product).then((res) => {
      btnClose();
    });
  };

  return (
    <>
      <section className="add-product">
        <div className="container">
          <div className="add-product__item">
            <div className="mb-3 container mt-5 border">
              <label htmlFor="fristname" className="form-label mt-3">
                FristName
              </label>
              <input
                name="name"
                type="text"
                id="fristname"
                className="form-control"
                value={product.name}
                onChange={hendelChange}
              />
              <label htmlFor="lastname" className="form-label mt-3">
                LastName
              </label>
              <input
                name="lastName"
                type="text"
                id="lastname"
                className="form-control"
                value={product.lastName}
                onChange={hendelChange}
              />
              <select
                name="group"
                id="group"
                className="form-select mt-3 w-auto"
                value={product.group}
                onChange={hendelChange}>
                <option value="N45">N45</option>
                <option value="N208">N208</option>
                <option value="N210">N210</option>
                <option value="N11">N11</option>
              </select>
              <label
                className="form-check-label mt-3 d-flex gap-2"
                htmlFor="doeswork">
                <input
                  type="checkbox"
                  className="form-check-input mb-3"
                  value={product.doesWork}
                  id="doeswork"
                  onChange={handleCheckboxChange}
                />
                DoesWork
              </label>
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-success" onClick={save}>
                Сохранить
              </button>
              <button className="btn btn-danger" onClick={btnClose}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Add;



