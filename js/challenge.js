window.addEventListener("load", function() {
    const counterElement = document.getElementById("counter");
    let counterValue = parseInt(counterElement.innerText);
  
    const minusButton = document.getElementById("minus");
    const plusButton = document.getElementById("plus");
    const heartButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const restartButton = document.getElementById("restart");
    const likesList = document.getElementById("likes-list");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentsContainer = document.getElementById("list");
  
    let isPaused = false;
    let intervalId;
    let likes = {};
  
    minusButton.addEventListener("click", function() {
      counterValue--;
      counterElement.innerText = counterValue;
    });
  
    plusButton.addEventListener("click", function() {
      counterValue++;
      counterElement.innerText = counterValue;
    });
  
    heartButton.addEventListener("click", function() {
      if (!likes[counterValue]) {
        likes[counterValue] = 0;
      }
      likes[counterValue]++;
      updateLikesList();
    });
  
    pauseButton.addEventListener("click", function() {
      if (isPaused) {
        // Resume the counter
        intervalId = setInterval(function() {
          if (!isPaused) {
            counterValue++;
            counterElement.innerText = counterValue;
          }
        }, 1000);
        pauseButton.innerText = "pause";
        enableButtons();
      } else {
        // Pause the counter
        clearInterval(intervalId);
        pauseButton.innerText = "resume";
        disableButtons();
      }
      isPaused = !isPaused;
    });
  
    restartButton.addEventListener("click", function() {
      counterValue = 0;
      counterElement.innerText = counterValue;
      likes = {};
      updateLikesList();
      enableButtons();
      pauseButton.innerText = "pause";
      isPaused = false;
      clearInterval(intervalId);
      intervalId = setInterval(function() {
        if (!isPaused) {
          counterValue++;
          counterElement.innerText = counterValue;
        }
      }, 1000);
    });
  
    commentForm.addEventListener("submit", function(e) {
      e.preventDefault();
      const comment = commentInput.value;
      if (comment.trim() !== "") {
        const commentElement = document.createElement("p");
        commentElement.innerText = comment;
        commentsContainer.appendChild(commentElement);
        commentInput.value = "";
      }
    });
  
    function updateLikesList() {
      likesList.innerHTML = "";
      for (const key in likes) {
        const listItem = document.createElement("li");
        listItem.innerText = `Number ${key} has been liked ${likes[key]} times`;
        likesList.appendChild(listItem);
      }
    }
  
    function disableButtons() {
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
      restartButton.disabled = true;
    }
  
    function enableButtons() {
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
      restartButton.disabled = false;
    }
  
    intervalId = setInterval(function() {
      if (!isPaused) {
        counterValue++;
        counterElement.innerText = counterValue;
      }
    }, 1000);
  });
  