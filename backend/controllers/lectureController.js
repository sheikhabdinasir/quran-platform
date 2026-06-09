import Lecture from "../models/LectureModel.js";




export const addLecture = async (req, res) => {
  try {

    const {
  title,
  speaker,
  description,
} = req.body;

   if (
  !title ||
  !speaker ||
  !description ||
  !req.file
) {
      return res.status(400).json({
        success: false,
        message: "Dhammaan meelaha waa khasab",
      });
    }

 const lecture = await Lecture.create({
  title,
  speaker,
  description,
  audioUrl: req.file.path,
  publicId: req.file.filename,
});
    res.status(201).json({
      success: true,
      data: lecture,
    });

  } catch (error) {

    console.error(
      "Add Lecture Error:",
      error
    );

    res.status(500).json({
      success: false,
    });
  }
};

// ============================
// USER GET ACTIVE
// ============================
export const getActiveLectures = async (req, res) => {
  try {
 
   const list = await Lecture.find({
  isActive: true,
}).sort({
  createdAt: -1,
});
    res.json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ============================
// ADMIN GET ALL
// ============================
export const getAdminLectures = async (req, res) => {
  try {

    const list = await Lecture.find().sort({
  createdAt: -1,
});
    res.json({ success: true, data: list });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ============================
// GET SINGLE
// ============================
export const getSingleLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture lama helin",
      });
    }

    res.json({
      success: true,
      data: lecture,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Khalad ayaa dhacay",
    });
  }
};

// ============================
// UPDATE LECTURE
// ============================
export const updateLecture = async (req, res) => {
  try {
   const { title, speaker, description } = req.body;

if (!title || !speaker || !description) {
  return res.status(400).json({ success: false });
}

    
const updated = await Lecture.findByIdAndUpdate(
  req.params.id,
  {
    title,
    speaker,
    description,
  },
  { new: true }
);

if (!updated) {
  return res.status(404).json({
    success: false,
    message: "Lecture lama helin",
  });
}

res.json({
  success: true,
  data: updated,
});

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// ============================
// TOGGLE ACTIVE
// ============================

export const toggleLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture lama helin",
      });
    }

    lecture.isActive = !lecture.isActive;

    await lecture.save({ validateBeforeSave: false });

    res.json({
      success: true,
      isActive: lecture.isActive,
    });

  } catch (error) {
    console.error("Toggle Lecture Error:", error);

    res.status(500).json({
      success: false,
      message: "Khalad ayaa dhacay",
    });
  }
};

// ============================
// DELETE LECTURE
// ============================
export const deleteLecture = async (req, res) => {
  try {
    const lecture = await Lecture.findByIdAndDelete(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture lama helin",
      });
    }

    res.json({
      success: true,
      message: "Lecture si guul leh ayaa loo tirtiray",
    });

  } catch (error) {
    console.error("Delete Lecture Error:", error);

    res.status(500).json({
      success: false,
      message: "Khalad ayaa dhacay",
    });
  }
};



// ============================
// ⭐ TOGGLE FAVORITE
// ============================
export const toggleFavorite = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture lama helin",
      });
    }

    lecture.isFavorite = !lecture.isFavorite;

    await lecture.save({
      validateBeforeSave: false,
    });

    res.json({
      success: true,
      isFavorite: lecture.isFavorite,
    });

  } catch (error) {
    console.error("Toggle Favorite Error:", error);

    res.status(500).json({
      success: false,
      message: "Khalad ayaa dhacay",
    });
  }
};


// ============================
// ⭐ GET ONLY FAVORITES
// ============================
export const getFavoriteLectures = async (req, res) => {
  try {

    const list = await Lecture.find({
  isActive: true,
  isFavorite: true,
}).sort({
  createdAt: -1,
});
    res.json({
      success: true,
      data: list,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
    });

  }
};