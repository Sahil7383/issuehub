const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL;

export const getIssues = async () => {
    const response = await fetch(`${API_BASE_URL}/issues`);

    if (!response.ok) {
        throw new Error("Failed to fetch issues");
    }

    return response.json();
};

export const createIssue = async (issue) => {
    const response = await fetch(`${API_BASE_URL}/issues`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(issue),
    });

    if (!response.ok) {
        throw new Error("Failed to create issue");
    }

    return response.json();
};

export const updateIssue = async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });

    if (!response.ok) {
        throw new Error("Failed to update issue");
    }

    return response.json();
};

export const deleteIssue = async (id) => {
    const response = await fetch(`${API_BASE_URL}/issues/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete issue");
    }
};