import { Component } from "react";
import axios from 'axios';
import JobCard from "../JobCardPage"; // Ensure you import your existing JobCard component
import "./index.css";

class Jobs extends Component {
    state = {
        jobs: [],
        bookmarkedJobs: JSON.parse(localStorage.getItem('bookmarkedJobs')) || [],
        hasMore: true,
        page: 1,
        loading: false,
        error: null,
        currentJobIndex: 0, // Track the current job being displayed
    };

    componentDidMount() {
        this.handleFetchJobs();
    }

    handleFetchJobs = () => {
        const { page } = this.state;
        this.setState({ loading: true });

        axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`)
            .then(response => {
                const newJobs = response.data.results;

                if (newJobs.length > 0) {
                    this.setState(prevState => ({
                        jobs: [...prevState.jobs, ...newJobs],
                        page: prevState.page + 1,
                        loading: false
                    }));
                } else {
                    this.setState({ hasMore: false, loading: false });
                }
            })
            .catch(error => {
                console.log('Error fetching jobs', error);
                this.setState({ loading: false, error: 'Failed to fetch jobs' });
            });
    }

    handleBookmarkJob = (job) => {
        let { bookmarkedJobs } = this.state;
        const isBookmarked = bookmarkedJobs.some(item => item.id === job.id);
        
        if (!isBookmarked) {
            bookmarkedJobs.push(job);
            console.log(`Bookmarked job: ${job.title}`);
        } else {
            console.log(`Job already bookmarked: ${job.title}`);
        }

        this.setState({ bookmarkedJobs });
        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    };

    handleDismissJob = () => {
        this.setState(prevState => {
            const nextIndex = (prevState.currentJobIndex + 1) % prevState.jobs.length; // Cycle through jobs
            return { currentJobIndex: nextIndex };
        });
    };

    render() {
        const { jobs, currentJobIndex, error } = this.state;

        // Ensure there are jobs to display
        if (jobs.length === 0) {
            return <p>Loading jobs...</p>;
        }

        const currentJob = jobs[currentJobIndex];

        return (
            <div className="jobs-container">
                <h1 className="title">Job Opportunities</h1>
                {error && <p className="error-message">{error}</p>}

                <div className="job-card-container">
                    <JobCard
                        job={currentJob}
                        onBookmark={this.handleBookmarkJob}
                        onDismiss={this.handleDismissJob}
                    />
                </div>

                {/* Optional: Add swipe handlers for left/right swipes here */}
            </div>
        );
    }
}

export default Jobs;
