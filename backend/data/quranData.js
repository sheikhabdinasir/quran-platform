const quranData = [
  /* ================= JUZ 1 ================= */
  { juz: 1, surahNumber: 1, surahName: "الفاتحة" },
  { juz: 1, surahNumber: 2, surahName: "البقرة" },

  /* ================= JUZ 2 ================= */
  { juz: 2, surahNumber: 2, surahName: "البقرة" },

  /* ================= JUZ 3 ================= */
  { juz: 3, surahNumber: 2, surahName: "البقرة" },
  { juz: 3, surahNumber: 3, surahName: "آل عمران" },

  /* ================= JUZ 4 ================= */
  { juz: 4, surahNumber: 3, surahName: "آل عمران" },
  { juz: 4, surahNumber: 4, surahName: "النساء" },

  /* ================= JUZ 5 ================= */
  { juz: 5, surahNumber: 4, surahName: "النساء" },

  /* ================= JUZ 6 ================= */
  { juz: 6, surahNumber: 4, surahName: "النساء" },
  { juz: 6, surahNumber: 5, surahName: "المائدة" },

  /* ================= JUZ 7 ================= */
  { juz: 7, surahNumber: 5, surahName: "المائدة" },
  { juz: 7, surahNumber: 6, surahName: "الأنعام" },

  /* ================= JUZ 8 ================= */
  { juz: 8, surahNumber: 6, surahName: "الأنعام" },
  { juz: 8, surahNumber: 7, surahName: "الأعراف" },

  /* ================= JUZ 9 ================= */
  { juz: 9, surahNumber: 7, surahName: "الأعراف" },
  { juz: 9, surahNumber: 8, surahName: "الأنفال" },
  { juz: 9, surahNumber: 9, surahName: "التوبة" },

  /* ================= JUZ 10 ================= */
  { juz: 10, surahNumber: 9, surahName: "التوبة" },
  { juz: 10, surahNumber: 10, surahName: "يونس" },
  { juz: 10, surahNumber: 11, surahName: "هود" },

  /* ================= JUZ 11 ================= */
  { juz: 11, surahNumber: 11, surahName: "هود" },
  { juz: 11, surahNumber: 12, surahName: "يوسف" },
  { juz: 11, surahNumber: 13, surahName: "الرعد" },
  { juz: 11, surahNumber: 14, surahName: "إبراهيم" },

  /* ================= JUZ 12 ================= */
  { juz: 12, surahNumber: 15, surahName: "الحجر" },
  { juz: 12, surahNumber: 16, surahName: "النحل" },

  /* ================= JUZ 13 ================= */
  { juz: 13, surahNumber: 17, surahName: "الإسراء" },
  { juz: 13, surahNumber: 18, surahName: "الكهف" },

  /* ================= JUZ 14 ================= */
  { juz: 14, surahNumber: 18, surahName: "الكهف" },
  { juz: 14, surahNumber: 19, surahName: "مريم" },
  { juz: 14, surahNumber: 20, surahName: "طه" },

  /* ================= JUZ 15 ================= */
  { juz: 15, surahNumber: 21, surahName: "الأنبياء" },
  { juz: 15, surahNumber: 22, surahName: "الحج" },

  /* ================= JUZ 16 ================= */
  { juz: 16, surahNumber: 23, surahName: "المؤمنون" },
  { juz: 16, surahNumber: 24, surahName: "النور" },
  { juz: 16, surahNumber: 25, surahName: "الفرقان" },

  /* ================= JUZ 17 ================= */
  { juz: 17, surahNumber: 26, surahName: "الشعراء" },
  { juz: 17, surahNumber: 27, surahName: "النمل" },
  { juz: 17, surahNumber: 28, surahName: "القصص" },

  /* ================= JUZ 18 ================= */
  { juz: 18, surahNumber: 29, surahName: "العنكبوت" },
  { juz: 18, surahNumber: 30, surahName: "الروم" },
  { juz: 18, surahNumber: 31, surahName: "لقمان" },
  { juz: 18, surahNumber: 32, surahName: "السجدة" },
  { juz: 18, surahNumber: 33, surahName: "الأحزاب" },

  /* ================= JUZ 19 ================= */
  { juz: 19, surahNumber: 34, surahName: "سبأ" },
  { juz: 19, surahNumber: 35, surahName: "فاطر" },
  { juz: 19, surahNumber: 36, surahName: "يس" },

  /* ================= JUZ 20 ================= */
  { juz: 20, surahNumber: 37, surahName: "الصافات" },
  { juz: 20, surahNumber: 38, surahName: "ص" },
  { juz: 20, surahNumber: 39, surahName: "الزمر" },

  /* ================= JUZ 21 ================= */
  { juz: 21, surahNumber: 40, surahName: "غافر" },
  { juz: 21, surahNumber: 41, surahName: "فصلت" },
  { juz: 21, surahNumber: 42, surahName: "الشورى" },
  { juz: 21, surahNumber: 43, surahName: "الزخرف" },
  { juz: 21, surahNumber: 44, surahName: "الدخان" },
  { juz: 21, surahNumber: 45, surahName: "الجاثية" },

  /* ================= JUZ 22 ================= */
  { juz: 22, surahNumber: 46, surahName: "الأحقاف" },
  { juz: 22, surahNumber: 47, surahName: "محمد" },
  { juz: 22, surahNumber: 48, surahName: "الفتح" },
  { juz: 22, surahNumber: 49, surahName: "الحجرات" },
  { juz: 22, surahNumber: 50, surahName: "ق" },
  { juz: 22, surahNumber: 51, surahName: "الذاريات" },

  /* ================= JUZ 23 ================= */
  { juz: 23, surahNumber: 52, surahName: "الطور" },
  { juz: 23, surahNumber: 53, surahName: "النجم" },
  { juz: 23, surahNumber: 54, surahName: "القمر" },
  { juz: 23, surahNumber: 55, surahName: "الرحمن" },
  { juz: 23, surahNumber: 56, surahName: "الواقعة" },
  { juz: 23, surahNumber: 57, surahName: "الحديد" },

  /* ================= JUZ 24 ================= */
  { juz: 24, surahNumber: 58, surahName: "المجادلة" },
  { juz: 24, surahNumber: 59, surahName: "الحشر" },
  { juz: 24, surahNumber: 60, surahName: "الممتحنة" },
  { juz: 24, surahNumber: 61, surahName: "الصف" },
  { juz: 24, surahNumber: 62, surahName: "الجمعة" },
  { juz: 24, surahNumber: 63, surahName: "المنافقون" },
  { juz: 24, surahNumber: 64, surahName: "التغابن" },

  /* ================= JUZ 25 ================= */
  { juz: 25, surahNumber: 65, surahName: "الطلاق" },
  { juz: 25, surahNumber: 66, surahName: "التحريم" },
  { juz: 25, surahNumber: 67, surahName: "الملك" },
  { juz: 25, surahNumber: 68, surahName: "القلم" },
  { juz: 25, surahNumber: 69, surahName: "الحاقة" },
  { juz: 25, surahNumber: 70, surahName: "المعارج" },

  /* ================= JUZ 26 ================= */
  { juz: 26, surahNumber: 71, surahName: "نوح" },
  { juz: 26, surahNumber: 72, surahName: "الجن" },
  { juz: 26, surahNumber: 73, surahName: "المزمل" },
  { juz: 26, surahNumber: 74, surahName: "المدثر" },
  { juz: 26, surahNumber: 75, surahName: "القيامة" },
  { juz: 26, surahNumber: 76, surahName: "الإنسان" },

  /* ================= JUZ 27 ================= */
  { juz: 27, surahNumber: 77, surahName: "المرسلات" },
  { juz: 27, surahNumber: 78, surahName: "النبأ" },
  { juz: 27, surahNumber: 79, surahName: "النازعات" },
  { juz: 27, surahNumber: 80, surahName: "عبس" },

  /* ================= JUZ 28 ================= */
  { juz: 28, surahNumber: 81, surahName: "التكوير" },
  { juz: 28, surahNumber: 82, surahName: "الإنفطار" },
  { juz: 28, surahNumber: 83, surahName: "المطففين" },
  { juz: 28, surahNumber: 84, surahName: "الإنشقاق" },
  { juz: 28, surahNumber: 85, surahName: "البروج" },

  /* ================= JUZ 29 ================= */
  { juz: 29, surahNumber: 86, surahName: "الطارق" },
  { juz: 29, surahNumber: 87, surahName: "الأعلى" },
  { juz: 29, surahNumber: 88, surahName: "الغاشية" },
  { juz: 29, surahNumber: 89, surahName: "الفجر" },
  { juz: 29, surahNumber: 90, surahName: "البلد" },

  /* ================= JUZ 30 ================= */
  { juz: 30, surahNumber: 91, surahName: "الشمس" },
  { juz: 30, surahNumber: 92, surahName: "الليل" },
  { juz: 30, surahNumber: 93, surahName: "الضحى" },
  { juz: 30, surahNumber: 94, surahName: "الشرح" },
  { juz: 30, surahNumber: 95, surahName: "التين" },
  { juz: 30, surahNumber: 96, surahName: "العلق" },
  { juz: 30, surahNumber: 97, surahName: "القدر" },
  { juz: 30, surahNumber: 98, surahName: "البينة" },
  { juz: 30, surahNumber: 99, surahName: "الزلزلة" },
  { juz: 30, surahNumber: 100, surahName: "العاديات" },
  { juz: 30, surahNumber: 101, surahName: "القارعة" },
  { juz: 30, surahNumber: 102, surahName: "التكاثر" },
  { juz: 30, surahNumber: 103, surahName: "العصر" },
  { juz: 30, surahNumber: 104, surahName: "الهمزة" },
  { juz: 30, surahNumber: 105, surahName: "الفيل" },
  { juz: 30, surahNumber: 106, surahName: "قريش" },
  { juz: 30, surahNumber: 107, surahName: "الماعون" },
  { juz: 30, surahNumber: 108, surahName: "الكوثر" },
  { juz: 30, surahNumber: 109, surahName: "الكافرون" },
  { juz: 30, surahNumber: 110, surahName: "النصر" },
  { juz: 30, surahNumber: 111, surahName: "المسد" },
  { juz: 30, surahNumber: 112, surahName: "الإخلاص" },
  { juz: 30, surahNumber: 113, surahName: "الفلق" },
  { juz: 30, surahNumber: 114, surahName: "الناس" },
];

export default quranData;