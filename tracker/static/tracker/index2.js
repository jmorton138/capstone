document.addEventListener('DOMContentLoaded', function() {
    //console.log(csrftoken);
    
     
    console.log(user)
    var home = document.querySelector("#home");
    if (home) {
        home.addEventListener('click', () => (display('home')));
    }
    var logo = document.querySelector("#logo");
    if (logo) {
        logo.addEventListener('click', () => (display('home')));
    }

    // var new_mini = document.querySelector("#new-habit");
    // if (new_mini) {
    //     new_mini.addEventListener('submit', () => new_habit());
    // }

    var register= document.querySelector("#register");
    if (register) {
        register.addEventListener('click', () => display('register'));
    }

    var login = document.querySelector("login-rtrn");
    if (login) {
        login.addEventListener('click', () => display('login'));
    }

    var chart = document.querySelector("#charts");
    if (chart) {
        chart.addEventListener('click', () => display('chart'));
    }

    var history = document.querySelector('#history');
    if (history) {
        history.addEventListener('click', () => display('history'));
    }
    // var showLog = document.querySelector('#login-rtrn');
    // if (showLog) {
    //     showLog.addEventListener('click', () => showLogin());
        
    // }
    var skillPrompt = document.getElementById('new-skill');
    var habitForm = document.getElementById('habit-form');
    if (skillPrompt) {
        document.querySelector('#display').innerHTML='';
    }
    if (habitForm) {
        document.querySelector('#display').innerHTML='';
    }
    //const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    if (user != 'AnonymousUser') {
        get_habits();
    }

    // var loginForm = document.getElementById('lgn-form'); 
    // if (loginForm) {
    //     loginForm.addEventListener('submit', e => login(e));
    // }
    
    class Session {
        constructor(logged_in, username) {
            this.logged_in = logged_in;
            this.username = username;

        }
    }

    if (localStorage.getItem('token')) {
        this.logged_in = true;
        console.log(localStorage.getItem('token'))
        fetch('http://localhost:8000/current_user/', {
        headers: {
            "Content-Type" : "application/json", 
            "Authorization": `JWT ${localStorage.getItem('token')}`,
        }
      })
      .then(res => res.json())
      .then(json => {
        this.username = json.username;
        console.log(this.username);
    });
    } else {
        this.logged_in = false;
    }
    console.log(this.logged_in);
    
    

});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want? 
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}




// function get_index() {
//     fetch('http://127.0.0.1:8000/')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     });
// }

function goBack() {
    window.location.assign('http://127.0.0.1:8000/');
}
function display(form) {
    var display = document.querySelector('#display');
    if (form == 'home') {
        display.innerHTML = `<div id ="habits">
        </div> `;
        var ideas = document.getElementById('ideas')
        if (ideas) {
           ideas.innerHTML= `<button id ="idea-button" onclick="showIdeas()">Need Ideas?</button>`;
        }
        get_habits();
    }
    if (form == 'register') {

        //document.getElementById('login').hidden = true;
       // document.getElementById('reg-div').hidden = false;
        document.querySelector('#login').innerHTML ='';
        document.querySelector('#login').outerHTML = `<div id="login"> <h1>Create Account</h1><form id="reg-form" >
       <div class="form-group">
       <span class="label" for="username">Username:</span>
         <input type="text" class="form-control" id="username" name="username">
       </div>
       <div class="form-group">
       <span class="label" for="password">Password:</span>
         <input type="password" id="password" name="password">
       </div>
       <button type="submit" id="reg-btn" class="reg-btn" value="register">Create Account</button>
     </form>
     <div class="lgn-tag">
     <p>Already have an account? <a id="login-rtrn" onClick="display('login')"> Login here.</a></p>
   </div>
     </div>
  `;
    document.getElementById('reg-form').addEventListener('submit', e => register(e));
   //<button  class="rtrn-btn" value="return" onclick="showLogin()">Return to Login</button>
   //document.querySelector("lgn-tag").innerHTML =``;
    }
    if (form == 'chart') {
        display.innerHTML = `<canvas id="myChart"></canvas>`;
        getChart('chart-habits');
    }
    if (form == 'history') {
       display.innerHTML = '';
       getSkills();
    }
    if (form == 'login') {
        document.getElementById('login').outerHTML =
        `<div id="login" class="login">
        <h1>Login</h1>
        <form id="lgn-form">
            <label class="label" for="username">Username:</label>
            <input type="text" class="form-control" id="username" name="username">
    
            <label class="label" for="password">Password:</label>
            <input type="password" id="password" name="password">
    
          
          <button type="submit" class="login-btn" value="login">Login</button>
    
        </form>
        <div class="lgn-tag">
          <p>Don't have an account? <a id="register" onclick="display('register')"> Register here.</a></p>
        </div>
      </div>`;
      document.getElementById('lgn-form').addEventListener('submit', e => login(e))

    }

}

