export default class GCT_SDK{
    public static challengePass() {
        this.postData("response-callback", true)
    }
    public static challengeNotPass() {
        this.postData("response-callback", false)
    }
    public static challengeError(error?) {
        this.postData("error-callback", false, error)
    }
    public static challengeExpired() {
        this.postData("expired-callback", false)
    }
    public static challengeLoaded() {
        this.postData("loaded-callback", false)
    }
    public static challengeStarted() {
        this.postData("started-callback", false)
    }

    public static postData(type_: string, success_?, data_?) {
        const info = {
            type: type_,
            success: success_,
            data: data_
        };
        if(window?.parent){
            window.parent.postMessage(info, "*")
            console.log(info.type);
        }else{
            console.log("Error: window.parent error")
        }
    }
}
