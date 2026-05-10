import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AdminContext } from "../Context/AdminContext.jsx";

import {
  MdMenu,
  MdClose,
  MdLogout,
  MdSpaceDashboard,
  MdLibraryAdd,
  MdListAlt,
  MdRecordVoiceOver,
  MdMenuBook,
  MdQueueMusic,
} from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import image from "../assets/adminpicture.png";
/* ===== SIDEBAR CONTENT ===== */
const SidebarContent = ({ onClose, isMobile }) => {
  const { logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-amber-400/20 text-amber-400 shadow"
        : "text-slate-200 hover:bg-white/5 hover:translate-x-1"
    }`;

  const handleLogout = () => {
    logoutAdmin();
    navigate("/login");
  };

  return (
    <>
      {/* CLOSE BUTTON (MOBILE ONLY) */}
      {isMobile && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-white"
        >
          <MdClose size={24} />
        </button>
      )}

      {/* PROFILE */}
      <div className="text-center mb-8 mt-2">
        <img
          src={adminPic}
          alt="Admin"
          className="w-20 h-20 rounded-full mx-auto border-4 border-amber-400 object-cover"
        />

        <h3 className="mt-3 text-sm font-semibold leading-snug">
          مرحبًا بكم في موقع الشيخ عبد الناصر
        </h3>

        <p className="text-xs text-slate-400 mt-2">Welcome Admin</p>
      </div>

      {/* NAVIGATION */}
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={linkClass}>
          <MdSpaceDashboard size={22} /> Dashboard
        </NavLink>

        <NavLink to="/add-tafsiir" className={linkClass}>
          <MdLibraryAdd size={22} /> Add Tafsiir
        </NavLink>
        <NavLink to="/tafsiir-list" className={linkClass}>
          <MdListAlt size={22} /> Tafsiir List
        </NavLink>

        <NavLink to="/add-lecture" className={linkClass}>
          <MdRecordVoiceOver size={22} /> Ku dar Muxaadaro
        </NavLink>

        <NavLink to="/lectures" className={linkClass}>
          <MdListAlt size={22} /> Muxaadarooyinka
        </NavLink>

        <NavLink to="/add-book" className={linkClass}>
          <MdMenuBook size={22} /> Ku dar Kitaab
        </NavLink>

        <NavLink to="/add-lesson" className={linkClass}>
          <MdQueueMusic size={22} /> Ku dar Cashar
        </NavLink>

        <NavLink to="/book-list" className={linkClass}>
          <MdMenuBook size={22} /> DHammaan Kutubta
        </NavLink>

        <NavLink to="/change-password" className={linkClass}>
          <MdMenuBook size={22} /> Change Password
        </NavLink>

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition"
        >
          <MdLogout size={22} /> Logout
        </button>
      </nav>
    </>
  );
};

/* ===== MAIN SIDEBAR ===== */
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div
        className="
          md:hidden flex items-center justify-between
          px-4 py-3
          bg-gradient-to-r
          from-[#0f172a] via-[#020617] to-[#020617]
          text-[#D4AF37]
          shadow-lg
        "
      >
        <h2 className="font-bold text-base tracking-wide">
          لوحة تحكم الإدارة
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="
            p-2 rounded-lg
            text-[#D4AF37]
            hover:bg-white/10
            transition
            active:scale-95
          "
        >
          <MdMenu size={26} />
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className="
          hidden md:flex md:flex-col w-72 min-h-screen
          bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#020617]
          text-white p-6 shadow-2xl
        "
      >
        <SidebarContent />
      </aside>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* SLIDE MENU */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="
                fixed z-50 top-0 left-0 w-72 h-full
                bg-gradient-to-b from-[#0f172a] via-[#020617] to-[#020617]
                text-white p-6 md:hidden
              "
            >
              <SidebarContent
                isMobile
                onClose={() => setOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;