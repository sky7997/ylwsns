import React from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSwipeable } from "react-swipeable"; // Import useSwipeable
import "./index.css";

const JobCard = ({ job, onBookmark, onDismiss }) => {
    // Swipeable handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => onDismiss(), // Call the dismiss function on swipe left
        onSwipedRight: () => onBookmark(job), // Call the bookmark function on swipe right
    });

    // Bookmarking logic
    const handleBookmarkJob = () => {
        const jobData = job;
        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const isBookmarked = bookmarkedJobs.some(item => item.id === jobData.id);

        if (isBookmarked) {
            bookmarkedJobs = bookmarkedJobs.filter(item => item.id !== jobData.id);
        } else {
            bookmarkedJobs.push(jobData);
        }

        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    };

    // Check if the job is bookmarked
    let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
    const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);

    return (
        <div {...handlers} className="job-card-container">
            <h1 className="company-name">{job.company_name}</h1>
            <h1 className="job-title">{job.title}</h1>
            <p><strong>Location: </strong>{job.primary_details?.Place || 'Not mentioned'}</p>
            <p><strong>Category: </strong>{job.job_category}</p>
            <p><strong>Role: </strong>{job.job_role}</p>
            <p><strong>Contact Info: </strong>{job.whatsapp_no}</p>
            <div className="button-container">
                <button onClick={handleBookmarkJob} className="bookmark-button">
                    {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                </button>
                <a href={`/jobs/${job.id}`} className="nav-item">View Details</a>
            </div>
        </div>
    );
};

export default JobCard;
