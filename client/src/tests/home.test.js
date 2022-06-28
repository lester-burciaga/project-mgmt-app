import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

import Home from '../pages/Home';
import { getAllProjectsMock, getClientsMock } from './queryMocks';

describe('<Home /> page', () => {
  afterEach(cleanup);

  it('displays loading spinner', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Home />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );

    const loading = screen.getAllByRole('status');

    expect(loading[0]).toBeInTheDocument();
  });

  it('displays projects & clients cards', async () => {
    render(
      <MockedProvider
        mocks={[getAllProjectsMock, getClientsMock]}
        addTypename={false}
      >
        <Home />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const addClientButton = await screen.findByRole('button', {
      name: /add client/i,
    });
    const addProjectButton = await screen.findByRole('button', {
      name: /new project/i,
    });
    const projectName = await screen.findAllByText((content) =>
      content.startsWith('Project')
    );
    const projectStatus = await screen.findAllByText((content) =>
      content.startsWith('Status:')
    );
    const clientData = await screen.findAllByRole('cell');

    expect(addClientButton).toBeInTheDocument();
    expect(addProjectButton).toBeInTheDocument();

    expect(projectName[0]).toHaveTextContent('Project Alpha');
    expect(projectStatus[0]).toHaveTextContent('Status: In Progress');
    expect(projectName[1]).toHaveTextContent('Project Beta');
    expect(projectStatus[1]).toHaveTextContent('Status: Completed');
    expect(projectName[2]).toHaveTextContent('Project Gamma');
    expect(projectStatus[2]).toHaveTextContent('Status: Not Started');

    expect(clientData[0]).toHaveTextContent(/bruce wayne/i);
    expect(clientData[1]).toHaveTextContent('iambatman@gmail.com');
    expect(clientData[2]).toHaveTextContent('555-987654');
  });

  it('go to project page when view button is clicked', async () => {
    const mockLink = jest.fn();
    render(
      <MockedProvider
        mocks={[getAllProjectsMock, getClientsMock]}
        addTypename={false}
      >
        <Home />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const projectView = screen.getAllByRole('link');

    expect(projectView[1]).toHaveAttribute('href', '/projects/2');
    fireEvent.click(projectView[1], { onClick: mockLink() });
    expect(mockLink).toHaveBeenCalledTimes(1);
  });

  it('call delete client function when delete button is clicked', async () => {
    const mockDelete = jest.fn();
    render(
      <MockedProvider
        mocks={[getAllProjectsMock, getClientsMock]}
        addTypename={false}
      >
        <Home />
      </MockedProvider>,
      { wrapper: MemoryRouter }
    );
    await new Promise((resolve) => setTimeout(resolve, 10));

    const clientName = await screen.findByRole('cell', {
      name: /sherlock holmes/i,
    });
    const deleteButton = await screen.findAllByRole('cell');

    expect(clientName).toBeInTheDocument();

    fireEvent.click(deleteButton[11], { onClick: mockDelete() });
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
});
