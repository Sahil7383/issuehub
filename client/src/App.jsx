import { useEffect, useState } from "react";

import IssueForm from "./components/IssueForm";
import IssueList from "./components/IssueList";

import {
  getIssues,
  createIssue,
  updateIssue,
  deleteIssue,
} from "./api/issues";

const App = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getIssues();

      setIssues(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const handleCreate = async (issue) => {
    try {
      const createdIssue = await createIssue(issue);

      setIssues((currentIssues) => [
        createdIssue,
        ...currentIssues,
      ]);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const updatedIssue = await updateIssue(id, {
        status,
      });

      setIssues((currentIssues) =>
        currentIssues.map((issue) =>
          issue._id === id ? updatedIssue : issue
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteIssue(id);

      setIssues((currentIssues) =>
        currentIssues.filter((issue) => issue._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>IssueHub</h1>
        <p>Simple issue tracking</p>
      </header>

      <IssueForm onCreate={handleCreate} />

      {error && (
        <div className="error">
          {error}
        </div>
      )}

      {loading ? (
        <p>Loading issues...</p>
      ) : (
        <IssueList
          issues={issues}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default App;