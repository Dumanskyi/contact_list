
export function helper(url, method, start, success, error, data = undefined, id = undefined, transormData = undefined) {
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

              if (id !== undefined) {
                dispatch(success(id)) 
              } else {
            
                if (transormData) {
                  let obj = transormData(response, data)
                  dispatch(success(obj)) 
                } else {
                  dispatch(success(response))
                }
              }
    
        } catch (e) {
            dispatch(error(e))
        }    
    }
}



