import { allAppComponentsWithPageTitle } from "./consts";

export const NAVIGATION = [
    {
        name: allAppComponentsWithPageTitle.home.displayTitle,
        href: allAppComponentsWithPageTitle.home.path,
    },
    {
        name: allAppComponentsWithPageTitle.profile.displayTitle,
        href: allAppComponentsWithPageTitle.profile.path,
    },
    {
        name: allAppComponentsWithPageTitle.messenger.displayTitle,
        href: allAppComponentsWithPageTitle.messenger.path,
    },
    {
        name: allAppComponentsWithPageTitle.usersApi.displayTitle,
        href: allAppComponentsWithPageTitle.usersApi.path,
    },
];
