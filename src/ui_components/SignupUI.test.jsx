import { render, screen, fireEvent, act } from "@testing-library/react"
import { SignupUI } from "./SignupUI.jsx";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";

const handleSubmit = jest.fn();
const handleEmailChange = jest.fn();
const handlePassChange = jest.fn();

describe('SignUpUI component', () => {
    it('SignUpUI snapshot', () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        component.debug();
        expect(component).toMatchSnapshot();
    });

    it('SignUpUI renders with a <button> and a "зарегистрироваться" text', () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        expect(component.getByText(/зарегистрироваться/i)).toBeInTheDocument();
        expect(component.getByRole('button')).toBeInTheDocument();
    });

    it('Was the function called?', () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        const submitBtn = component.queryByTestId('idBtnSubmit');

        act(() => {
            fireEvent.click(submitBtn);
        });

        expect(handleSubmit).toBeCalled();
    });

    it('Text input fields have the text', () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        const fieldEmail = component.queryByTestId('idEmail');
        const fieldPassword = component.queryByTestId('idPassword');

        expect(screen.queryByDisplayValue('example@example.com')).toBe(fieldEmail);
        expect(screen.queryByDisplayValue('12345678')).toBe(fieldPassword);
    });

    it('Error renders if it is', () => {
        const error = 'The email address is already in use by another account.';

        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error={error} 
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        expect(component.getByText(error)).toBeInTheDocument();

        expect(component.getByTestId('idError'));
    });

    it("Error don't renders if it isn't", () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error=''
            email='example@example.com' 
            password='12345678'
        /></BrowserRouter>);

        const errorItem = component.queryByTestId('idError');
        expect(errorItem).toBeNull();
    });

    it('functions call if user is writing in text input fields', () => {
        const component = render(<BrowserRouter><SignupUI 
            handleSubmit={handleSubmit} 
            handleEmailChange={handleEmailChange} 
            handlePassChange={handlePassChange}
            error='' 
            email='' 
            password=''
        /></BrowserRouter>);

        const fieldEmail = component.queryByTestId('idEmail');
        const fieldPassword = component.queryByTestId('idPassword');

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
});
