import { useEffect } from 'react';

//* Hook for changing page title
export const useMakePageTitle = (title) => {
    useEffect(() => {
    title ? (document.title = title) : (document.title = 'Fireact Messenger');
    });
};
