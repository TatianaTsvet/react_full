import React, {ReactElement, ReactNode} from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import CreateBookForm from './CreateBookForm';
import { createBookActionCreator } from '../../actions/book-actions';
import { server } from '../../mocks/server';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Books from './Books';


// jest.mock('react-redux', () => ({
//   ...jest.requireActual('react-redux'),
//   useDispatch: () => jest.fn(),
// }));



function renderWithStore(ui: ReactElement) {
    
    const Wrapper = ({children}: {children: ReactNode}) => {
      console.log(children, 'children')
        return (
            <Provider store={store}>{children}</Provider>
        )
    }
    return render(ui, {wrapper: Wrapper})
}


// jest.mock('../../actions/book-actions', () => ({
//   createBookActionCreator: jest.fn(),
// }));

describe('Форма создания книги', () => {
beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockDispatch.mockClear();
    // useDispatch.mockReturnValue(mockDispatch);
  });

  test('отображение формы с полями ввода', () => {
    renderWithStore(<CreateBookForm />);
    expect(screen.getByLabelText(/Book Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Book Author/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create book/i })).toBeInTheDocument();
  });

  test('показ ошибок для пустых полей при отправке', () => {
    renderWithStore(<CreateBookForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /Create book/i }));
    
    expect(screen.getAllByText(/This field is required/i)).toHaveLength(2);
  });

  test('отправка действия при валидной отправке формы', async () => {
    renderWithStore(
    <>
      <CreateBookForm />
      <Books />
      </>
      );
    
    fireEvent.change(screen.getByLabelText(/Book Title/i), {
      target: { value: 'Тестовая книга' },
    });

    fireEvent.change(screen.getByLabelText(/Book Author/i), {
      target: { value: 'Тестовый автор' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create book/i }));

    await waitFor(() => {
      expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
      expect(screen.getByText(/Тестовая книга/i)).toBeInTheDocument();
      expect(screen.getByText(/by Тестовый автор/i)).toBeInTheDocument();
    })
    
  });

  test('очистка полей и состояния ошибок после успешной отправки', () => {
    renderWithStore(<CreateBookForm />);
    
    fireEvent.change(screen.getByLabelText(/Book Title/i), {
      target: { value: 'Тестовая книга' },
    });

    fireEvent.change(screen.getByLabelText(/Book Author/i), {
      target: { value: 'Тестовый автор' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create book/i }));

    expect(screen.getByLabelText(/Book Title/i).value).toBe('');
    expect(screen.getByLabelText(/Book Author/i).value).toBe('');
    expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
  });
  test('ошибки при onSubmit', () => {
    renderWithStore(<CreateBookForm />)

   
    fireEvent.click(screen.getByRole('button', { name: /Create book/i }));

    expect(screen.getAllByText(/This field is required/i)).toHaveLength(2);
  });
});
