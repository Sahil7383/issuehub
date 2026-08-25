import { useState } from "react";

const IssueForm = ({ onCreate }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title.trim() || !description.trim()) {
            return;
        }

        await onCreate({
            title,
            description,
            priority,
        });

        setTitle("");
        setDescription("");
        setPriority("medium");
    };

    return (
        <form onSubmit={handleSubmit} className="issue-form">
            <h2>Create Issue</h2>

            <input
                type="text"
                placeholder="Issue title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <textarea
                placeholder="Description"
                value={description}
                onChange={(event) =>
                    setDescription(event.target.value)
                }
            />

            <select
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button type="submit">
                Create Issue
            </button>
        </form>
    );
};

export default IssueForm;