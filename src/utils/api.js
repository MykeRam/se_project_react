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

function normalizeItem(item) {
  return {
    ...item,
    _id: item._id ?? item.id,
    imageUrl: item.imageUrl ?? item.link,
  };
}

function getItems() {
  return request(`${BASE_URL}/items`).then((items) => items.map(normalizeItem));
}

function addItem(itemData) {
  return request(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: itemData.name,
      weather: itemData.weather,
      imageUrl: itemData.imageUrl,
    }),
  })
    .then(normalizeItem);
}

function deleteItem(itemId) {
  return request(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
  }).then(() => {
    return itemId;
  });
}

export { checkResponse, getItems, addItem, deleteItem };
