export const fetch_request = async function(url, method, data = undefined, start, success, error) {
  try {
    const request = await fetch(`http://localhost:3000/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      ...(data ? { body: JSON.stringify(data) } : {})
    });
    const response = await request.json();
    if (response.code === 401) {
      // TODO: route -> /login
    } else {
      console.log(response)
      return response;
    }
  } catch (e) {
  }
};


