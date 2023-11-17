import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "./AdminDashboard";
const UpdateToken = ({ token, getToken }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [newToken, setNewToken] = useState(token.token);

  const updateToken = async (tokenId, newToken) => {
    await axios.put(base_url+`update/${tokenId}`, {
      token: newToken,
    });
    getToken();
    setInputVisible(false);
  };

  return (
    <div className="container">
      <div class="card">
        <h5 class="card-header">Token</h5>
        <div class="card-body">
          <h5 class="card-title">Current Token</h5>
          <div class="card-text d-flex">
            {inputVisible == true ? (
              <input
                type="text"
                class="form-control w-50"
                value={newToken}
                onChange={(e) => setNewToken(e.target.value)}
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            ) : (
              <span>{token.token}</span>
            )}
            {!inputVisible ? (
              <button
                onClick={() => setInputVisible(!inputVisible)}
                class="btn mx-2 btn-sm btn-outline-dark text-capitalize"
              >
                Edit
              </button>
            ) : (
              <button
                onClick={() => updateToken(token._id, newToken)}
                class="btn mx-2 btn-sm btn-dark text-capitalize"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateToken;
