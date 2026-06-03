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

function getAuthorizationHeaders(token, withJson = false) {
  const headers = {};

  if (withJson) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return headers;
}

function normalizeItem(item) {
  return {
    ...item,
    _id: item._id ?? item.id,
    imageUrl: item.imageUrl ?? item.link,
    likes: item.likes ?? [],
  };
}

function getItems() {
  return request(`${BASE_URL}/items`).then((items) => items.map(normalizeItem));
}

function addItem(itemData, token) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: getAuthorizationHeaders(token, true),
    body: JSON.stringify({
      name: itemData.name,
      weather: itemData.weather,
      imageUrl: itemData.imageUrl,
    }),
  })
    .then(normalizeItem);
}

function deleteItem(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  }).then(() => {
    return itemId;
  });
}

function addCardLike(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "PUT",
    headers: getAuthorizationHeaders(token),
  }).then(normalizeItem);
}

function removeCardLike(itemId, token) {
  return request(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers: getAuthorizationHeaders(token),
  }).then(normalizeItem);
}

export {
  checkResponse,
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
};
