import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import AddClientModal from '../components/AddClientModal';

describe('<AddClientModal />', () => {
  it('display add client modal & form inputs', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddClientModal />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    const addClientButton = screen.getByRole('button', {
      name: /add client/i,
    });

    const inputName = screen.getByLabelText(/name/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPhone = screen.getByLabelText(/phone/i);

    expect(addClientButton).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPhone).toBeInTheDocument();
  });

  it('submit a new client', () => {
    const mockSubmit = jest.fn();
    const newClient = {
      name: 'Diana Prince',
      email: 'wonderwoman@gmail.com',
      phone: '555-741852',
    };

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AddClientModal />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );

    const inputName = screen.getByLabelText(/name/i);
    const inputEmail = screen.getByLabelText(/email/i);
    const inputPhone = screen.getByLabelText(/phone/i);
    const submitButton = screen.getByRole('button', {
      name: /submit/i,
      hidden: true,
    });

    fireEvent.change(inputName, { target: { value: newClient.name } });
    fireEvent.change(inputEmail, {
      target: { value: newClient.email },
    });
    fireEvent.change(inputPhone, { target: { value: newClient.phone } });

    expect(inputName.value).toBe(newClient.name);
    expect(inputEmail.value).toBe(newClient.email);
    expect(inputPhone.value).toBe(newClient.phone);

    fireEvent.click(submitButton, { onClick: mockSubmit() });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
