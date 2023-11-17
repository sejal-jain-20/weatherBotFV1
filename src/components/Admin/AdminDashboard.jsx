import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { RiUserFollowFill } from "react-icons/ri";
import Users from "./Users";
import UpdateToken from "./UpdateToken";
import axios from "axios";
export const base_url ="https://weatherbotbv1.sejaljain201200.repl.co/api/v1/"
const AdminDashboard = () => {
  const [isUsersVisible, setUserVisible] = useState(false);
  const [isTokenVisible, setTokenVisible] = useState(false);
  const [token, setToken] = useState([]);
  const [users, setUsers] = useState([]);
  const [subscribeUser, setSubscribeUser] = useState(0);
  const changeRoute = (route) => {
    if (route == "user") {
      setUserVisible(true);
      setTokenVisible(false);
    } else if (route == "token") {
      setUserVisible(false);
      setTokenVisible(true);
    } else {
      setUserVisible(false);
      setTokenVisible(false);
    }
  };
  const getToken = async () => {
    const data = await axios.get(base_url+"get-token");
    setToken(data.data[0]);
    console.log(data.data);
    console.log(token);
  };
  const getAllUser = async () => {
    const data = await axios.get(base_url+"users");
    console.log(data.data);
    setUsers(data.data);
  };
  useEffect(() => {
    getToken();
    getAllUser();
  }, []);
  useEffect(() => {
    let count = 0;
    users.forEach((element) => {
      if (element.subscribed) count++;
    });
    setSubscribeUser(count);
  }, [users]);

  return (
    <div className="container">
      <h1 className="text-center">Admin Dashboard</h1>
      <hr />
      <br />
      <div className="">
        <div className="d-flex justify-content-between">
          <div className="route-link my-3">
            <button
              onClick={() => changeRoute("user")}
              className="btn btn-dark"
            >
              Users
            </button>{" "}
          </div>
          <div className="route-link my-3">
            <button
              onClick={() => changeRoute("home")}
              className="btn btn-primary"
            >
              Home
            </button>{" "}
          </div>
          <div className="route-link my-3">
            <button
              onClick={() => changeRoute("token")}
              className="btn btn-warning"
            >
              Update Token
            </button>{" "}
          </div>
        </div>
        {!isUsersVisible && !isTokenVisible && (
          <div className="d-flex flex-wrap justify-content-center">
            <div class="card m-2" style={{ width: "18rem" }}>
              <div class="card-body d-flex justify-content-center align-items-center bg-light">
                <FaUsers size={100} />{" "}
                <span className="fw-bold mx-2">Total Users:{users.length}</span>
              </div>
            </div>

            <div class="card m-2" style={{ width: "18rem" }}>
              <div class="card-body d-flex justify-content-center align-items-center bg-light">
                <RiUserFollowFill size={100} />{" "}
                <span className="fw-bold mx-2">
                  Total Subscribe:{subscribeUser}
                </span>
              </div>
            </div>
          </div>
        )}
        {isUsersVisible && <Users users={users} getAllUser={getAllUser} />}
        {isTokenVisible && <UpdateToken token={token} getToken={getToken} />}
      </div>
    </div>
  );
};

export default AdminDashboard;
