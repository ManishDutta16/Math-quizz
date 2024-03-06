
    let timerId = 0;
    // Set the time in minutes
    var time_in_minutes = 0.6;
  
    // Get the button element
    var button = document.querySelector(".focus");
    
  
    const startTimerFunc = ()=>{
        console.log("working");
      var current_time = new Date();
  
      // Calculate the deadline
      var deadline = new Date(
        current_time.getTime() + time_in_minutes * 60 * 1000
      );
  
      // Start the countdown timer
      button.style.display = "none";
  
      var container = document.getElementById("container");
      container.className = "";
  
      timerId = setInterval(function () {
        var t = Date.parse(deadline) - Date.parse(new Date());
  
        // Calculate the days, hours, minutes, and seconds remaining
        var days = Math.floor(t / (24 * 60 * 60 * 1000));
        var hours = Math.floor((t / (60 * 60 * 1000)) % 24);
        var minutes = Math.floor((t / (60 * 1000)) % 60);
        var seconds = Math.floor((t / 1000) % 60);
  
        // Update the countdown timer
        var countdown = document.getElementById("countdown");
        countdown.innerHTML = minutes + "m " + seconds + "s";
        countdown.style.color = "white";
        countdown.style.fontSize = "50px"

        if (t === 1000) {
            console.log("check")
            
          countdown.innerHTML = "";
          clearInterval(timerId);
          button.style.display = "block";
          container.className = "";
        
          Swal.fire(
            'Time Up!',
            '',
            'info'
          )
          .then(() => {
            handleEndGame()
          });
          
        }
      }, 500);
    };

  