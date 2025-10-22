import axios from "axios";

export const apiCall = async (url: string, method: "GET" | "POST" = "GET") => {
  try {
    const response = await axios({
      url,
      method,
    //  data: body, // Only used for POST
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("API call error:", error);
    throw error;
  }
};
