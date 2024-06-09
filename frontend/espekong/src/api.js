import axios from "axios";

const API_URL = "http://localhost:8000";

// Get all items
export const getAllItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-all-items`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Add new item
export const createItem = async (itemData) => {
  try {
    const response = await axios.post(`${API_URL}/create-item`, itemData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete item
export const deleteItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/delete-item/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update item
export const updateItem = async (itemId, itemData) => {
  try {
    const response = await axios.put(
      `${API_URL}/edit-item/${itemId}`,
      itemData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
