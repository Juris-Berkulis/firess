import { auth } from "../../firebase/firebase";

export const functionsForMocks = {
    registration: (email, password) => auth.createUserWithEmailAndPassword(email, password)
};