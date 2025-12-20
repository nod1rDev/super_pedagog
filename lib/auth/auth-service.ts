// Authentication service for backend integration
// Bu faylni keyin backend bilan integratsiya qilish uchun o'zgartiring

import { BASE_URL } from "../BASE_URL";

const API_BASE_URL = BASE_URL + "/auth";

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    user: {
      username: string;
      fio: string;
      bio: string;
      isAdmin: boolean;
    };
  };
  error?: string;
}

interface RegisterResponse {
  success: boolean;
  data?: {
    username: string;
    fio: string;
    bio: string;
    isAdmin: boolean;
  };
  error?: string;
}

export async function loginUser(
  username: string,
  password: string
): Promise<any> {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "i18next=uz");

    const raw = JSON.stringify({
      username,
      password,
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(`${API_BASE_URL}/login`, requestOptions);

    const result = await response.json();

  
    if (result.success) {
      return {
        success: true,
        data: {
          token: result.data.token,
          user: result.data.user,
        },
      };
    } else {
      return {
        success: false,
        error: result.message || "Login yoki parol noto'g'ri",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "Serverga ulanishda xatolik",
    };
  }
}

export async function registerUser(
  username: string,
  fio: string,
  password: string,
  bio: string
): Promise<RegisterResponse> {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "i18next=uz");

    const formdata = new FormData();
    formdata.append("password", password);
    formdata.append("fio", fio);
    formdata.append("bio", bio);
    formdata.append("username", username);

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    const response = await fetch(`${API_BASE_URL}/register`, requestOptions);
    const result = await response.json();

    if (response.ok) {
      return {
        success: true,
        data: result,
      };
    } else {
      return {
        success: false,
        error: result.message || "Ro'yxatdan o'tishda xatolik",
      };
    }
  } catch (error) {
    console.error("Register error:", error);
    return {
      success: false,
      error: "Serverga ulanishda xatolik",
    };
  }
}
