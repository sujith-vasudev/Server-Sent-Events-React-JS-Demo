import './basic_sse.css';


function run_checks() {
    let width = 0
    let is_completed;

    let label_obj = document.getElementById("check_label");
    let progress = document.querySelector(".progress");
    let targetContainer = document.getElementById("myBar");

    label_obj.innerHTML = "running.."
    targetContainer.style.width = width + "%";
    targetContainer.innerHTML = width + "%";


    let eventSource = new EventSource(`${process.env.REACT_APP_API_BASE_URL}/stream`);

    eventSource.onopen = (evt)=> { console.log("Connection Opened") }

    eventSource.addEventListener("running", (event) => {
        label_obj.innerHTML = event.data
        targetContainer.innerHTML = event.lastEventId*10 + "%";
        targetContainer.style.width = event.lastEventId*10 + "%";
    });

    eventSource.addEventListener("completed", (event) => {
        is_completed = true;
        label_obj.innerHTML = "Check Completed"
    });

    eventSource.onerror = (evt)=>{
        if (!is_completed) {
            targetContainer.innerHTML = label_obj.innerHTML+ " Failed";
            label_obj.innerHTML = "Check Failed"
            progress.style.backgroundColor = "red";
            label_obj.style.color = "red";
        }
        eventSource.close();
    }

}


function BasicSSELandingPage() {
    return (
        <div className='sse_landing'>
            <div className='container'>

                <div>
                    <div id='check_label'>  </div>
                </div>

                <div>

                    <div className="progress">
                        <div id="myBar" className="progress-value" style={{ width: 0 }}></div>
                    </div>
                </div>

                <div> <button id="btn" onClick={run_checks}>Verify</button></div>


            </div>
        </div>
    );
}

export default BasicSSELandingPage;
