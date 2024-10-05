import { Component } from "react";
import JobCard from "../JobCardPage";
import "./index.css"

class Bookmark extends Component{
    state={
        bookmarkedJobs : JSON.parse(localStorage.getItem('bookmarkedJobs')) ||[]

    }


    render(){
        const {bookmarkedJobs} = this.state 

        return(
            <div className="bookmarked-jobs-conatiner">
                <h1>Bookmarked Jobs</h1>
                <div>
                    {bookmarkedJobs.length === 0 ? (
                        <h1 className="no-bookmarks">No jobs bookmarked jobs</h1>
                    ) : (
                        bookmarkedJobs.map((job, index) =>(
                            <JobCard key={index} job={job}/>
                        ))
                    )}
                </div>
            </div>
        )
    }
}

export default Bookmark
