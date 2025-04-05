const baseUrl = "http://localhost:8080";

const Endpoints = {
  login: `${baseUrl}/auth/login`,
  signup: `${baseUrl}/auth/signup`,
  posts: `${baseUrl}/blog/all`,
};

export default Endpoints;
