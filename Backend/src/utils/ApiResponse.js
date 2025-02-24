class ApiResponse
{
    constructor(statusCode, data, message)
    {
        console.log(statusCode, data , message)
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = true;
    }
}

export default ApiResponse;