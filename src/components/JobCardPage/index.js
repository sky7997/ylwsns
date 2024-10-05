import { Component } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import "./index.css";

class JobCard extends Component {
    handleBookmarkJob = () => {
        const { job, onBookmark } = this.props; // Pass the onBookmark function from props
        onBookmark(job); // Call the onBookmark function
    };

    render() {
        const { job, isBookmarked } = this.props; // Get isBookmarked from props

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
