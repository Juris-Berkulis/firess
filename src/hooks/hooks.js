import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase/firebase";
import { getWindowDimensions, userVerificationWaiting } from "../helper/helper";
import { emailVerificationConfirmationWaitingIsFalse, emailVerificationConfirmationWaitingIsTrue } from "../store/VerificationStatus/Action";

export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
        };

        //* Метод addEventListener() присоединяет обработчик события к определенному DOM-элементу:
        if (window.addEventListener) { //* - для всех основных браузеров.
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        } else if (window.attachEvent) { //* - для IE 8 и более ранних версий, а также Opera 6.0 и более ранних версий.
            window.attachEvent('resize', handleResize);
            return () => window.detachEvent('resize', handleResize);
        }
    }, []);

    return windowDimensions;
};

export const useChangeEmailVerificationStatus = (location) => {
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onIdTokenChanged((user) => {
            if (user && user.emailVerified) {
                setVerified(true); //? - On verification after registration, it always redirects to the address specified in "Redirect" in "PublicRouter".
            } else {
                unsubscribe(); //* - The "unsubscribe()" function unsubscribes the "auth.onIdTokenChanged()" function.
                setVerified(false);
            }
        });
    }, [location]);

    return verified
};

export const useUserVerificationWaiting = (verificationWaitingBoolean, push) => { //* - The "useUserVerificationWaiting ()" function requires the "verificationWaitingBoolean" argument (although it is highlighted as unused), otherwise "useEffect" is looped. The useEffect also requires a verificationWaitingBoolean argument.
    const dispatch = useDispatch();

    useEffect((verificationWaitingBoolean) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            dispatch({
                type: emailVerificationConfirmationWaitingIsFalse.type,
            });

            if (auth.currentUser) {
                auth.currentUser.reload();
            }

            if (user && !user.emailVerified) {
                dispatch({
                    type: emailVerificationConfirmationWaitingIsTrue.type,
                });
        
                const isLoading = userVerificationWaiting(verificationWaitingBoolean, push);
                const waiting = (isLoading && isLoading.waiting ? isLoading.waiting : null);
                if (isLoading && isLoading.clear) {
                    isLoading.clear();
                }

                if (waiting === false) {
                    dispatch({
                        type: emailVerificationConfirmationWaitingIsFalse.type,
                    });
                }
            } else {
                unsubscribe(); //* - The "unsubscribe()" function unsubscribes the "auth.onIdTokenChanged()" function.
            }
        });
    }, [push, dispatch]);
};
