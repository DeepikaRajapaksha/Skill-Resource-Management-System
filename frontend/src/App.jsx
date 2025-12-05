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
import PersonnelSkillsList from "./pages/PersonnelSkills/List";
import PersonnelSkillsCreate from "./pages/PersonnelSkills/Create";
import PersonnelSkillsEdit from "./pages/PersonnelSkills/Edit";
import ProjectList from "./pages/Project/List";
import ProjectCreate from "./pages/Project/Create";
import ProjectEdit from "./pages/Project/Edit";

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
          <Route path="/personnel-skills" element={<PersonnelSkillsList />} />
          <Route path="/personnel-skills/create" element={<PersonnelSkillsCreate/>} />
          <Route path="/personnel-skills/edit/:id" element={<PersonnelSkillsEdit />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/create" element={<ProjectCreate/>} />
          <Route path="/projects/edit/:id" element={<ProjectEdit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

