import { Cloud } from "laf-client-sdk";

const cloud = new Cloud({
  baseUrl: "https://h3ok3d.lafyun.com",
  getAccessToken: () => localStorage.getItem("access_token")!,
});

// regiser function
export async function register(username: string, password: string) {
  const res = await cloud.invoke("register", {
    username: username,
    password: password,
  });

  return res;
}

// login function
export async function login(username: string, password: string) {
  const res = await cloud.invoke("login", {
    username: username,
    password: password,
  });

  if (res.access_token) {
    // save token
    localStorage.setItem("access_token", res.access_token);
  }

  return res;
}