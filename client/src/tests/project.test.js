import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import Project from '../pages/Project';
import {
  getProjectMock,
  updateProjectMock,
  deleteProjectMock,
} from './queryMocks';

describe('<Project /> page', () => {
  afterEach(cleanup);

  it('displays loading spinner', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Project />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );

    const loading = screen.getByRole('status');

    expect(loading).toBeInTheDocument();
  });

  it('displays project & client data', async () => {
    render(
      <MockedProvider
        mocks={[getProjectMock, updateProjectMock, deleteProjectMock]}
        addTypename={false}
      >
        <Project />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const projectName = await screen.findByRole('heading', {
      level: 1,
    });
    const projectDesc = await screen.findByRole('heading', { level: 4 });
    const projectStatus = await screen.findByRole('heading', {
      name: /in progress/i,
    });
    const backButton = await screen.findByRole('link', { name: /back/i });
    const clientName = await screen.findByText(/john doe/i);
    const clientEmail = await screen.findByText('john@mailtest.com');
    const clientPhone = await screen.findByText('555-123456');

    expect(projectName).toBeInTheDocument();
    expect(projectDesc).toHaveTextContent(/a testing mock description/i);
    expect(projectStatus).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();

    expect(clientName).toBeInTheDocument();
    expect(clientEmail).toBeInTheDocument();
    expect(clientPhone).toBeInTheDocument();
  });

  it('display update project form and allow changes', async () => {
    const mockSubmit = jest.fn();
    render(
      <MockedProvider
        mocks={[getProjectMock, updateProjectMock, deleteProjectMock]}
        addTypename={false}
      >
        <Project />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const projectName = await screen.findByDisplayValue(/test project/i);
    const projectDesc = await screen.findByDisplayValue(
      /a testing mock description/i
    );
    const projectStatus = await screen.findByRole('combobox');
    const submit = await screen.findByRole('button', {
      name: /submit/i,
    });

    fireEvent.change(projectName, { target: { value: 'Project Alpha' } });
    fireEvent.change(projectDesc, { target: { value: 'Alpha is a test app' } });
    fireEvent.change(projectStatus, { target: { value: 'progress' } });

    expect(projectName.value).toBe('Project Alpha');
    expect(projectDesc.value).toBe('Alpha is a test app');
    expect(projectStatus.value).toBe('progress');

    fireEvent.click(submit, { onClick: mockSubmit() });
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

  it('delete project when delete button is clicked', async () => {
    const mockDelete = jest.fn();

    render(
      <MockedProvider
        mocks={[getProjectMock, updateProjectMock, deleteProjectMock]}
        addTypename={false}
      >
        <Project />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const deleteButton = await screen.findByRole('button', {
      name: /submit/i,
    });

    fireEvent.click(deleteButton, { onClick: mockDelete() });
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
