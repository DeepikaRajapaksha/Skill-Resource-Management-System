// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./layout/AdminLayout";
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
import ProjectSkillList from "./pages/ProjectSkill/List";
import ProjectSkillCreate from "./pages/ProjectSkill/Create";
import ProjectSkillEdit from "./pages/ProjectSkill/Edit";
import ProjectAssignmentList from "./pages/ProjectAssignment/List";
import ProjectAssignmentCreate from "./pages/ProjectAssignment/Create";
import ProjectAssignmentEdit from "./pages/ProjectAssignment/Edit";

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
          <Route path="/project-skill" element={<ProjectSkillList />} />
          <Route path="/project-skill/create" element={<ProjectSkillCreate/>} />
          <Route path="/project-skill/edit/:id" element={<ProjectSkillEdit />} />
          <Route path="/project-assignment" element={<ProjectAssignmentList />} />
          <Route path="/project-assignment/create" element={<ProjectAssignmentCreate/>} />
          <Route path="/project-assignment/edit/:id" element={<ProjectAssignmentEdit />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

