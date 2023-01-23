import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _ from "lodash";

const pageSize = 15;
const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [paginatedPosts, setPaginatedPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setPaginatedPosts(_(res.data).slice(0).take(pageSize).value());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getData = () => {
    axios
      .get("http://localhost:7000/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:7000/${id}`)
      .then(() => {
        getData();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pageCount = posts ? Math.ceil(posts.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const pagination = (pageNo) => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const paginatedPost = _(posts).slice(startIndex).take(pageSize).value();
    setPaginatedPosts(paginatedPost);
  };

  
  return (
    <div>
      <div className="m-5">
        <Link to="/add">
          <button type="button" className="btn btn-primary p-2">
            Create New Notes
          </button>
        </Link>
      </div>
      {!paginatedPosts ? (
        "No Data"
      ) : (
        <table className="table table-striped table-hover container center_div mt-5 border">
          <thead className="tr">
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Version</th>
              <th>Build Number</th>
              <th>Description</th>
              <th>Update</th>
              <th>Delete</th>
              <th>Time</th>
            </tr>
          </thead>

          {paginatedPosts.map((post, index) => {
            const handelDelete = async (e) => {
              e.preventDefault();
              try {
              onDelete(post.id);
              alert("Data Deleted");
              navigate("/")
              }catch (err) {
                console.log(err);
              }
            };
            return (
              <tbody key={index}>
                <tr>
                  <td>{post.id}</td>
                  <td>{post.project_name}</td>
                  <td>{post.version}</td>
                  <td>{post.build_no}</td>
                  <td>{post.release_note}</td>

                  <td>
                    <Link to={"update/" + post.id}>
                      <button type="button" className="btn btn-info">
                        Update
                      </button>
                    </Link>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handelDelete}
                    >
                      Delete
                    </button>
                  </td>
                  <td>{post.createdAt}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map((page, index) => (
            <li
              key={index}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => pagination(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Posts;
