import { act, fireEvent, render, screen } from "@testing-library/react"
import { ProfileUI } from "./ProfileUI";
import '@testing-library/jest-dom';

const toggleChecked = jest.fn();

describe('ProfileUI component', () => {
    it('ProfileUI snapshot', () => {
        const title = 'Заголовок';
        const isChecked = true;
        const myEmailForProps = isChecked ? <span>example@example.com</span> : <span>Скрыто</span>;

        const component = render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        component.debug();
        expect(component).toMatchSnapshot();
    });

    it('ProfileUI renders', () => {
        const title = 'Заголовок';
        const isChecked = true;
        const myEmailForProps = isChecked ? <span>example@example.com</span> : <span>Скрыто</span>;

        render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('Title is right', () => {
        const title = 'Заголовок';
        const isChecked = true;
        const myEmailForProps = isChecked ? <span>example@example.com</span> : <span>Скрыто</span>;

        const component = render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        expect(component.getByText(title)).toBeInTheDocument();
    });

    it('Email is visible', () => {
        const email = 'example@example.com';
        const title = 'Заголовок';
        const isChecked = true;
        const myEmailForProps = isChecked ? <span>{email}</span> : <span>Скрыто</span>;

        const component = render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        expect(component.getByText(email)).toBeInTheDocument();
    });

    it('Email is hidden', () => {
        const email = 'example@example.com';
        const title = 'Заголовок';
        const isChecked = false;
        const myEmailForProps = isChecked ? <span>{email}</span> : <span>Скрыто</span>;

        const component = render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        expect(component.getByText('Скрыто')).toBeInTheDocument();
    });

    it('the function works if an user is pushing on checkbox', () => {
        const email = 'example@example.com';
        const title = 'Заголовок';
        const isChecked = true;
        const myEmailForProps = isChecked ? <span>{email}</span> : <span>Скрыто</span>;

        const component = render(<ProfileUI 
            componentTitle={title} 
            isChecked={isChecked} 
            toggleChecked={toggleChecked} 
            myEmailForProps={myEmailForProps}
        />);

        const checkbox = component.getByRole('checkbox');

        act(() => {
            fireEvent.click(checkbox);
        });

        expect(toggleChecked).toBeCalled();
    });
});
