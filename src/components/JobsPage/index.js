import { Component } from "react";
import JobCard from "../JobCardPage"; // Import JobCard component
import axios from 'axios';
import "./index.css";

class Jobs extends Component {
    state = {
        jobs: [],
        currentJobIndex: 0,
        bookmarkedJobs: JSON.parse(localStorage.getItem('bookmarkedJobs')) || [],
        page: 1,
        hasMoreJobs: true,
        loading: false,
        error: null,
    };

    componentDidMount() {
        this.fetchJobs();
    }

    fetchJobs = () => {
        const { page, hasMoreJobs } = this.state;

        if (!hasMoreJobs) return;

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
                    this.setState({ hasMoreJobs: false, loading: false });
                }
            })
            .catch(error => {
                console.error('Error fetching jobs', error);
                this.setState({ loading: false, error: 'Failed to fetch jobs' });
            });
    };

    handleBookmarkJob = (job) => {
        this.setState(prevState => {
            const isBookmarked = prevState.bookmarkedJobs.some(item => item.id === job.id);
            let updatedBookmarks;

            if (isBookmarked) {
                // Remove from bookmarks
                updatedBookmarks = prevState.bookmarkedJobs.filter(item => item.id !== job.id);
            } else {
                // Add to bookmarks
                updatedBookmarks = [...prevState.bookmarkedJobs, job];
            }

            localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedBookmarks)); // Update localStorage

            // Move to the next job
            const nextJobIndex = (prevState.currentJobIndex + 1) % prevState.jobs.length;
            return {
                bookmarkedJobs: updatedBookmarks,
                currentJobIndex: nextJobIndex,
            };
        });
    };

    render() {
        const { jobs, currentJobIndex, loading, error, bookmarkedJobs } = this.state;

        if (error) {
            return <p className="error-message">{error}</p>;
        }

        if (loading) {
            return <h4>Loading jobs...</h4>;
        }

        if (jobs.length === 0) {
            return <h4>No jobs available.</h4>;
        }

        const currentJob = jobs[currentJobIndex];
        const isBookmarked = bookmarkedJobs.some(item => item.id === currentJob.id);

        return (
            <div className="jobs-container">
                <h1 className="title">Job Opportunities</h1>
                <JobCard
                    job={currentJob}
                    onBookmark={this.handleBookmarkJob}
                    isBookmarked={isBookmarked} // Pass isBookmarked to JobCard
                />
                {/* Remove the dismiss button */}
            </div>
        );
    }
}

export default Jobs;
