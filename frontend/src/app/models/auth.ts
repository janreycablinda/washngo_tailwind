export interface AuthCredential {
    username: String,
    password: String,
    remember?: Boolean
}

export interface AuthResponseData {
    access_token: String
}
