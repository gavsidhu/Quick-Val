import axios from "axios";

export const getURL = () => {
  let url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : (process?.env?.NEXT_PUBLIC_SITE_URL as string); // Set this to your site URL in production env.

  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`;
  // Make sure to including trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export async function fetchIpAddressAndCountry() {
  try {
    const response = await axios.get("https://ipapi.co/json/");
    const data = response.data;
    return { ip_address: data.ip, country: data.country_name };
  } catch (error) {
    console.error("Error fetching IP address and country:", error);
    return { ip_address: "", country: "" };
  }
}
