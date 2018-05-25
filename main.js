
//Fetch data
function getAllTickets(){
    fetch("https://kea-alt-del.dk/customersupport/")
    .then(res=>res.json())
    .then(showTickets);
}

function showTickets(data){
    let ticketAmount = data.length;
    document.querySelector(".heading .count").textContent = ticketAmount;
    data.sort(function (a, b) {
        return b.importance - a.importance;
      });
    let ticketList = document.querySelector("#tickets");
    let template = document.querySelector("#ticketTemplate").content;
    
    data.forEach(function(ticket){
        
        
        
        let clone = template.cloneNode(true);
        let title = clone.querySelector(".title");
        let priority = clone.querySelector(".priority");
        let time = clone.querySelector(".time");
        let requester = clone.querySelector(".requester");
        let message = clone.querySelector(".message");
        let moreBtn = clone.querySelector(".more");
        let date;
        
        let today = (new Date()).toISOString().slice(0,10).replace(/-/g,"");
        console.log(today);

        let y = today.substring(0, 4);
        let m = today.substring(4, 6);
        let d = today.substring(6,8);

        let newDate = new Date(); // d+"/"+m+"/"+y

        console.log("Test: "+newDate)

        title.textContent = ticket.message;
        if(ticket.importance<40){
            priority.textContent = "Low priority";
            priority.style.backgroundColor = "hsl(120, 100%, 40%)";
        }else if(ticket.importance>=40 && ticket.importance<70){
            priority.textContent = "Medium priority";
            priority.style.backgroundColor = "hsl(60, 100%, 40%)";
        }else if(ticket.importance>=70 && ticket.importance<300){
            priority.textContent = "High priority";
            priority.style.backgroundColor = "hsl(0, 100%, 40%)";
        }
        
        
        

        date = new Date(ticket.time.year, ticket.time.month-1, ticket.time.day);
        var date_diff_indays = function(dt1, dt2) {
         //   dt1 = new Date(date1);
         //   dt2 = new Date(date2);
            return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
        }

        console.log(date.toString());
        console.log(newDate.toString());
        let dayDifference = date_diff_indays(date, newDate);
        
        time.textContent = "Posted "+dayDifference + " days ago" + " at " + ticket.time.hour + ":" + ticket.time.minute + ":" + ticket.time.second;

        if(ticket.middle){
            requester.textContent = "Requested by "+ticket.first + " " + ticket.middle + " " + ticket.last;
        }else{
            requester.textContent = "Requested by "+ticket.first + " " + ticket.last;
        }
        message.textContent = ticket.full.substring(0,75)+"...";
        moreBtn.textContent = "Read more";

        let closeBtn = clone.querySelector("#close-btn");
        closeBtn.addEventListener("click", function(){
            //console.log(event.target.parentElement.parentElement);
            let parent = event.target.parentElement.parentElement;
            parent.classList.add("animate-rem");
            setTimeout(function(){
                parent.remove();
            }, 1000);
            ticketAmount--;
            console.log(ticketAmount);
            document.querySelector(".heading .count").textContent = ticketAmount;
            
            //event.target.parentElement.parentElement.nextSibling.nextSibling.nextSibling.classList.add("move-up");
        });

        
        
        moreBtn.dataset.clicked = false;
        moreBtn.addEventListener("click", function(){
            
            if (moreBtn.dataset.clicked=='false'){
                message.textContent = ticket.full;
                moreBtn.textContent = "Read less";
                moreBtn.dataset.clicked = true;
                console.log(moreBtn.dataset.clicked);
            }else{
                message.textContent = ticket.full.substring(0,75)+"...";
                moreBtn.textContent = "Read more";
                moreBtn.dataset.clicked = false;
            }
            
            
        });

        /*if (moreBtn.textContent = "Read less"){
            moreBtn.addEventListener("click",function(){
                message.textContent = ticket.full.substring(0,75)+"...";
            });
        }*/

        ticketList.appendChild(clone);
        
        

    });

    
    
};

getAllTickets();




//Get the amount of tickets

