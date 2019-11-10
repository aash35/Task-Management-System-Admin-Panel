import React, { Component } from 'react'
import { UpdateStatus } from "../../actions/StatusActions"
import { connect } from 'react-redux'
import M from 'materialize-css'

class LogoutLink extends Component {
    handleClick = (e) => {
        var that = this;
        var url = "https://localhost:443/api/ws.php";
        var formData = new FormData();
        formData.append('admin', 'logout');
        fetch(url, {
            method: "POST",
            body: formData
        }) 
            .then(function (response) {
                if (response.status !== 200) {
                    console.log(
                        "Looks like there was a problem. Status Code: " + response.status
                    );
                    return;
                }
                response.json().then(function (data) {
                    if (!data.error) {
                        that.props.UpdateStatus(false);
                    } else {
                        M.toast({ html: "Logout Failed", displayLength: 10000 });
                        // document.getElementById("toast-container").addEventListener("click", toasthide)
                    }
                });
            })
            .catch(function (err) {
                console.log("Fetch Error :-S", err);
            });
    }

    render() {
        return (
            <li>
                <div onClick={this.handleClick}>Logout</div>
            </li>
        );
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        UpdateStatus: (status) => { dispatch(UpdateStatus(status)) }
    }
}

export default connect(null, mapDispatchToProps)(LogoutLink);