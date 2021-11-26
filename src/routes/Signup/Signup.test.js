import { fireEvent } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { Signup } from "./Signup";
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { functionsForMocks } from '../../helper/forMocks/functions';

jest.mock('../../helper/forMocks/functions');

describe('Signup component', () => {
    it('Registration works', () => {
        const login = 'example@example.com';
        const password = '12345678';

        const historyMock = { push: jest.fn(), listen: jest.fn() };

        const component = render(<BrowserRouter history={historyMock}><Signup /></BrowserRouter>);

        const fieldEmail = component.queryByTestId('idEmail');
        const fieldPassword = component.queryByTestId('idPassword');
        const submitBtn = component.queryByTestId('idBtnSubmit');

        act(() => {
            fireEvent.change(fieldEmail, {
                target: {
                    value: login,
                }
            });
            fireEvent.change(fieldPassword, {
                target: {
                    value: password,
                }
            });
        });

        act(() => {
            fireEvent.click(submitBtn);
        });

        expect(functionsForMocks.registration).toHaveBeenCalledWith(login, password);
    });
});
