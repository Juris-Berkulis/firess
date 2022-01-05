import { auth } from "../../firebase/firebase";

export const functionsForMocks = {
    registration: (email, password) => auth.createUserWithEmailAndPassword(email, password),
    checkEmail: () => auth.currentUser.sendEmailVerification(),
    userReload: () => auth.currentUser.reload(),
    login: (email, password) => auth.signInWithEmailAndPassword(email, password),
};
