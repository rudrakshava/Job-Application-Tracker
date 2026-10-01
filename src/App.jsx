import { useEffect, useState } from "react";
import JobCard from "./components/jobCard.jsx";
import JobForm from "./components/jobForm.jsx";
const defaultJobs = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Hyderabad",
    status: "Applied",
    date: "2026-09-20",
    url: "https://careers.google.com/",
    notes: "Applied through the company careers page.",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "React Developer",
    location: "Bangalore",
    status: "Interview",
    date: "2026-09-15",
    url: "https://careers.microsoft.com/",
    notes: "Technical interview scheduled.",
  },
  {
    id: 3,
    company: "Amazon",
    role: "Software Engineer",
    location: "Remote",
    status: "Rejected",
    date: "2026-09-10",
    url: "https://www.amazon.jobs/",
    notes: "Application closed.",
  },
];

function App() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("job-tracker-applications");

    return savedJobs ? JSON.parse(savedJobs) : defaultJobs;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem(
      "job-tracker-applications",
      JSON.stringify(jobs)
    );
  }, [jobs]);

  function handleSaveJob(jobData) {
    if (editingJob) {
      setJobs(
        jobs.map((job) =>
          job.id === editingJob.id
            ? { ...job, ...jobData }
            : job
        )
      );

      setEditingJob(null);
    } else {
      const newJob = {
        id: Date.now(),
        ...jobData,
      };

      setJobs([newJob, ...jobs]);
    }

    setShowForm(false);
  }

  function handleDeleteJob(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmed) {
      setJobs(jobs.filter((job) => job.id !== id));
    }
  }

  function handleEditJob(job) {
    setEditingJob(job);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingJob(null);
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || job.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const interviewCount = jobs.filter(
    (job) => job.status === "Interview"
  ).length;

  const offerCount = jobs.filter(
    (job) => job.status === "Offer"
  ).length;

  const rejectedCount = jobs.filter(
    (job) => job.status === "Rejected"
  ).length;

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Job Tracker</h1>
          <p>Keep track of your job applications.</p>
        </div>

        <button
          className="add-button"
          onClick={() => {
            setEditingJob(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? "Close Form" : "+ Add Application"}
        </button>
      </header>

      <main>
        {showForm && (
          <JobForm
            onSave={handleSaveJob}
            onCancel={handleCloseForm}
            editingJob={editingJob}
          />
        )}

        <section className="stats">
          <div className="stat-card">
            <span>Total Applications</span>
            <strong>{jobs.length}</strong>
          </div>

          <div className="stat-card">
            <span>Interviews</span>
            <strong>{interviewCount}</strong>
          </div>

          <div className="stat-card">
            <span>Offers</span>
            <strong>{offerCount}</strong>
          </div>

          <div className="stat-card">
            <span>Rejected</span>
            <strong>{rejectedCount}</strong>
          </div>
        </section>

        <section className="applications">
          <div className="section-heading">
            <div>
              <h2>Your Applications</h2>
              <span>
                {filteredJobs.length} of {jobs.length} applications
              </span>
            </div>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search company, role or location..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
            />

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="job-list">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEditJob}
                  onDelete={handleDeleteJob}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No applications found</h3>
              <p>
                Try changing your search or add a new application.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;