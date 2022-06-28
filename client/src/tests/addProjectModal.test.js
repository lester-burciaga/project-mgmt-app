import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import AddProjectModal from '../components/AddProjectModal';
import { getClientsMock } from './queryMocks';

describe('<AddProjectModal />', () => {
  it('display new project modal & form inputs', async () => {
    render(
      <MockedProvider mocks={[getClientsMock]} addTypename={false}>
        <AddProjectModal />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const newProjectButton = await screen.findByRole('button', {
      name: /new project/i,
    });
    const inputName = screen.getByLabelText(/name/i);
    const inputDescription = screen.getByLabelText(/description/i);
    const selectStatus = screen.getByLabelText(/status/i);
    const submitButton = await screen.findByRole('button', {
      name: /submit/i,
      hidden: true,
    });

    expect(newProjectButton).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(selectStatus).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('submit a new project', async () => {
    const mockSubmit = jest.fn();
    const newProject = {
      name: 'Project Weapon X',
      description: 'X Force team integrated by mutants',
      status: 'new',
      client: '2',
    };

    render(
      <MockedProvider mocks={[getClientsMock]} addTypename={false}>
        <AddProjectModal />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const inputName = await screen.findByLabelText(/name/i);
    const inputDescription = await screen.findByLabelText(/description/i);
    const selectStatus = await screen.findByLabelText(/status/i);
    const selectClient = await screen.findByLabelText(/client/i);
    const submitButton = await screen.findByRole('button', {
      name: /submit/i,
      hidden: true,
    });

    fireEvent.change(inputName, { target: { value: newProject.name } });
    fireEvent.change(inputDescription, {
      target: { value: newProject.description },
    });
    fireEvent.change(selectStatus, { target: { value: newProject.status } });
    fireEvent.change(selectClient, { target: { value: newProject.client } });

    expect(inputName.value).toBe(newProject.name);
    expect(inputDescription.value).toBe(newProject.description);
    expect(selectStatus.value).toBe(newProject.status);
    expect(selectClient.value).toBe(newProject.client);
    console.log(selectClient)

    fireEvent.click(submitButton, { onClick: mockSubmit() });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});
