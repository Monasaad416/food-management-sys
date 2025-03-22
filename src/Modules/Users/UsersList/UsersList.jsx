
import Header from "../../Shared/Header/Header";
import recipiesHeader from "../../../assets/imgs/recipies-header.png";
import NoData from "../../Shared/NoData/NoData";
import { toast } from "react-toastify";
import { privateAxiosInstance } from "../../../services/api/apiInstance";
import { USER_URLS } from "../../../services/api/apiConfig";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import Pagination from "../../Shared/Pagination/Pagination";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  //delete modal
  const [showDelete, setShowDelete] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [numOfPagesArray, setNumOfPagesArray] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [group, setGroup] = useState("");

  const handleShowDelete = (id) => {
    setShowDelete(true); // Open modal
    setUserId(id);
  };

  const handleCloseDelete = () => {
    setShowDelete(false); // Close modal
    document.body.classList.remove("modal-open");
    document.querySelectorAll(".modal-backdrop").forEach((backdrop) => {
      backdrop.remove();
    });
  };

    const [userId, setUserId] = useState(0);
  const deleteUser = async () => {
    try {
      console.log(userId);
      const response = await privateAxiosInstance.delete(
        `${USER_URLS.DELETE_USER(userId)}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        toast.success("user deleted successfully");

        setUsers((prevusers) => prevusers.filter((user) => user.id !== userId));

        handleCloseDelete();
        getAllUsers(); // Refetch users after successful deletion
      } else {
        console.error("Expected an array but got:", response.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getAllUsers = async (pageSize, pageNumber, name, email, country,group) => {
    try {
      setLoading(true);
      const response = await privateAxiosInstance.get(USER_URLS.USERS, {
        params: {
          pageSize: pageSize,
          pageNumber: pageNumber,
          userName: name,
          email: email,
          country: country,
          groups: group,
        },
      });
      console.log(response.data.data);
      setUsers(response?.data?.data);
      setNumOfPagesArray(
        Array(response?.data?.length)
          .fill()
          .map((_, index) => index + 1)
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

   const getNameValue = (e) => {
     const nameValue = e.target.value.toLowerCase();
     console.log(nameValue);
     setName(nameValue);
     getAllUsers(5, 1, e.target.value, email,country,group);
   };

   const getEmailValue = (e) => {
     setEmail(e.target.value);
     getAllUsers(5, 1, name, e.target.value, country,group);
   };

   const getCountryValue = (e) => {
     setCountry(e.target.value);
     getAllUsers(5, 1, name, email, e.target.value,group);
   }; 
  const getGroupValue = (e) => {
    setCountry(e.target.value);
    getAllUsers(5, 1, name, email,country, e.target.value);
  }; 

  return (
    <>
      <Header
        strong="users"
        title="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSrc={recipiesHeader}
        width={170}
      />
      <div className="d-flex justify-content-between mx-4 my-5">
        <div className="details">
          <h3>users Table Details</h3>
          <span className="text-muted">You can check all details</span>
        </div>
      </div>
      <div className="row my-5 mx-md-4">
        <div className="col-2">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input
            type="text"
            className="form-control"
            placeholder="name"
            onChange={getNameValue}
          />
        </div>
        <div className="col-4">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input
            type="text"
            className="form-control"
            placeholder="email"
            onChange={getEmailValue}
          />
        </div>
        <div className="col-3">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input
            type="text"
            className="form-control"
            placeholder="country"
            onChange={getCountryValue}
          />
        </div>
        <div className="col-2">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={getGroupValue}
          >
            <option value="">group</option>

            <option key="SystemUser" value="2">
              SystemUser
            </option>
            <option key="SystemAdmin" value="1">
              SystemAdmin
            </option>
          </select>
        </div>
      </div>
      <div className="mx-4">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50vh" }}
          >
            {/* Example loader */}
            <BeatLoader color={"#009247"} loading={loading} size={15} />
          </div>
        ) : Array.isArray(users) ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Country</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.userName}</td>

                  <td>{user.email}</td>
                  <td>{user.country}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <div className="dropdown">
                      <i
                        className="fa-solid fa-ellipsis"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li className="dropdown-item">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#catFormModal"
                            className="d-flex align-items-center text-decoration-none action-anchor"
                          >
                            <i className="fa-solid fa-eye d-inline action-icon me-1"></i>
                            <span> View</span>
                          </a>
                        </li>

                        <li className="dropdown-item">
                          <a
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            onClick={() => handleShowDelete(user?.id)}
                            className="d-flex align-items-center text-decoration-none action-anchor"
                          >
                            <i className="fa fa-trash d-inline action-icon me-1"></i>
                            <span> Delete</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <NoData />
          </div>
        )}
      </div>

      {/* start delete modal */}
      <DeleteConfirmation
        showDelete={showDelete}
        handleCloseDelete={handleCloseDelete}
        deleteFunction={deleteUser}
        deletedItem={"user"}
      />
      {/* End delete modal */}

      {/* start pagination */}
      <Pagination
        loading={loading}
        currentPage={currentPage}
        getAllItems={getAllUsers}
        setCurrentPage={setCurrentPage}
        numOfPagesArray={numOfPagesArray}
        items={users}
      />
      {/* End pagination */}
    </>
  );
}
