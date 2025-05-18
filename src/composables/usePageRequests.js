export default function usePageRequests() {
  const makePostRequest = async (url, body, headers = {}) => {
    const accessToken = localStorage.getItem("jwt_token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json();

        if (
          errorData.statusCode === "INTERNAL_SERVER" ||
          errorData.message === "UnauthorizedException"
        ) {
          localStorage.removeItem("jwt_token");
          window.location.href = "/login";
          return { status: "error" };
        }

        return {
          status: errorData.status || response.status,
          statusText: errorData.message || response.statusText,
          error: errorData.error || response.error || 0,
          message: errorData.message || response.message || "",
          type: errorData.type || response.type || "",
          details: errorData.details || response.details || "",
        };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        status: "error",
        message: "Lỗi mạng hoặc không thể kết nối đến server.",
      };
    }
  };

  return {
    makePostRequest,
  };
}
