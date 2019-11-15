import React, { Component } from "react";
import { connect } from 'react-redux'
// import M from 'materialize-css'
// import CreateNewForm from './CreateNewForm'
// import UpdateForm from './UpdateForm'
import { JobTypeActionsSelect } from "../../actions/JobTypeActions"

class JobTypeDisplayer extends Component {    
    render() {
        return ( 
            <div>
                <h1>Job Type</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        job_type: state.job_type.job_types
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        JobTypeActionsSelect: (status) => { dispatch(JobTypeActionsSelect(status)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobTypeDisplayer);