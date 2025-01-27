const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
  try {
    const loginUser = await fetch(API_URL || "api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const { success, token, error } = await loginUser.json();

    if (success) {
      const getUser = await fetch("api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const { _id, name, email } = await getUser.json();

      return { user: { id: _id, name, email }, token };
    } else {
      return { error };
    }
  } catch (error) {
    return { error };
  }
};

export const verifyUser = async (token) => {
  try {
    const user = await fetch(API_URL || "api/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const { error, ...userDetails } = await user.json();

    if (error) {
      throw { error };
    }

    return userDetails;
  } catch (error) {
    return { error };
  }
};
