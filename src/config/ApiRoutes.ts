
export class ApiRoutes{
    static BaseUrl = process.env.REACT_APP_API_BASE_URL || "";
    static GetUsers = `${this.BaseUrl}/api/users`;
    
    static Auth = `${this.BaseUrl}/api/Auth`;
    static Login = `${this.BaseUrl}/api/login`;
};