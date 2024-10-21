export const handler = async(event) => {
    let response = {
        "isAuthorized": false
    }
    
    if (
        event.headers?.authorization === process.env.authorizationKey || 
        event.headers?.Authorization === process.env.authorizationKey ||
        event.headers?.AUTHORIZATION === process.env.authorizationKey
    ) {
        console.log("allowed")
        response = {
            "isAuthorized": true
        }
    }

    return response
}
