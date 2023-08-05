const clientHostName = window.location.hostname;

let backEndHostName;

if (clientHostName === "localhost") {
  backEndHostName = "http://localhost:8181";
} else if (clientHostName === "spring.com") {
  backEndHostName = "https://";
}

export const API_BASE_URL = backEndHostName;
export const SHOP = "/shop";
export const USER = "/api/auth";
export const SOLAR = "/solar";
export const NEWS = "/news";
