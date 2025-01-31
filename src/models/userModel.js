// import {
//   authFirebase,
//   signInWithEmailAndPassword,
// } from "../config/Firebase/firebaseConfig";
// import axios from "axios";

const RUTA_SERVIDOR = `${import.meta.env.VITE_APP_RUTA_API}`;


import { useUserStore } from "../stores/userStore";

async function registerWithFirebase(userData) {
  try {
    const { email, name, surname, birthdate, direction, password, isAdmin, acceptedTyC } =
      userData;

    //Cambiar ruta de api
    const response = await fetch(`${RUTA_SERVIDOR}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        surname,
        birthdate,
        direction,
        password,
        isAdmin,
        acceptedTyC
      }),
    });

    //Si la respuesta no es satisfactoria
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Error creating user.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

async function saveUserDataInFirebase(userData) {
  try {
    const { email, name, surname, birthdate, direction, isAdmin, uid } =
      userData;

    //Cambiar ruta de api
    const response = await fetch(`${RUTA_SERVIDOR}/users/saveUserData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        surname,
        birthdate,
        direction,
        isAdmin,
        uid,
      }),
    });

    //Si la respuesta no es satisfactoria
    console.log("response: ", response);
    if (!response.ok) {
      throw new Error("Error saving user data in firebase.");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
}

async function sendEmail(to, subject, text) {
  try {
    console.log("TOOO: ", to);
    const response = await fetch(`${RUTA_SERVIDOR}/users/sendMail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to, subject, text }),
    });

    //Si la respuesta no es satisfactoria
    if (!response.ok) {
      throw new Error("Error sending mail.");
    }

    const res = await response.json();
    return res;
  } catch (error) {
    throw error;
  }
}

async function deleteUserById(id) {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error deleting user.");
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw error;
  }
}

const getAllUsers = async () => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/`);

    if (!response.ok) {
      throw new Error("Error fetching users");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/user/${id}`);
    if (!response.ok) {
      throw new Error("Unable to find user.");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const { email, name, surname } = userData;
    const response = await fetch(`${RUTA_SERVIDOR}/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: id,
        email,
        name,
        surname,
      }),
    });

    if (!response.ok) {
      throw new Error("Error updating user");
    }
    return response.ok;
  } catch (error) {
    throw error;
  }
};

const getUserRewards = async (id) => {
  try {
    const response = await fetch(`${RUTA_SERVIDOR}/users/userRewards/${id}`);
    if (!response.ok) {
      throw new Error("Unable to get the user rewards.");
    }
    const userRewards = await response.json();
    return userRewards;
  } catch (error) {
    throw error;
  }
};

const getUserProduct = async (userId, fileName) => {
  try {
    const response = await fetch(
      `${RUTA_SERVIDOR}/users/userProduct/${userId}/${fileName}`
    );
    if (!response.ok) {
      throw new Error("Unable to get the user product.");
    }
    const userProduct = await response.json();
    return userProduct;
  } catch (error) {
    throw error;
  }
};

const updateUserAvatar = async (userId, downloadURL) => {
  try {

    // Actualiza el avatar en tu base de datos
    const response = await fetch(`${RUTA_SERVIDOR}/users/user/avatar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ avatar: downloadURL, userId }),
    });


    if (!response.status) {
      console.error('Failed to update avatar');
      return { status: false, message: response.message };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading file or saving URL to Firestore:', error);
    return { status: false, message: "Failed to update avatar: ", error };
  }
};









export {
  registerWithFirebase,
  getAllUsers,
  getUser,
  updateUser,
  deleteUserById,
  sendEmail,
  saveUserDataInFirebase,
  getUserRewards,
  getUserProduct,
  updateUserAvatar
};
