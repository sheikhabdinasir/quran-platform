// src/pages/TafsiirList.jsx
import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import toast from "react-hot-toast";

const TafsiirList = () => {
 const API =
  `${import.meta.env.VITE_API_URL}/api/tafsiir`;
  

  const [items, setItems] =
    useState([]);

  const [search, setSearch] =
    useState("");



  const [selected, setSelected] =
    useState([]);

  const [deleteId, setDeleteId] =
    useState(null);

  const [showBulk, setShowBulk] =
    useState(false);

  const [editItem, setEditItem] =
    useState(null);

  const [file, setFile] =
    useState(null);


  const [surahs, setSurahs] =
    useState([]);


const [form, setForm] =
  useState({
    juzNumber: "",
    surahNumber: "",
    surahName: "",
    partNumber: "",
    ayahFrom: "",
    ayahTo: "",
    sheikhName: "",
    tafsiirTitle: "",
    description: "",
  });

  /********************************
   LOAD DATA
  ********************************/
  const loadData = async () => {
    try {
      const { data } =
        await axios.get(API);

      setItems(
        data.tafsiir || []
      );
    } catch {
      toast.error(
        "Failed to load"
      );
    }
  };

 
useEffect(() => {
  loadData();
}, []);
  /********************************
   FILTER
  ********************************/
  const filtered =
    items.filter(
      (item) => {
        const matchSearch =
          item.surahName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          item.sheikhName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );



      return matchSearch;

      }
    );

  /********************************
   SELECT
  ********************************/
  const toggleSelect =
    (id) => {
      if (
        selected.includes(
          id
        )
      ) {
        setSelected(
          selected.filter(
            (x) =>
              x !== id
          )
        );
      } else {
        setSelected([
          ...selected,
          id,
        ]);
      }
    };

  const selectAll =
    () => {
      if (
        selected.length ===
        filtered.length
      ) {
        setSelected([]);
      } else {
        setSelected(
          filtered.map(
            (i) =>
              i._id
          )
        );
      }
    };

  /********************************
   DELETE
  ********************************/


const removeItem =
  async (id) => {
    try {
  
      const aToken = localStorage.getItem("aToken");

await axios.delete(
  `${API}/delete/${id}`,
  {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  }
);

      toast.success("Deleted");

      setDeleteId(null);

      loadData();

    } catch {
      toast.error(
        "Delete Failed"
      );
    }
};

