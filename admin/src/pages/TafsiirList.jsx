// src/pages/TafsiirList.jsx
// FINAL FULL VERSION

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

  const [filter, setFilter] =
    useState("all");

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

  const [juzList, setJuzList] =
    useState([]);

  const [surahs, setSurahs] =
    useState([]);

  const [form, setForm] =
    useState({
      juz: "",
      surahNumber: "",
      surahName: "",
      partNumber: "",
      ayahFrom: "",
      ayahTo: "",
      sheikhName: "",
      tafsiirTitle: "",
      description: "",
      mediaType: "audio",
      sourceType: "link",
      audioUrl: "",
      videoUrl: "",
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

  const loadJuz =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API}/juz`
          );

        setJuzList(
          data.juzList ||
            []
        );
      } catch {}
    };

  useEffect(() => {
    loadData();
    loadJuz();
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

        const matchType =
          filter ===
          "all"
            ? true
            : item.mediaType ===
              filter;

        return (
          matchSearch &&
          matchType
        );
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
      await axios.delete(
        `${API}/delete/${id}`
      );

      toast.success(
        "Deleted"
      );

      setDeleteId(
        null
      );

      loadData();
    };

  const deleteMany =
    async () => {
      await axios.delete(
        `${API}/delete-many`,
        {
          data: {
            ids:
              selected,
          },
        }
      );

      toast.success(
        "Deleted"
      );

      setShowBulk(
        false
      );

      setSelected(
        []
      );

      loadData();
    };

  /********************************
   TOGGLE
  ********************************/
  const toggleItem =
    async (id) => {
      await axios.patch(
        `${API}/toggle/${id}`
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
        juz:
          item.juz ||
          "",
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
        mediaType:
          item.mediaType ||
          "audio",
        sourceType:
          item.sourceType ||
          "link",
        audioUrl:
          item.audioUrl ||
          "",
        videoUrl:
          item.videoUrl ||
          "",
      });

      if (
        item.juz
      ) {
        const {
          data,
        } =
          await axios.get(
            `${API}/juz/${item.juz}`
          );

        setSurahs(
          data.surahs ||
            []
        );
      }
    };

  /********************************
   JUZ CHANGE
  ********************************/
  const handleJuz =
    async (
      value
    ) => {
      setForm({
        ...form,
        juz: value,
        surahNumber:
          "",
        surahName:
          "",
      });

      const {
        data,
      } =
        await axios.get(
          `${API}/juz/${value}`
        );

      setSurahs(
        data.surahs ||
          []
      );
    };

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

        await axios.put(
          `${API}/update/${editItem._id}`,
          fd
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

        <select
          value={
            filter
          }
          onChange={(
            e
          ) =>
            setFilter(
              e.target
                .value
            )
          }
          className="border p-3 rounded"
        >
          <option value="all">
            All
          </option>

          <option value="audio">
            Audio
          </option>

          <option value="video">
            Video
          </option>
        </select>

      </div>

      {/* TABLE */}
      <div className="overflow-auto">

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
                Type
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

                  <td className="p-3 border uppercase">
                    {
                      item.mediaType
                    }
                  </td>

                  <td className="p-3 border space-x-2">

                    <button
                      onClick={() =>
                        openEdit(
                          item
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleItem(
                          item._id
                        )
                      }
                      className="bg-indigo-600 text-white px-3 py-1 rounded"
                    >
                      active
                    </button>

                    <button
                      onClick={() =>
                        setDeleteId(
                          item._id
                        )
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-auto p-5">

          <div className="bg-white w-full max-w-2xl rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Edit
              Tafsiir
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <select
                value={
                  form.juz
                }
                onChange={(
                  e
                ) =>
                  handleJuz(
                    e
                      .target
                      .value
                  )
                }
                className="border p-3 rounded"
              >
                <option>
                  Select
                  Juz
                </option>

                {juzList.map(
                  (
                    j
                  ) => (
                    <option
                      key={
                        j
                      }
                      value={
                        j
                      }
                    >
                      Juz{" "}
                      {
                        j
                      }
                    </option>
                  )
                )}
              </select>

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
                value={
                  form.partNumber
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      partNumber:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Part Number"
                className="border p-3 rounded"
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

              <select
                value={
                  form.mediaType
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      mediaType:
                        e
                          .target
                          .value,
                    }
                  )
                }
                className="border p-3 rounded"
              >
                <option value="audio">
                  Audio
                </option>

                <option value="video">
                  Video
                </option>
              </select>

              <select
                value={
                  form.sourceType
                }
                onChange={(
                  e
                ) =>
                  setForm(
                    {
                      ...form,
                      sourceType:
                        e
                          .target
                          .value,
                    }
                  )
                }
                className="border p-3 rounded"
              >
                <option value="link">
                  External
                  Link
                </option>

                <option value="upload">
                  Upload
                  File
                </option>
              </select>

              {form.sourceType ===
              "upload" ? (
                <input
                  type="file"
                  onChange={(
                    e
                  ) =>
                    setFile(
                      e
                        .target
                        .files[0]
                    )
                  }
                  className="border p-3 rounded md:col-span-2"
                />
              ) : (
                <input
                  value={
                    form.mediaType ===
                    "audio"
                      ? form.audioUrl
                      : form.videoUrl
                  }
                  onChange={(
                    e
                  ) =>
                    form.mediaType ===
                    "audio"
                      ? setForm(
                          {
                            ...form,
                            audioUrl:
                              e
                                .target
                                .value,
                          }
                        )
                      : setForm(
                          {
                            ...form,
                            videoUrl:
                              e
                                .target
                                .value,
                          }
                        )
                  }
                  placeholder="Paste URL"
                  className="border p-3 rounded md:col-span-2"
                />
              )}

            </div>

            <div className="flex justify-end gap-3 mt-6">

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
                className="bg-green-600 text-white px-5 py-2 rounded"
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
                className="border px-4 py-2 rounded"
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