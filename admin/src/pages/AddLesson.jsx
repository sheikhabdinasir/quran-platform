import { useState } from "react";

import { useParams }
from "react-router-dom";

import { useDuruus }
from "../Context/DuruusContext";

import toast
from "react-hot-toast";

const AddLesson = () => {

  const {
    addLesson
  } = useDuruus();

  /* GET BOOK ID */
  const {
    bookId
  } = useParams();

 const [data, setData] = useState({
  title: "",
  order: "",
});

  const [loading,
  setLoading] =
  useState(false);
  const [audioFile, setAudioFile] = useState(null);

  /*********************************
   SUBMIT
  *********************************/
  const submitHandler =
  async (e) => {

    e.preventDefault();

    /* VALIDATION */
 if (
  !data.title ||
  !data.order ||
  !audioFile
) 
    
    
    {

      toast.error(
        "Fadlan buuxi dhammaan xogta"
      );

      return;
    }

    try {

      setLoading(true);

      /* FORM DATA */
      const formData =
      new FormData();

      formData.append(
        "title",
        data.title
      );

      formData.append(
        "order",
        data.order
      );

      formData.append(
        "book",
        bookId
      );

      formData.append(
  "file",
  audioFile
);

      /* SEND DATA */
      await addLesson(
        formData
      );

      toast.success(
        "✅ Casharka waa la keydiyay"
      );

      /* RESET */
     setData({
  title: "",
  order: "",
});

setAudioFile(null);

    } catch (error) {

      console.log(error);

      toast.error(
        "❌ Casharka lama keydin"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-blue-50
      via-white
      to-indigo-50
      flex
      justify-center
      items-start
      px-4
      py-8
    "
    >

      <div
        className="
        w-full
        max-w-2xl
      "
      >

        {/* CARD */}
        <div
          className="
          bg-white
          rounded-3xl
          shadow-xl
          border
          border-gray-100
          overflow-hidden
        "
        >

          {/* TOP */}
          <div
            className="
            h-2
            bg-gradient-to-r
            from-blue-500
            to-indigo-500
          "
          />

          {/* CONTENT */}
          <div className="p-6 sm:p-8">

            {/* HEADER */}
            <div className="text-center mb-8">

              <div
                className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
                text-3xl
                mb-4
              "
              >
                🎧
              </div>

              <h2
                className="
                text-2xl
                sm:text-3xl
                font-bold
                text-gray-800
              "
              >
                Geli Cashar Cusub
              </h2>

              <p
                className="
                text-sm
                text-gray-500
                mt-2
              "
              >
                Casharkan wuxuu
                si toos ah ugu
                xirnaan doonaa
                kitaabka
              </p>

            </div>

            {/* FORM */}
            <form
              onSubmit={
                submitHandler
              }

              className="
              space-y-6
            "
            >

              {/* TITLE */}
              <div>

                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
                >
                  Magaca Casharka
                </label>

                <input
                  type="text"

                  placeholder="
                  Tusaale:
                  Casharka 1aad
                "

                  value={
                    data.title
                  }

                  onChange={(e)=>

                    setData({

                      ...data,

                      title:
                      e.target.value,
                    })
                  }

                  className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                />

              </div>

              {/* ORDER */}
              <div>

                <label
                  className="
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  mb-2
                "
                >
                  Lesson Number
                </label>

                <input
                  type="number"

                  placeholder="1"

                  value={
                    data.order
                  }

                  onChange={(e)=>

                    setData({

                      ...data,

                      order:
                      e.target.value,
                    })
                  }

                  className="
                  w-full
                  rounded-xl
                  border
                  border-gray-200
                  px-4
                  py-3
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
                />

              </div>

            <div>

  <label
    className="
    block
    text-sm
    font-semibold
    text-gray-700
    mb-2
  "
  >
     (MP3 File)
  </label>

  <input
    type="file"
    accept=".mp3,audio/*"
    onChange={(e) =>
      setAudioFile(
        e.target.files[0]
      )
    }
    className="
    w-full
    rounded-xl
    border
    border-gray-200
    px-4
    py-3
  "
  />

</div>

              {/* BUTTON */}
              <button
                type="submit"

                disabled={loading}

                className="
                w-full
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                hover:from-blue-700
                hover:to-indigo-700
                text-white
                font-semibold
                py-3
                rounded-xl
                transition
                duration-200
                disabled:opacity-60
              "
              >

                {
                  loading
                  ? "Saving..."
                  : "➕ Kaydi Casharka"
                }

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddLesson;