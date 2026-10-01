import { useEffect, useState } from "react";

function JobForm({ onSave, onCancel, editingJob }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("Applied");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editingJob) {
      setCompany(editingJob.company);
      setRole(editingJob.role);
      setLocation(editingJob.location);
      setStatus(editingJob.status);
      setDate(editingJob.date);
      setUrl(editingJob.url);
      setNotes(editingJob.notes);
    } else {
      setCompany("");
      setRole("");
      setLocation("");
      setStatus("Applied");
      setDate(new Date().toISOString().split("T")[0]);
      setUrl("");
      setNotes("");
    }
  }, [editingJob]);

  function handleSubmit(event) {
    event.preventDefault();

    if (!company.trim() || !role.trim() || !location.trim()) {
      return;
    }

    onSave({
      company: company.trim(),
      role: role.trim(),
      location: location.trim(),
      status,
      date,
      url: url.trim(),
      notes: notes.trim(),
    });
  }

  return (
    <section className="application-form">
      <div className="form-header">
        <div>
          <h2>
            {editingJob ? "Edit Application" : "Add Application"}
          </h2>

          <p>
            {editingJob
              ? "Update the details of this application."
              : "Add a new job application to your tracker."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label>Company *</label>

            <input
              type="text"
              placeholder="e.g. Google"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Job Title *</label>

            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Location *</label>

            <input
              type="text"
              placeholder="e.g. Hyderabad"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Status</label>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div className="form-field">
            <label>Application Date</label>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Job URL</label>

            <input
              type="url"
              placeholder="https://..."
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>

          <div className="form-field full-width">
            <label>Notes</label>

            <textarea
              placeholder="Add interview details, recruiter information, reminders..."
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows="4"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button type="submit" className="save-button">
            {editingJob ? "Update Application" : "Save Application"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default JobForm;