const deleteMany = async () => {
  try {

    const aToken = localStorage.getItem("aToken");

await axios.delete(
  `${API}/delete-many`,
  {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
    data: {
      ids: selected,
    },
  }
);

    toast.success("Deleted");

    setShowBulk(false);

    setSelected([]);

    loadData();

  } catch {
    toast.error(
      "Bulk Delete Failed"
    );
  }
};
  /********************************
   TOGGLE 
  ********************************/
  const toggleItem =
    async (id) => {
  
      
      const aToken = localStorage.getItem("aToken");

await axios.patch(
  `${API}/toggle/${id}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  }
);

      toast.success(
        "Updated"
      );

      loadData();
    };

  /********************************
   EDIT OPEN
  ********************************/
  const openEdit =
    async (
      item
    ) => {
      setEditItem(
        item
      );

      setForm({
       juzNumber: item.juzNumber || "",
        surahNumber:
          item.surahNumber ||
          "",
        surahName:
          item.surahName ||
          "",
        partNumber:
          item.partNumber ||
          "",
        ayahFrom:
          item.ayahFrom ||
          "",
        ayahTo:
          item.ayahTo ||
          "",
        sheikhName:
          item.sheikhName ||
          "",
        tafsiirTitle:
          item.tafsiirTitle ||
          "",
        description:
          item.description ||
          "",
 

          
      });

    if (item.juzNumber) {
  const { data } =
    await axios.get(
      `${API}/juz/${item.juzNumber}`
    );

  setSurahs(
    data.surahs || []
  );
}
    };

  /********************************
   JUZ CHANGE
  ********************************/

  

  /********************************
   SURAH CHANGE
  ********************************/
  const handleSurah =
    async (
      number
    ) => {
      const found =
        surahs.find(
          (
            s
          ) =>
            String(
              s.surahNumber
            ) ===
            number
        );

      const {
        data,
      } =
        await axios.get(
          `${API}/next-part/${number}`
        );

      setForm({
        ...form,
        surahNumber:
          number,
        surahName:
          found?.surahName ||
          "",
        partNumber:
          data.nextPart ||
          1,
      });
    };

  /********************************
   UPDATE
  ********************************/
  const updateItem =
    async () => {
      try {
        const fd =
          new FormData();

        Object.entries(
          form
        ).forEach(
          ([
            k,
            v,
          ]) =>
            fd.append(
              k,
              v
            )
        );

        if (
          file
        ) {
          fd.append(
            "file",
            file
          );
        }

     const aToken = localStorage.getItem("aToken");

await axios.put(
  `${API}/update/${editItem._id}`,
  fd,
  {
    headers: {
      Authorization: `Bearer ${aToken}`,
    },
  }
);

        toast.success(
          "Updated Successfully"
        );

        setEditItem(
          null
        );

        setFile(
          null
        );

        loadData();
      } catch {
        toast.error(
          "Update Failed"
        );
      }
    };

  return (
    <div className="p-6 bg-white rounded-xl shadow">

      {/* TOP */}
      <div className="flex justify-between mb-6">

        <h1 className="text-4xl font-bold">
          Maamul dhammaan Tafsiirka
        </h1>

        {selected.length >
          0 && (
          <button
            onClick={() =>
              setShowBulk(
                true
              )
            }
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
            Selected
            (
            {
              selected.length
            }
            )
          </button>
        )}

      </div>

      {/* SEARCH */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <input
          placeholder="Search..."
          value={
            search
          }
          onChange={(
            e
          ) =>
            setSearch(
              e.target
                .value
            )
          }
          className="border p-3 rounded"
        />

     


      </div>

      {/* TABLE */}
<div className="overflow-x-auto w-full">
        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 border">
                <input
                  type="checkbox"
                  onChange={
                    selectAll
                  }
                />
              </th>

              <th className="p-3 border">
                Surah
              </th>

              <th className="p-3 border">
                Sheikh
              </th>

            

              <th className="p-3 border">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filtered.map(
              (
                item
              ) => (
                <tr
                  key={
                    item._id
                  }
                >

                  <td className="p-3 border">
                    <input
                      type="checkbox"
                      checked={selected.includes(
                        item._id
                      )}
                      onChange={() =>
                        toggleSelect(
                          item._id
                        )
                      }
                    />
                  </td>

                  <td className="p-3 border">
                    {
                      item.surahNumber
                    }
                    .{" "}
                    {
                      item.surahName
                    }
                  </td>

                  <td className="p-3 border">
                    {
                      item.sheikhName
                    }
                  </td>

                 

              <td className="p-3 border">

  <div className="flex flex-col sm:flex-row gap-2">

    <button
      onClick={() =>
        openEdit(item)
      }
      className="bg-blue-600 text-white px-3 py-1 rounded"
    >
      Edit
    </button>

   <button
  onClick={() =>
    toggleItem(item._id)
  }
  className={`text-white px-3 py-1 rounded ${
    item.isActive
      ? "bg-green-600"
      : "bg-red-600"
  }`}
>
  {
    item.isActive
      ? "Active"
      : "Inactive"
  }
</button>

    <button
      onClick={() =>
        setDeleteId(item._id)
      }
      className="bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>

  </div>

</td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* EDIT MODAL */}
      {editItem && (
       <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">

        <div className="bg-white w-full max-w-3xl rounded-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="text-2xl font-bold mb-5">
              Edit
              Tafsiir
            </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

             

              <select
                value={
                  form.surahNumber
                }
                onChange={(
                  e
                ) =>
                  handleSurah(
                    e
                      .target
                      .value
                  )
                }
                className="border p-3 rounded"
              >
                <option>
                  Select
                  Surah
                </option>

                {surahs.map(
                  (
                    s
                  ) => (
                    <option
                      key={
                        s.surahNumber
                      }
                      value={
                        s.surahNumber
                      }
                    >
                      {
                        s.surahNumber
                      }
                      .{" "}
                      {
                        s.surahName
                      }
                    </option>
                  )
                )}
              </select>

          <input
  readOnly
  value={form.partNumber}
  placeholder="Part Number"
  className="border p-3 rounded bg-gray-100"
/>

              <input
                value={
                  form.sheikhName
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      sheikhName:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Sheikh Name"
                className="border p-3 rounded"
              />

              <input
                value={
                  form.ayahFrom
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      ayahFrom:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Ayah From"
                className="border p-3 rounded"
              />

              <input
                value={
                  form.ayahTo
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      ayahTo:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Ayah To"
                className="border p-3 rounded"
              />

              <input
                value={
                  form.tafsiirTitle
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      tafsiirTitle:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Rename Title"
                className="border p-3 rounded md:col-span-2"
              />

              <textarea
                value={
                  form.description
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      description:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Description"
                className="border p-3 rounded md:col-span-2"
              />

            <input
  type="file"
accept=".mp3,audio/*"
  onChange={(e) =>
    setFile(
      e.target.files[0]
    )
  }
  className="border p-3 rounded md:col-span-2"
/>
            </div>

           <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setEditItem(
                    null
                  )
                }
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={
                  updateItem
                }
            className="bg-green-600 text-white px-5 py-3 rounded-lg w-full sm:w-auto"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      {/* DELETE ONE */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl">

            <h2 className="text-xl font-bold mb-3">
              Warning
            </h2>

            <p className="mb-5">
              Delete
              this
              Tafsiir?
            </p>

            <div className="flex gap-3 justify-end">

              <button
                onClick={() =>
                  setDeleteId(
                    null
                  )
                }
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  removeItem(
                    deleteId
                  )
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

      {/* BULK */}
      {showBulk && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl">

            <h2 className="text-xl font-bold mb-3">
              Warning
            </h2>

            <p className="mb-5">
              Delete{" "}
              {
                selected.length
              }{" "}
              selected?
            </p>

            <div className="flex gap-3 justify-end">

              <button
                onClick={() =>
                  setShowBulk(
                    false
                  )
                }
             className="border px-5 py-3 rounded-lg w-full sm:w-auto"
              >
                Cancel
              </button>

              <button
                onClick={
                  deleteMany
                }
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default TafsiirList;