// function showLogin() {
//     //document.getElementById('register').innerHTML = '';
//     document.getElementById('login').outerHTML =
//     `<div id="login">
//     <h1>Login</h1>
//     <form onSubmit="login()" method="post">
//         <label class="label" for="username">Username:</label>
//         <input type="text" class="form-control" id="username" name="username">

//         <label class="label" for="password">Password:</label>
//         <input type="password" id="password" name="password">

      
//       <button type="submit" class="login-btn" value="login">Login</button>

//     </form>
//     <div class="lgn-tag">
//       <p>Don't have an account? <a id="register" onclick="display('register')"> Register here.</a></p>
//     </div>
//   </div>`;
// }

// function handleErrors(response) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }



function register(e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch('http://127.0.0.1:8000/user-list', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
    
              }),
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            this.logged_in = true;
            this.username = json.username;
            console.log(this.username);
            console.log(this.logged_in);

        });
   
    }


function login(e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch('http://127.0.0.1:8000/token-auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            
          },
          credentials: 'include',
          mode: 'same-origin',
          body: JSON.stringify({
            username: document.querySelector('#username').value,
            password: document.querySelector('#password').value  
          })
        })
        .then(res => res.json())
        .then(json => {
            localStorage.setItem('token', json.token);
            this.logged_in = true;
            this.username = json.user.username;
            console.log(this.username);
            console.log(this.logged_in);
            });

}

function logout() {
    localStorage.removeItem('token');
    Session.logged_in = false;
    Session.username = '';
    display('login');
}


function get_habits() {
    document.querySelector('#display').innerHTML = `<div id ="habits">
    </div>`;
    var skillPrompt = document.getElementById('new-skill');
    var habitForm = document.getElementById('habit-form');
    if (skillPrompt) {
        document.querySelector('#display').innerHTML='';
    }
    if (habitForm) {
        document.querySelector('#display').innerHTML='';
    }
   

    //document.querySelector('#habits').innerHTML = '';
    fetch('http://127.0.0.1:8000/habit-list')
    .then(response => response.json())
    .then(habits => {
        
        habits.map((habit) => {
            const li = document.createElement('div');
            li.id = `${habit.id}-div`;
            const habitdiv = document.createElement('div');
            li.appendChild(habitdiv);
         
            habitdiv.outerHTML =`<div class="habit">${habit.mini_goal}</div>`
            document.querySelector('#habits').append(li);
            if (habit === habits[0]) {
                get_current_boxes(habit.id);
            } else {
                get_boxes(habit.id);
            }
            
            //return highlight_check(habits[0].id);
        })

        })
    //});
    }


function check(habit_id) {
const csrftoken = getCookie('csrftoken');
  const array = [1, 2, 3, 4, 5, 6, 7];
  counter = 0;
  consist = 0;
  for (i = 1; i < array.length + 1; i++) {
    let box = document.getElementById(`${habit_id}-d${i}`);
    if (box.value === 'true') {
        box.checked = true;
        counter++;
        consist =  (counter/7) * 100;
        //console.log(consist)
    } else {
        box.checked = false;
    }
  }
  fetch(`http://127.0.0.1:8000/consistency/${habit_id}`, {
    method: 'PUT',
    headers: {
        'Content-type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
        mini_goal: document.getElementById(`${habit_id}-div`).firstElementChild.innerText,
        consistency: consist
    })
})
.then(response => response.json())
.then(result => {
    
});
}

function updateCheck(habit_id, e) {
    e.preventDefault();
    var box_value = e.target.value;
    let day = e.target.name;
    //console.log(e.target)
    if (box_value == 'true') {
        box_value = false;
    } else if (box_value == 'false') {
        box_value = true;
    }
// works?
    fetch(`http://127.0.0.1:8000/update/${habit_id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            [day]: box_value,
            mini_goal: habit_id
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    });
    
    e.target.value = box_value;
    check(habit_id);
 
   
}
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};


function highlight_check(habit_id) {   
    fetch(`http://127.0.0.1:8000/habit/${habit_id}`)
    .then(response => response.json())
    .then(habit => {
        var date = new Date(habit[0].start_date)
        date = date.setHours(0,0,0,0);
        date = new Date(date);
        var today = new Date();
        const array = [1, 2, 3, 4, 5, 6];
          for (i = 1; i < array.length+1; i++) {
              if (date.addDays(i-1) <= today && today < date.addDays(i)) {
                //var bold_box = document.getElementById(`${habit_id}-d${i}-label`)
                document.getElementById(`${habit_id}-d${i}-label`).style.fontWeight = "bold";
              }
          }
          });
}

function get_current_boxes(habit_id) {
    fetch(`http://127.0.0.1:8000/track/${habit_id}`)
    .then(response => response.json())
    .then(boxes => {
      const checkboxes = document.createElement('div');
      checkboxes.innerHTML = 
      `<div class="box">
      <label id="${habit_id}-d1-label" for="${habit_id}-d1">d1
      <input id="${habit_id}-d1" type="checkbox" name="d1" value="${boxes[0].d1}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d2-label" for="${habit_id}-d2">d2
      <input id="${habit_id}-d2" type="checkbox" name="d2"value="${boxes[0].d2}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d3-label" for="${habit_id}-d3">d3
      <input id="${habit_id}-d3" type="checkbox" name="d3" value="${boxes[0].d3}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d4-label" for="${habit_id}-d4">d4
      <input id="${habit_id}-d4" type="checkbox" name="d4" value="${boxes[0].d4}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d5-label" for="${habit_id}-d5">d5
      <input id="${habit_id}-d5" type="checkbox" name="d5" value="${boxes[0].d5}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d6-label" for="${habit_id}-d6">d6
      <input id="${habit_id}-d6" type="checkbox" name="d6" value="${boxes[0].d6}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d7-label" for="${habit_id}-d7">d7
      <input id="${habit_id}-d7" type="checkbox" name="d7" value="${boxes[0].d7}"onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>`;
      document.getElementById(`${habit_id}-div`).append(checkboxes);
      check(habit_id);
     //bold current day
     highlight_check(habit_id)

    });
}

function get_boxes(habit_id) {
    fetch(`http://127.0.0.1:8000/track/${habit_id}`)
    .then(response => response.json())
    .then(boxes => {
      const checkboxes = document.createElement('div');
      checkboxes.innerHTML = 
      `<div class="box">
      <label id="${habit_id}-d1-label" for="${habit_id}-d1">d1
      <input id="${habit_id}-d1" type="checkbox" name="d1" value="${boxes[0].d1}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d2-label" for="${habit_id}-d2">d2
      <input id="${habit_id}-d2" type="checkbox" name="d2"value="${boxes[0].d2}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d3-label" for="${habit_id}-d3">d3
      <input id="${habit_id}-d3" type="checkbox" name="d3" value="${boxes[0].d3}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d4-label" for="${habit_id}-d4">d4
      <input id="${habit_id}-d4" type="checkbox" name="d4" value="${boxes[0].d4}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d5-label" for="${habit_id}-d5">d5
      <input id="${habit_id}-d5" type="checkbox" name="d5" value="${boxes[0].d5}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d6-label" for="${habit_id}-d6">d6
      <input id="${habit_id}-d6" type="checkbox" name="d6" value="${boxes[0].d6}" onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d7-label" for="${habit_id}-d7">d7
      <input id="${habit_id}-d7" type="checkbox" name="d7" value="${boxes[0].d7}"onChange="updateCheck(${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>`;
      document.getElementById(`${habit_id}-div`).append(checkboxes);
      check(habit_id);

      


        });
    }

function new_habit() {
    const mini_goal = document.querySelector('#new-habit-text').value;
    document.querySelector('#display').innerHTML = `<div id ="habits">
    </div>`;
    //get skill
    console.log(mini_goal);
    fetch('http://127.0.0.1:8000/new-habit', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            mini_goal: mini_goal
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
    })
    document.querySelector("#habit-form").outerHTML = '';
    //get_index();
    get_habits();
 
}

