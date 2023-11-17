import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "./AdminDashboard";

const Users = ({ users, getAllUser }) => {
  const handleBlock = async (userId, action) => {
    alert("Are you sure!");
    await axios.put(base_url+`block/${userId}`, {
      block_or_unblock: action,
    });
    getAllUser();
  };
  const handleDeleteUser = async (userId) => {
    alert("Are you sure!");
    await axios.delete(base_url+`delete/${userId}`);
    getAllUser();
  };
  useEffect(() => {
    getAllUser();
  }, []);
  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped thead-dark table-hover table-responsive table-bordered text-black">
          <thead className="">
            <tr className="text-center">
              <th scope="col">S.No</th>
              <th scope="col">User Id</th>
              <th scope="col">Name</th>
              <th scope="col">Subscribe</th>
              <th scope="col">isBlocked</th>
              <th scope="col">City</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, idx) => (
              <tr className="text-center" key={idx}>
                <th scope="row">{idx + 1}</th>
                <td>{user?.userId}</td>
                <td className="text-lowercase">{user?.name}</td>
                <td className="">{user?.subscribed == true ? "Yes" : "No"}</td>
                <td>{user?.isBlocked == true ? "Yes" : "No"}</td>
                <td className="text-capitalize">{user?.userCity}</td>
                <td className="">
                  <button
                    type="submit"
                    onClick={() => handleDeleteUser(user?._id)}
                    className="btn btn-danger btn-sm m-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() =>
                      handleBlock(
                        user?.userId,
                        user?.isBlocked == true ? false : true
                      )
                    }
                    type="submit"
                    className={`btn ${
                      user?.isBlocked == true ? "btn-outline-dark" : "btn-dark"
                    } btn-sm`}
                  >
                    {user?.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
