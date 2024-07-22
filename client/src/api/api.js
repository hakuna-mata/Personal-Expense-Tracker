import axios from "axios"

const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

export const registerUser = async(user)=>{
    let response = await api.post("/users/register",user)
    return response.data;
}

export const loginUser = async (user) => {
    try {
      const response = await api.post("/users/login", user);
      return response.data;
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

export const logoutUser = async()=>{
    await api.get("/users/logout")
}

export const fetchExpenses = async()=>{
    const response = await api.get("/expenses")
    return response.data
}

export const createExpense = async(expense)=>{
    const response = await api.post("/expenses",expense)
    return response.data;
}

export const updateExpense = async(id,expense)=>{
    const response = await api.put(`/expenses/${id}`,expense)
    return response.data;
}

export const deleteExpense = async(id)=>{
    const response = await api.delete(`/expenses/${id}`)
    return response.data;
}