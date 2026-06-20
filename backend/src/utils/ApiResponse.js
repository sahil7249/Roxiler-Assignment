export class ApiResponse {
    constructor(statusCode,message,success=true,data='') {
        this.statusCode = statusCode
        this.message = message
        this.success = success
        this.data = data
    }
}