import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getWindowDimensions, userVerificationWaiting } from "../helper/helper";

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

export const useUserVerificationWaiting = (setLoad, push) => {
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (auth.currentUser) {
                auth.currentUser.reload();
            }

            if (user && !user.emailVerified) {
                setLoad(true)
        
                userVerificationWaiting(setLoad, push);
            } else {
                unsubscribe(); //* - The "unsubscribe()" function unsubscribes the "auth.onIdTokenChanged()" function.
            }
        });

        return () => setLoad(false);
    }, [setLoad, push]);
};
