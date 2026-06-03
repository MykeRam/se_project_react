const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(new Error(`Request failed: ${res.status}`));
  }

  return res.json();
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function signup({ name, avatar, email, password }) {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
}

function signin({ email, password }) {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
}

function getUserData(token) {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

function updateUserData(token, userData) {
  return request(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: userData.name,
      avatar: userData.avatar,
    }),
  });
}

export { checkResponse, signup, signin, getUserData, updateUserData };
