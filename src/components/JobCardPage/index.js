import { Component } from "react";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import "./index.css";

class JobCard extends Component {

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
        this.forceUpdate();
    }

    render() {
        const { job } = this.props;

        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);

        return (
            <div className="job-card-container">
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
                    <a href={`/jobs/${job.id}`} className="nav-item">View Details</a>
                </div>
            </div>
        );
    }
}

export default JobCard;
