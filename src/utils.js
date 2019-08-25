export async function login({ username, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "user" && password === "password") {
        resolve();
      } else {
        reject();
      }
    }, 500);
  });
}

const todos = [
  {
    title: "Get milk",
    completed: true
  },
  {
    title: "Make YouTube video",
    completed: false
  },
  {
    title: "Write blog post",
    completed: false
  }
];

export async function fetchTodos() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(todos);
    }, 1000);
  });
}
