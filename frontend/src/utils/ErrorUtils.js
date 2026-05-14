const extractErrorMessages = (err) => {
    
    if(!err) return null

    if(err.response?.data){

        const data = err.response.data;

        // handle zod validation error (array format)
        if(data.error && Array.isArray(data.error)){
            return data.error.map(err => err.error).join(", ")
        }

        // Handle single error message
        if(data.message){
            return data.message
        }


        // Handle error field 
        if(data.error){
            return data.error
        }

    }

    // Handle nerwork Error
    if(err.response && !err.response){
        return "network error: Please check your connection"
    }

    // General errors
    if(err.message){
        return err.message
    }

    // if all is missed
    return "Something went wrong"

}

export default extractErrorMessages;