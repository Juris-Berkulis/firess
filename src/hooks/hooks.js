import { useEffect, useState } from "react";
import { getWindowDimensions } from "../helper/helper";

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
