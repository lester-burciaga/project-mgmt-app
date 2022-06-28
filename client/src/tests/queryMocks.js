import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_ALL_PROJECTS, GET_PROJECT } from '../queries/projectQueries';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../mutations/projectMutations';

const ID = undefined;

export const getProjectMock = {
  request: {
    query: GET_PROJECT,
    variables: {
      id: ID,
    },
  },
  result: {
    data: {
      project: {
        id: ID,
        name: 'Test Project',
        description: 'A testing mock description',
        status: 'In Progress',
        client: {
          id: ID,
          name: 'John Doe',
          email: 'john@mailtest.com',
          phone: '555-123456',
        },
      },
    },
  },
};

export const updateProjectMock = {
  request: {
    query: UPDATE_PROJECT,
    variables: {
      id: ID,
      name: 'Project Alpha',
      description: 'Alpha is a test app',
      status: 'progress',
    },
  },
  result: {
    data: {
      project: {
        id: ID,
        name: 'Project Alpha',
        description: 'Alpha is a test app',
        status: 'In Progress',
        client: {
          id: ID,
          name: 'John Doe',
          email: 'john@mailtest.com',
          phone: '555-123456',
        },
      },
    },
  },
};

export const deleteProjectMock = {
  request: {
    query: DELETE_PROJECT,
    variables: {
      id: ID,
    },
  },
  result: {
    data: {
      id: ID,
      name: 'Test Project',
    },
  },
};

export const getAllProjectsMock = {
  request: {
    query: GET_ALL_PROJECTS,
    variables: {},
  },
  result: {
    data: {
      projects: [
        {
          id: '1',
          name: 'Project Alpha',
          status: 'In Progress',
        },
        {
          id: '2',
          name: 'Project Beta',
          status: 'Completed',
        },
        {
          id: '3',
          name: 'Project Gamma',
          status: 'Not Started',
        },
      ],
    },
  },
};

export const getClientsMock = {
  request: {
    query: GET_CLIENTS,
    variables: {},
  },
  result: {
    data: {
      clients: [
        {
          id: '1',
          name: 'Bruce Wayne',
          email: 'iambatman@gmail.com',
          phone: '555-987654',
        },
        {
          id: '2',
          name: 'James Howlet',
          email: 'thewolverine@gmail.com',
          phone: '555-456789',
        },
        {
          id: '3',
          name: 'Sherlock Holmes',
          email: 'elementary@gmail.com',
          phone: '555-112358',
        },
      ],
    },
  },
};

