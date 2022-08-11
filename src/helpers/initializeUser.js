export default function initializeUser(gmailUser) {
    let userData = {
        userID: gmailUser.uid,
        email: gmailUser.email,
        displayName: gmailUser.displayName,
        photoURL: gmailUser.photoURL,
        list: {},
    }

    return userData
}
