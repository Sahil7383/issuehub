const IssueList = ({ issues, onStatusChange, onDelete }) => {
    if (issues.length === 0) {
        return <p>No issues found.</p>;
    }

    return (
        <div>
            {issues.map((issue) => (
                <div key={issue._id} className="issue-card">
                    <div>
                        <h3>{issue.title}</h3>

                        <p>{issue.description}</p>

                        <p>
                            Priority: <strong>{issue.priority}</strong>
                        </p>

                        <label>
                            Status:

                            <select
                                value={issue.status}
                                onChange={(event) =>
                                    onStatusChange(issue._id, event.target.value)
                                }
                            >
                                <option value="open">Open</option>
                                <option value="in-progress">In Progress</option>
                                <option value="resolved">Resolved</option>
                            </select>
                        </label>
                    </div>

                    <button onClick={() => onDelete(issue._id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default IssueList;   