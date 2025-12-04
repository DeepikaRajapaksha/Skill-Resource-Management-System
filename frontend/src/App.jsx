// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PersonnelList from "./pages/Personnel/List";
import PersonnelCreate from "./pages/Personnel/Create";
import PersonnelEdit from "./pages/Personnel/Edit";
import SkilllList from "./pages/Skill/List";
import SkillCreate from "./pages/Skill/Create";
import SkillEdit from "./pages/Skill/Edit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/personnel" element={<PersonnelList />} />
          <Route path="/personnel/create" element={<PersonnelCreate />} />
          <Route path="/personnel/edit/:id" element={<PersonnelEdit />} />
          <Route path="/skills" element={<SkilllList />} />
          <Route path="/skills/create" element={<SkillCreate />} />
          <Route path="/skills/edit/:id" element={<SkillEdit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

