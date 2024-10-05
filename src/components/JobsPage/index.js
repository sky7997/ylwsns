import { Component } from "react";
import axios from 'axios';
import JobCard from "../JobCardPage"; // Import JobCard component
import "./index.css";

class Jobs extends Component {
    state = {
        jobs: [],
        page: 1,
        hasMore: true,
        loading: false,
        error: null,
        currentJobIndex: 0, // Tracks the current job being shown
    };

    componentDidMount() {
        this.fetchJobs();
    }

    fetchJobs = () => {
        const { page } = this.state;

        this.setState({ loading: true });

        axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`)
            .then(response => {
                const newJobs = response.data.results;

                if (newJobs.length > 0) {
                    this.setState(prevState => ({
                        jobs: [...prevState.jobs, ...newJobs],
                        page: prevState.page + 1,
                        loading: false,
                    }));
                } else {
                    this.setState({ hasMore: false, loading: false });
                }
            })
            .catch(error => {
                console.error('Error fetching jobs', error);
                this.setState({ loading: false, error: 'Failed to fetch jobs' });
            });
    };

    // Handle swiping right (Bookmark the job)
    handleSwipeRight = () => {
        const { jobs, currentJobIndex } = this.state;
        const currentJob = jobs[currentJobIndex];

        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        const isBookmarked = bookmarkedJobs.some(item => item.id === currentJob.id);

        if (!isBookmarked) {
            bookmarkedJobs.push(currentJob);
        }

        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));

        this.showNextJob(); // Move to the next job after bookmarking
    }

    // Handle swiping left (Dismiss the job)
    handleSwipeLeft = () => {
        this.showNextJob(); // Simply move to the next job
    }

    showNextJob = () => {
        this.setState(prevState => {
            const newIndex = prevState.currentJobIndex + 1;

            if (newIndex >= prevState.jobs.length) {
                // Fetch more jobs if we're at the end of the current list
                this.fetchJobs();
            }

            return { currentJobIndex: newIndex % prevState.jobs.length };
        });
    }

    render() {
        const { jobs, currentJobIndex, error, hasMore } = this.state;
        const currentJob = jobs[currentJobIndex];

        return (
            <div className="jobs-container">
                <h1 className="title">Job Opportunities</h1>
                {error && <p className="error-message">{error}</p>}
                {currentJob && (
                    <JobCard
                        job={currentJob}
                        onSwipeRight={this.handleSwipeRight}
                        onSwipeLeft={this.handleSwipeLeft}
                    />
                )}
                {!currentJob && hasMore && <h4>Loading...</h4>}
                {!hasMore && <p>No more jobs available.</p>}
            </div>
        );
    }
}

export default Jobs;
