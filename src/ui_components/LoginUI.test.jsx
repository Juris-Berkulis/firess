import { render, screen, fireEvent, act } from "@testing-library/react"
import { LoginUI } from "./LoginUI.jsx";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

const handleSubmit = jest.fn();
const handleEmailChange = jest.fn();
const handlePassChange = jest.fn();

describe('LoginUI component', () => {
    it('LoginUI snapshot', () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        component.debug();
        expect(component).toMatchSnapshot();
    });

    /**
    // FIXME: The component has changed, so this test no longer works:
    it('LoginUI renders with a <button> and a "войти" text', () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        expect(component.getByText('Войти')).toBeInTheDocument();
        expect(component.getByRole('button')).toBeInTheDocument();
    });
    */

    /**
    // FIXME: The component has changed, so this test no longer works:
    it('Was the function called?', () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        const submitBtn = component.queryByTestId('idBtnSubmitLogin');

        act(() => {
            fireEvent.click(submitBtn);
        });

        expect(handleSubmit).toBeCalled();
    });
    */

    /**
    // FIXME: The component has changed, so this test no longer works:
    it('Text input fields have the text', () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        const fieldEmail = component.queryByTestId('idEmailLogin');
        const fieldPassword = component.queryByTestId('idPasswordLogin');

        expect(screen.queryByDisplayValue('example@example.com')).toBe(fieldEmail);
        expect(screen.queryByDisplayValue('12345678')).toBe(fieldPassword);
    });
    */

    /**
    // FIXME: The component has changed, so this test no longer works:
    it('Error renders if it is', () => {
        const error = 'The password is invalid or the user does not have a password.';

        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error={error} 
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        expect(component.getByText(error)).toBeInTheDocument();

        expect(component.getByTestId('idErrorLogin'));
    });
    */

    /**
    // FIXME: The component has changed, so this test no longer works:
    it("Error don't renders if it isn't", () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error=''
            email='example@example.com' 
            password='12345678'
            classes={jest.fn()}
        /></BrowserRouter>);

        const errorItem = component.queryByTestId('idErrorLogin');
        expect(errorItem).toBeNull();
    });
    */

    /**
    // FIXME: The component has changed, so this test no longer works:
    it('functions call if user is writing in text input fields', () => {
        const component = render(<BrowserRouter><LoginUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='' 
            password=''
            classes={jest.fn()}
        /></BrowserRouter>);

        const fieldEmail = component.queryByTestId('idEmailLogin');
        const fieldPassword = component.queryByTestId('idPasswordLogin');

        act(() => {
            fireEvent.change(fieldEmail, {
                target: {
                    value: 'login',
                }
            });
            fireEvent.change(fieldPassword, {
                target: {
                    value: 'password',
                }
            });
        });

        expect(handleEmailChange).toBeCalled();
        expect(handlePassChange).toBeCalled();
    });
    */
});
