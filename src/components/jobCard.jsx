function JobCard({ job, onEdit, onDelete }) {
  return (
    <article className="job-card">
      <div className="job-main">
        <div className="job-info">
          <h3>{job.company}</h3>
          <p className="job-role">{job.role}</p>
          <p className="job-location">{job.location}</p>
        </div>

        <span
          className={`status-badge status-${job.status.toLowerCase()}`}
        >
          {job.status}
        </span>
      </div>

      <div className="job-details">
        <div>
          <span className="detail-label">Applied</span>
          <span>{job.date}</span>
        </div>

        {job.notes && (
          <div>
            <span className="detail-label">Notes</span>
            <span>{job.notes}</span>
          </div>
        )}
      </div>

      <div className="job-actions">
        {job.url && (
          <a
            href={job.url}
            target="_blank"
            rel="noreferrer"
            className="view-link"
          >
            View Job
          </a>
        )}

        <button
          className="edit-button"
          onClick={() => onEdit(job)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default JobCard;