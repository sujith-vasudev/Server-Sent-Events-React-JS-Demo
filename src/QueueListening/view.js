import "./view.css"


function ListeningQueueUpdates() {



    function push_to_notification_panel(event, element){
        

        let div = document.createElement("div")
        div.classList = ["notifications"]

        let status_div = document.createElement("div")


        let message_div = document.createElement("div")
        message_div.classList = ["message"]

        let p_div = document.createElement("p")
        p_div.innerHTML = event.data

        message_div.append(p_div)

        div.append(status_div)
        div.append(message_div)

        element.prepend(div)
    }


    function validate(){
    let is_completed;
    let element = document.getElementById("notification-panel")
    element.innerHTML=""


    let eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/azure/listen`);

    
    eventSource.onopen = function (evt) { console.log("Connection Opened") }

    eventSource.addEventListener("message", (event) => {
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
                    <div onClick={validate}>Listen</div>
                </div>
            </div>
            <div className="outer" id="notification-panel">


            </div>
        </div>
    );
}

export default ListeningQueueUpdates;