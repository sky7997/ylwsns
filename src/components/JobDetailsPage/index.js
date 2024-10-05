import { Component } from "react";
import axios from 'axios'
import { ThreeDots } from "react-loader-spinner";
import "./index.css"


class JobDetails extends Component{
    state ={
        job:null,
        loading:true,
        error:null,
    }

    componentDidMount(){
        const jobId = this.props.match.params.id 

        axios.get(`https://testapi.getlokalapp.com/common/jobs/${jobId}`)
        .then(response =>{
            const jobs = response.data.results
            console.log(jobs)
            const job = jobs.find(job => job.id === parseInt(jobId))
            this.setState({
                job:job|| null,
                loading:false
            })
        })
        .catch(error =>{
            this.setState({
                error: 'Error fetching jobs',
                loading:false
            })
        })
    }

    render(){

        const {job, loading, error} = this.state

        if(loading) return <ThreeDots color="#000"/>
        if(error) return <p>{error}</p>
        if(!job) return <p>No jobs Found</p>
        return(
            <div>
                <h1>Job Details :</h1>
            <div className="job-details-container">
            
                <h1 className="company-name">{job.company_name}</h1>
                <h1 className="job-title">{job.title}</h1>
                <p><strong>Loaction: </strong>{job.primary_details?.Place || 'Not mentioned'}</p>
                <p><strong>Experience: </strong>{job.primary_details?.Experience || 'Not mentioned'}</p>
                <p><strong>Job Type: </strong>{job.primary_details?.Job_Type || 'Not mentioned'}</p>
                <p><strong>Qualification: </strong>{job.primary_details?.Qualification || 'Not mentioned'}</p>
                <p><strong>Category: </strong>{job.job_category}</p>
                <p><strong>Role: </strong>{job.job_role}</p>
                <p><strong>Contact Info: </strong>{job.whatsapp_no}</p>
                <p><strong>Salary: </strong>{job.salary_min} - {job.salary_max}</p>
                <p><strong>No.of Openings: </strong>{job.openings_count}</p>
                <p><strong>No.of Applications: </strong>{job.num_applications}</p>
            </div>
            </div>
        )
    }
}

export default JobDetails