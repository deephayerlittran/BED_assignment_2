export class ApiResponse {
    static success(data: any, message = "Success") {
        return {
            success: true,
            message,
            data,
        };
    }

    static error(message = "Error", details: any = null) {
        return {
            success: false,
            message,
            details,
        };
    }
}
