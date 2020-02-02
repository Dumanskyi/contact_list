export function helper(url, method, start, success, error, data = undefined) {
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
              dispatch(success(response))

              // if (response.code === 401) {
              //   // TODO: route -> /login
              // } else {
              //   console.log(response)
              //   dispatch(success(response))
              // }
        } catch (e) {
            dispatch(error(e))
        }    
    }
}


export function helper_ID(url, method, start, success, error, user_ID, data = undefined) {
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
              if (response.code === 401) {
                // TODO: route -> /login
              } else {
                dispatch(success(user_ID))
              }

        } catch (e) {
            dispatch(error(e))
        }    
    }
}