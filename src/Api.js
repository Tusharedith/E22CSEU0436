const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/api/posts`);
  return res.json();
}

export async function fetchUsers() {
  const res = await fetch(`${BASE_URL}/api/users`);
  return res.json();
}

export async function fetchComments() {
  const res = await fetch(`${BASE_URL}/api/comments`);
  return res.json();
}
