import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../services/ProjectAPI";
import { getAllPersonnel } from "../services/PersonnelAPI";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");

    const fetchData = async () => {
      try {
        const projectsRes = await getAllProjects();
        const personnelRes = await getAllPersonnel();
        setProjects(projectsRes.data);
        setPersonnel(personnelRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };

    fetchData();
  }, [navigate]);

  const handlePrevMonth = () => {
    const prev = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(next);
  };

  const latestProjects = [...projects]
    .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
    .slice(0, 5);

  // Calendar helpers
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const renderCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const totalDays = daysInMonth(month, year);

    const cells = [];
    for (let i = 0; i < firstDay; i++) {
      cells.push(<div key={"empty-" + i} className="calendar-cell empty"></div>);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dayProjects = projects.filter(
        (p) =>
          new Date(p.start_date).getDate() <= day &&
          new Date(p.end_date).getDate() >= day &&
          new Date(p.start_date).getMonth() === month
      );

      const isToday =
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear();

      cells.push(
        <div key={day} className={`calendar-cell ${isToday ? "today" : ""}`}>
          <div className="date">{day}</div>
          {dayProjects.map((p) => (
            <div
              key={p.id}
              className={`calendar-event status-${p.status.toLowerCase()}`}
            >
              {p.name}
            </div>
          ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="dashboard-container">
      {/* Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total Projects</h3>
          <p>{projects.length}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total Developers</h3>
          <p>{personnel.length}</p>
        </div>
      </div>

      {/* Latest Projects */}
      <div className="dashboard-latest-projects">
        <h3>Latest 5 Projects</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {latestProjects.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.status}</td>
                <td>{p.start_date}</td>
                <td>{p.end_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calendar */}
      <div className="dashboard-calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h3>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        <div className="calendar-grid">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}

