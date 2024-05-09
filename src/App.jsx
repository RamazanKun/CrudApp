import { useState } from 'react';
import BookCard from './components/BookCard';
import DeleteModal from './components/DeleteModal';
import EditModal from './components/EditModal';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
 
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState('');
  const [inputError, setInputError] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

 
  const handleChange = (e) => {
  
    setBookName(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn('Lütfen Kitap İsmi Giriniz', { autoClose: 2000 });
      return;
    }

    
    const newBook = {
      id: v4(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };

    
    setBooks([...books, newBook]);

    
    setBookName('');

   
    toast.success('Kitap Başarıyla Eklendi', {
      autoClose: 2000,
    });
  };


  const handleModal = (id) => {
  
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  // silme işlemini yapar
  const handleDelete = () => {
    // silincek id'ye eşit olmayanları al ve bir diziye aktar
    const filred = books.filter((book) => book.id !== deleteId);

    // state'i güncelleme
    setBooks(filred);

    // modal'ı kapat
    setShowDeleteModal(false);

    // bildirim ver
    toast.error('Kitap Başarıyla Silindi', {
      autoClose: 2000,
    });
  };


  const handleRead = (book) => {
    
    const updatedBook = { ...book, isRead: !book.isRead };

    const index = books.findIndex((item) => item.id === book.id);

    const cloneBooks = [...books];

    cloneBooks[index] = updatedBook;
    
    setBooks(cloneBooks);
  };

 
  const handleEditModal = (book) => {
  
    setEditItem(book);
    setShowEditModal(true);
  };


  const handleEditBook = () => {
    
    const index = books.findIndex((book) => book.id === editItem.id);

    const cloneBooks = [...books];

    cloneBooks.splice(index, 1, editItem);

    setBooks(cloneBooks);

    setShowEditModal(false);

    toast.info('Kitap Güncellendi', {
      autoClose: 2000,
    });
  };

  return (
    <div>
      <header className="bg-dark text-light py-3 fs-5  text-center">
        <h1>Kitap Kurdu</h1>
      </header>
      {/* form */}
      <div className="container">
     
        {inputError && (
          <div className="alert alert-danger mt-5">{inputError}</div>
        )}

        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input
            placeholder="Bir kitap ismi giriniz..."
            onChange={handleChange}
            value={bookName}
            className="form-control shadow"
            type="search"
          />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>

       
        {books.length === 0 && (
          <h4>Henüz herhangi bir kitap eklenmedi</h4>
        )}

       
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            handleModal={handleModal}
            handleRead={handleRead}
            handleEditModal={handleEditModal}
          />
        ))}
      </div>


      {showDeleteModal && (
        <DeleteModal
          handleDelete={handleDelete}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showEditModal && (
        <EditModal
          editItem={editItem}
          setEditItem={setEditItem}
          setShowEditModal={setShowEditModal}
          handleEditBook={handleEditBook}
        />
      )}
    </div>
  );
}

export default App;