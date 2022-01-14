import { fireEvent } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import { Login } from "./Login";
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { functionsForMocks } from '../../helper/forMocks/functions';
import { Provider } from 'react-redux'
import { store } from "../../store/Store";

jest.mock('../../helper/forMocks/functions');

describe('Login component', () => {
    it('Registration works', () => {
        const login = 'example@example.com';
        const password = '12345678';

        const historyMock = { push: jest.fn(), listen: jest.fn() };

        const component = render(<Provider store={store}><BrowserRouter history={historyMock}><Login /></BrowserRouter></Provider>);

        const fieldEmail = component.queryByTestId('idEmailLogin');
        const fieldPassword = component.queryByTestId('idPasswordLogin');
        const submitBtn = component.queryByTestId('idBtnSubmitLogin');

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

        expect(functionsForMocks.login).toHaveBeenCalledWith(login, password);
    });
});
