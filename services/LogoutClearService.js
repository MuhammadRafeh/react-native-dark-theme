import AuthService from "./AuthService";
import RequestHelperService from "./RequestHelperService";
import UserService from "./UserService";


export default class LogoutClearService {

    static async invoke() {
        await AuthService.resetToken();
        await UserService.resetUserData();
        await RequestHelperService.resetEndpoint();
    }

}