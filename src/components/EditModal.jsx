const EditModal = ({
    editItem,
    setEditItem,
    setShowEditModal,
    handleEditBook,
  }) => {
    return (
      <div className="delete-modal">
        <div className="modal-inner">
          <h5>Kitap İsmini Düzenle</h5>
  
          <input
            value={editItem.title}
            type="text"
            className="form-control"
            onChange={(e) =>
              setEditItem({ ...editItem, title: e.target.value })
            }
          />
  
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-warning"
              onClick={() => setShowEditModal(false)}
            >
              Vazgeç
            </button>
            <button
              className="btn btn-success"
              onClick={handleEditBook}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditModal;