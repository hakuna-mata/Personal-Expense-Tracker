import React, { useState, useEffect } from "react";

const useErrorBoundary = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleError = (event) => {
            setError(event.error);
            event.preventDefault();
        };

        window.addEventListener("error", handleError);
        return () => {
            window.removeEventListener("error", handleError);
        };
    }, []);

    return { error, reset: () => setError(null) };
};

const ErrorBoundary = ({ children }) => {
    const { error, reset } = useErrorBoundary();

    if (error) {
        return (
            <div>
                <h1>Something went wrong: {error.message}</h1>
                <button onClick={reset}>Try again</button>
            </div>
        );
    }

    return <>{children}</>;
};

export default ErrorBoundary;
