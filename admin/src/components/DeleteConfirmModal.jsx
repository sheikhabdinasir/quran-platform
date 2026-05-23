const DeleteConfirmModal = ({
  title,
  message,
  onClose,
  onConfirm
}) => {

  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
    "
    >

      <div
        className="
        bg-white
        w-full
        max-w-sm
        rounded-2xl
        shadow-xl
        p-6
      "
      >

        <h2
          className="
          text-lg
          font-bold
          text-red-600
          mb-2
        "
        >
          ⚠️ {title}
        </h2>

        <p
          className="
          text-gray-700
          mb-6
        "
        >
          {message}
        </p>

        <div
          className="
          flex
          justify-end
          gap-3
        "
        >

          <button
            onClick={onClose}

            className="
            px-4
            py-2
            rounded-lg
            bg-gray-200
            hover:bg-gray-300
          "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}

            className="
            px-4
            py-2
            rounded-lg
            bg-red-600
            text-white
            hover:bg-red-700
          "
          >
            Yes, Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmModal;