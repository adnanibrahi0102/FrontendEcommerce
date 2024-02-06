import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const { values, setValues } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API}/api/v1/products/search/${values.keyword}`);
      console.log(data);
      setValues({ ...values, results: data });
      console.log(values)
      navigate('/searched-products');
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, keyword: e.target.value });
  };

  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search Products..."
          aria-label="Search"
          value={values.keyword}
          onChange={handleChange}
        />
        <button className="btn btn-outline-dark" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
