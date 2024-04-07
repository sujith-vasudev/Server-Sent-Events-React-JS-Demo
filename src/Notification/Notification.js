import "./Notification.css"
import axios from "axios";


function Notification() {



    function push_to_notification_panel(event, element){
        
        let notification_data = JSON.parse(event.data)

        let div = document.createElement("div")
        div.classList = ["notifications"]

        let status_div = document.createElement("div")
        
        status_div.classList = [ notification_data.is_read? "status read": "status unread" ]
        status_div.id = notification_data.notification_id
        status_div.innerHTML = notification_data.is_read? "Read": "Unread"
        status_div.value = notification_data.is_read? "read": "unread"

        status_div.onclick=update_notification


        let message_div = document.createElement("div")
        message_div.classList = ["message"]

        let p_div = document.createElement("p")
        p_div.innerHTML = notification_data.message

        message_div.append(p_div)

        div.append(status_div)
        div.append(message_div)

        element.prepend(div)
    }

    function update_notification(event){

        let status = event.target.value === "read"? false: true
        let notification_id = event.target.id
        axios({
            // Endpoint to send files
            url: `${process.env.REACT_APP_API_BASE_URL}/notification/${notification_id}`,
            method: "PUT",
            headers: {
                // Add any auth token here
                authorization: "your token comes here",
            },
 
            // Attaching the form data
            data: {"is_read": status},
        })
            // Handle the response from backend here
            .then((res) => {
                console.log(res)
                let status = document.getElementById(notification_id)
                status.innerHTML =  res.data.is_read? "Read": "Unread"
                status.classList = [ res.data.is_read? "status read": "status unread" ]
                status.value = res.data.is_read? "read": "unread"

            })
 
            // Catch errors if any
            .catch((err) => {});

    }

    function validate(){
    let is_completed;
    let element = document.getElementById("notification-panel")
    element.innerHTML=""


    let eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/notification`);

    
    eventSource.onopen = function (evt) { console.log("Connection Opened") }
    
    eventSource.addEventListener("running", (event) => {
        push_to_notification_panel(event, element)
    });


    eventSource.addEventListener("completed", (event) => {
        is_completed = true;
    });

    eventSource.onerror = function (evt) {
        if (!is_completed) {
        }
        eventSource.close();
    }

    }

    return (
        <div className='landing'>
            <div className="outer">
                <div className="core">
                    <div onClick={validate}>Validate</div>
                </div>
            </div>
            <div className="outer" id="notification-panel">


            </div>
        </div>
    );
}

export default Notification;