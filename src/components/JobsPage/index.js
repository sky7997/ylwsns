import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import axios from 'axios';
import "./index.css";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentJobIndex, setCurrentJobIndex] = useState(0);
    const [bookmarkedJobs, setBookmarkedJobs] = useState(
        JSON.parse(localStorage.getItem('bookmarkedJobs')) || []
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleFetchJobs();
    }, []);

    const handleFetchJobs = () => {
        setLoading(true);

        axios.get(`https://testapi.getlokalapp.com/common/jobs?page=1`)
            .then(response => {
                const fetchedJobs = response.data.results;
                setJobs(fetchedJobs);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching jobs', error);
                setError('Failed to fetch jobs');
                setLoading(false);
            });
    };

    const handleBookmarkJob = (job) => {
        const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);

        const updatedBookmarks = isBookmarked
            ? bookmarkedJobs.filter(item => item.id !== job.id)
            : [...bookmarkedJobs, job];

        setBookmarkedJobs(updatedBookmarks);
        localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks));
    };

    const handleSwipe = (direction) => {
        if (direction === 'left') {
            // Dismiss job on swipe left
            const dismissedJob = jobs[currentJobIndex].title;
            console.log(`Dismissed job: ${dismissedJob}`);
            // Move to the next job, circularly
            setCurrentJobIndex((currentJobIndex + 1) % jobs.length);
        } else if (direction === 'right') {
            // Bookmark job on swipe right
            const bookmarkedJob = jobs[currentJobIndex].title;
            handleBookmarkJob(jobs[currentJobIndex]);
            console.log(`Bookmarked job: ${bookmarkedJob}`);
            // Move to the next job, circularly
            setCurrentJobIndex((currentJobIndex + 1) % jobs.length);
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
    });

    if (loading) {
        return <h2>Loading jobs...</h2>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (jobs.length === 0) {
        return <p>No jobs available.</p>;
    }

    const currentJob = jobs[currentJobIndex];

    return (
        <div {...handlers} className="job-fullscreen-card">
            <div className="job-details">
                <h1>{currentJob.title}</h1>
                <h2>{currentJob.company}</h2>
                <p><strong>Location:</strong> {currentJob.location}</p>
                <p><strong>Job Type:</strong> {currentJob.type || 'N/A'}</p>
                <p><strong>Salary Range:</strong> {currentJob.salary || 'N/A'}</p>
                <p><strong>Description:</strong> {currentJob.description}</p>
                <button
                    onClick={() => handleBookmarkJob(currentJob)}
                    className="bookmark-button"
                >
                    Bookmark
                </button>
            </div>
        </div>
    );
};

export default Jobs;
