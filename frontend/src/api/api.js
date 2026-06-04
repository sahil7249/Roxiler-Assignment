const BASE_URL = "http://localhost:8080/api";

const getHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (path, options = null) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...getHeaders(), ...options.headers },
  });
  const json = await res.json().catch(() => ({ message: "Request failed " }));

  if (!res.ok) {
    throw new Error(json.message);
  }

  const data = await json.data

  return data;
};

export const api = {
  auth: {
    login: (email, password) => 
        request("/auth/login",{
            method : "POST",
            body : JSON.stringify({email,password})
        }),
    register : ({ name,email,password,address,role}) => 
        request("/auth/register",{
            method : "POST",
            body : JSON.stringify({ name,password,email,address,role })
        }),
    updatePassword : ( { currrentPassword,newPassword}) => 
        request("/auth/change-password",{
            method : "PUT",
            body: JSON.stringify({ currrentPassword,newPassword})
        })
  },
};