// Submit add skill
function new_skill() {
   
    const  skill = document.getElementById('skilldropdown').value;
    console.log(skill)
    fetch('http://127.0.0.1:8000/new-skill', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
            skill: skill

        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        
    })
    document.querySelector('#new-skill').outerHTML = `   <div  id="habit-form">
    <form id="new-habit" onsubmit="new_habit()">
      <input type="text" id="new-habit-text"></input>
      <input type="submit" value="Start new habit"></input>
    </form>
    <div id ="ideas">
      <button id ="idea-button" onclick="showIdeas()">Need Ideas?</button>
    </div>
  </div>
</div>`;
    //get_index();
}

function showIdeas() {
    document.getElementById('idea-button').outerHTML=`<button id="go-back" onclick="goBack()">Go Back</button>`;
    fetch('http://127.0.0.1:8000/ideas')
    .then(response => response.json())
    .then(ideas => {
        ideas.forEach(idea => {
            const li = document.createElement('div');
            li.id = `${idea.id}-div`;
            const ideadiv = document.createElement('div');
            li.appendChild(ideadiv);
            ideadiv.innerHTML = `<button onclick="setHabit('${idea.mini_goal}')">${idea.mini_goal}</button>`;
            document.querySelector('#ideas').append(li);

        })

    });

}

function goBack() {
    document.getElementById('ideas').innerHTML = `<button id ="idea-button" onclick="showIdeas()">Need Ideas?</button>`;
}

function setHabit(habit) {
    const mini_goal = document.querySelector('#new-habit-text');
    mini_goal.outerHTML = `<input type="text" id="new-habit-text" value="${habit}"></input>`;
    console.log(mini_goal.innerHTML);
}


async function getChart(url) {
    document.querySelector('#display').innerHTML = `<canvas id="myChart"></canvas>`;
    xAxis = [];
    yAxis = [];
    minis=[];
    await getChartData(url);
    var myChart = document.getElementById('myChart');
    if (myChart) {
        myChart.getContext('2d');
    }
    const fitChart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: xAxis,
            datasets: [{
                label: 'Consistency',
                data: yAxis,
                backgroundColor: '#00cca3'
            }
        ],
            
        },
        options : {

            scales: {
                y: {
                    suggestedMin: 0,
                    suggestedMax: 100
                }

            },
            plugins: {
                tooltip:{
                    displayColors: false,
                    callbacks: {
                        title: function(item, everything) {
                            var string = item[0].label;
                            var x = string.substr(2);
                            var habit = 'Habit: ' + minis[x-1];
                            return habit;
                        },
                        label: function(item, everything) {
                                var string = item.label;
                                var x = string.substr(2);
                                //let x = item.label;
                                console.log(x);
                                console.log(item.dataset.data[x-1])
                                var consistency = item.dataset.data[x-1];
                                var consistency = consistency.toFixed(2)
                            // console.log(item.label)
                            // console.log(minis[x-1]);
                                var consist = 'Consistency: ' + consistency + '%';
                                return consist;
                        }
                    }
                },
                // title:{
                //     display: true,
                //     text: 'test',
                // },
                legend:{
                    position: 'right',
                },
                
            }
    
        }
    });
}

async function getChartData(url) {
    console.log(url);
    display.innerHTML = `<canvas id="myChart"></canvas>`;
    const response = await fetch(`http://127.0.0.1:8000/${url}`)
    const data = await response.json();
    counter = 0;
    
    data.forEach(row => {
        counter++;
        xAxis.push(`wk${counter}`);
        const consist = row['consistency'];
        yAxis.push(consist);
        minis.push(`${row['mini_goal']}`)
    })

}

function getSkills() {
    const heading = document.createElement('div');
    heading.innerHTML = `<h3 style="text-align: center;">Which skill do you want to review?</h3>`;
    document.querySelector('#display').append(heading);
    const skills = document.createElement('div');
    skills.id ='skill-div';
    document.querySelector('#display').append(skills)
    fetch('http://127.0.0.1:8000/skills')
    .then(response => response.json())
    .then(result => {
        result.forEach(skill => {
            const div = document.createElement('div');
            div.id = `${skill.id}-div`;
            const skilldiv = document.createElement('div');
            div.appendChild(skilldiv);
            skilldiv.innerHTML = `<button class="skill-button" onclick="getChart('skills/${skill.id}')">${skill.skill}</button>`;
            document.querySelector('#skill-div').append(div);
        })
    })
}





// Select menu snippet W3
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);