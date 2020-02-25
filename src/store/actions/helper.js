
export function helper(url, method, start, success, error, data = undefined, id = undefined, transormData = undefined, categories) {
    return async dispatch => {
        dispatch(start())

        try {
            const request = await fetch(`http://localhost:3000/${url}`, {
                method,
                headers: {
                  "Content-Type": "application/json"
                },
                ...(data ? { body: JSON.stringify(data) } : {})
              });
              const response = await request.json();
              if (method === "DELETE") {
                dispatch(success(id)) 
              } else if (method === "PUT") {
                dispatch(success(data))
              } else {
                if (transormData) {
                  let obj = transormData(response, data, categories)
                  dispatch(success(obj))
                  return obj 
                } else {
                  dispatch(success(response))
                }
              }
    
        } catch (e) {
            dispatch(error(e))
        }    
    }
}






