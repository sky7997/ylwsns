import { Component } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import "./index.css";

class JobCard extends Component {
    constructor(props) {
        super(props);
        this.touchStartX = 0;
        this.touchEndX = 0;
    }

    handleBookmarkJob = () => {
        const job = this.props.job;
        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);

        if (isBookmarked) {
            bookmarkedJobs = bookmarkedJobs.filter(item => item.id !== job.id);
        } else {
            bookmarkedJobs.push(job);
        }

        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
        this.forceUpdate(); // Re-render after bookmarking
    }

    handleTouchStart = (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
    }

    handleTouchEnd = (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
    }

    handleSwipe = () => {
        if (this.touchStartX - this.touchEndX > 50) {
            // Swipe left - Dismiss job
            this.props.onSwipeLeft();
        }

        if (this.touchEndX - this.touchStartX > 50) {
            // Swipe right - Bookmark job
            this.props.onSwipeRight();
        }
    }

    render() {
        const { job } = this.props;

        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);

        return (
            <div
                className="job-card-container"
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
            >
                <h1 className="company-name">{job.company_name}</h1>
                <h1 className="job-title">{job.title}</h1>
                <p><strong>Location: </strong>{job.primary_details?.Place || 'Not mentioned'}</p>
                <p><strong>Category: </strong>{job.job_category}</p>
                <p><strong>Role: </strong>{job.job_role}</p>
                <p><strong>Contact Info: </strong>{job.whatsapp_no}</p>
                <div className="button-container">
                    <button onClick={this.handleBookmarkJob} className="bookmark-button">
                        {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                    </button>
                </div>
            </div>
        );
    }
}

export default JobCard;
