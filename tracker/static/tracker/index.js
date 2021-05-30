document.addEventListener('DOMContentLoaded', function() {
    
     
    var home = document.querySelector("#home");
    if (home) {
        home.addEventListener('click', () => (display('home')));
    }
    var logo = document.querySelector("#logo");
    if (logo) {
        logo.addEventListener('click', () => (display('home')));
    }

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
    
    class Session {
        constructor(logged_in, username) {
            this.logged_in = logged_in;
            this.username = username;
            this.id = id;

        }
    }
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };

    if (localStorage.getItem('token')) {
        this.logged_in = true;
        get_user();

        
    } else {
        this.logged_in = false;
        display('login')
    }

});

function get_user() {
    fetch('http://localhost:8000/user', {
        headers: {
            "Content-Type" : "application/json", 
            "Authorization": `Token ${localStorage.getItem('token')}`,
        }
      })
      .then(res => res.json())
      .then(json => {
        this.username = json.user.username;
        this.id = json.user.id;
        console.log(this.username);
        console.log(this.id)
        var logout = document.createElement('a');
        logout.innerHTML = `Log out`;
        logout.href = `#`;
        logout.className = `nav-link`;
        logout.id =`logout`;
        var click = document.createAttribute("onclick");
        click.value = `logout()`;
        logout.setAttributeNode(click);
        document.querySelector('.nav-right').appendChild(logout);

        var login_status =document.createElement('div');
        login_status.innerHTML=`<p id="user_stats" value="${this.id}">Logged in as ${this.username}</p>`;
        document.getElementById('greeting').appendChild(login_status);
        latestSkill(this.id);
        
    });

}


function latestSkill(user_id) {
    fetch(`http://127.0.0.1:8000/get-latest-skill/${user_id}`)
    .then(response => response.json())
    .then(skill => {
        //console.log('hi');
        console.log(skill.start_date);
        var today = new Date();
        console.log(today);
        var date = new Date(skill.start_date)
        date = date.setHours(0,0,0,0);
        date = new Date(date);
        console.log(date.addDays(28));
        if (today > date.addDays(28)) {
            display('new-skill');
        } else {
            latestHabit(user_id);
        }
     
    })
    .catch(error => {
        display('new-skill')
    })
    
}

function latestHabit(user_id) {
    // var skillform = document.getElementById('new-skill');

    fetch(`http://127.0.0.1:8000/get-latest-habit/${user_id}`)
    .then(response => response.json())
    .then(habit => {
        console.log(habit);
        var date = new Date(habit.start_date)
        date = date.setHours(0,0,0,0);
        date = new Date(date);
        var today = new Date();
        if (today > date.addDays(7)) {
            display('new-habit');
        } else {
            get_habits(user_id);
        }
    })
    .catch(error => {
        display('new-habit');
    })
    

       
}


function logout(e) {
    console.log('hi');
    document.getElementById('logout').remove();
    localStorage.removeItem('token');
    document.getElementById('user_stats').remove();
    display('login');
}


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function display(form) {
    var user = document.getElementById('user_stats');
    if (user) {
        user_id = user.getAttribute("value");
    } 
    var display = document.querySelector('#display');
    if (form == 'home') {
        if (localStorage.getItem('token')) {
        display.innerHTML = `<div id ="habits">
        </div> `;
        get_habits(user_id)
    
        var ideas = document.getElementById('ideas')
        if (ideas) {
           ideas.innerHTML= `<button id ="idea-button" onclick="showIdeas()">Need Ideas?</button>`;
        }
    }
    }
    if (form == 'register') {
        document.querySelector('#login').innerHTML ='';
        document.querySelector('#login').outerHTML = `<div id="login"> <h1>Create Account</h1><form id="reg-form" >
        <div class="form-group">
        <span class="label" for="email">Email:</span>
        <input type="text" class="form-control" id="email" name="email">
      </div>
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
    }
    if (form == 'chart') {
        if (localStorage.getItem('token')) {
            display.innerHTML = `<canvas id="myChart"></canvas>`;
            getChart(`chart-habits/${user_id}`);
        }
   
    }
    if (form == 'history') {
        if (localStorage.getItem('token')) {
       display.innerHTML = '';
       getSkills(user_id);
        }
    }
    if (form == 'login') {
        document.getElementById('display').innerHTML ='';
        document.getElementById('display').innerHTML = 
        `<div id="login">
        <h1>Login</h1>
        <form id="lgn-form">
        <div class="form-group">
        <span class="label" for="email">Email:</span>
        <input type="text" class="form-control" id="email" name="email">
      </div>
       <div class="form-group">
       <span class="label" for="username">Username:</span>
         <input type="text" class="form-control" id="username" name="username">
       </div>
       <div class="form-group">
       <span class="label" for="password">Password:</span>
         <input type="password" id="password" name="password">
       </div>
       <button type="submit" class="login-btn" value="login">Login</button>
       </form>
       <div class="lgn-tag">
         <p>Don't have an account? <a id="register" onclick="display('register')"> Register here.</a></p>
       </div>
     </div>`;
      document.getElementById('lgn-form').addEventListener('submit', e => login(e))

    }

    if (form == 'new-skill') {
        display.innerHTML =`<div class="container">
        <form id="new-skill" onsubmit="new_skill(${user_id})">
          <div class="custom-select" style="width:200px;">
          <select id="skilldropdown" >
            <option id="default-select" selected disabled>Choose a skill</option>
            <option class="dropdown-item" value="Portion Control">Portion Control</option>
            <option class="dropdown-item" value="Exercise">Exercise</option>
            <option class="dropdown-item" value="Sleep Hygiene">Sleep Hygiene</option>
            <option class="dropdown-item" value="Eating Veggies">Eating Veggies</option>
            <option class="dropdown-item" value="Eating Protein">Eating Protein</option>
            <option class="dropdown-item" value="Stress Management">Stress Management</option>
            <option class="dropdown-item" value="Mindful Eating">Mindful Eating</option>
            <option class="dropdown-item" value="Meal Prep">Meal Prep</option>
            <option class="dropdown-item" value="Moderate Snacking">Moderate Snacking</option>
          </select>
        </div>
        <input id="skill-submit" type="submit"></input>
      </form>
    </div>`;

    if (form == 'new-habit') {
        display.innerHTML=` <div class="container">
        <div  id="habit-form">
         <form id="new-habit" onsubmit="new_habit(${user_id})">
           <input type="text" id="new-habit-text"></input>
           <input type="submit" value="Start new habit"></input>
         </form>
         <div id ="ideas">
           <button id ="idea-button" onclick="showIdeas(${user_id})">Need Ideas?</button>
         </div>
       </div>
     </div>`;
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
    }
    


}


function register(e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch('http://127.0.0.1:8000/register-users', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify({
                user: {
                    email: document.querySelector('#email').value,
                    username: document.querySelector('#username').value,
                    password: document.querySelector('#password').value
                }
              }),
        })
        .then(res => res.json())
        .then(json => {
            if (json.errors) {
                alert('User already exists');
                display('register');
            } else {
          
                display('login');
            }

        });   
    }


function login(e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    fetch('http://127.0.0.1:8000/user-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
          },
          body: JSON.stringify({
            user: {
                email: document.querySelector('#email').value,
                username: document.querySelector('#username').value,
                password: document.querySelector('#password').value
            }
          })
        })
        .then(res => res.json())
        .then(json => {
            try {
                localStorage.setItem('token', json.user.token);
                get_user();
            }  
            catch {
                alert('Invalid username or password');
                display('login');
            }
            });
     
            

}




function get_habits(user_id) {
    fetch(`http://127.0.0.1:8000/habit-list/${user_id}`)
    .then(response => response.json())
    .then(habits => {
        console.log(habits[0].skilltext);
        const currentSkill = document.createElement('div');
        currentSkill.innerHTML=`<h1 id="skill-name">Current Skill: ${habits[0].skilltext}</h1>`;
        
        document.querySelector('#display').innerHTML = `<div id ="habits">
        </div>`;
        document.querySelector('#display').prepend(currentSkill);
        habits.map((habit) => {
            const li = document.createElement('div');
            li.id = `${habit.id}-div`;
            const habitdiv = document.createElement('div');
            li.appendChild(habitdiv);
         
            habitdiv.outerHTML =`<div class="habit">${habit.mini_goal}</div>`
            document.querySelector('#habits').append(li);
            if (habit === habits[0]) {
                get_current_boxes(user_id, habit.id);
            } else {
                get_boxes(user_id, habit.id);
            }
                    })

        })

    }


function check(user_id, habit_id) {
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
    } else {
        box.checked = false;
    }
    }
    fetch(`http://127.0.0.1:8000/consistency/${user_id}/${habit_id}`, {
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

function updateCheck(user_id, habit_id, e) {
    e.preventDefault();
    const csrftoken = getCookie('csrftoken');
    var box_value = e.target.value;
    let day = e.target.name;
    if (box_value == 'true') {
        box_value = false;
    } else if (box_value == 'false') {
        box_value = true;
    }
    fetch(`http://127.0.0.1:8000/update/${user_id}/${habit_id}`, {
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
    check(user_id, habit_id);
 
   
}



function highlight_check(user_id, habit_id) {   
    fetch(`http://127.0.0.1:8000/habit/${user_id}/${habit_id}`)
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

function get_current_boxes(user_id, habit_id) {
    fetch(`http://127.0.0.1:8000/track/${habit_id}`)
    .then(response => response.json())
    .then(boxes => {
      const checkboxes = document.createElement('div');
      checkboxes.innerHTML = 
      `<div class="box">
      <label id="${habit_id}-d1-label" for="${habit_id}-d1">d1
      <input id="${habit_id}-d1" type="checkbox" name="d1" value="${boxes[0].d1}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d2-label" for="${habit_id}-d2">d2
      <input id="${habit_id}-d2" type="checkbox" name="d2"value="${boxes[0].d2}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d3-label" for="${habit_id}-d3">d3
      <input id="${habit_id}-d3" type="checkbox" name="d3" value="${boxes[0].d3}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d4-label" for="${habit_id}-d4">d4
      <input id="${habit_id}-d4" type="checkbox" name="d4" value="${boxes[0].d4}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d5-label" for="${habit_id}-d5">d5
      <input id="${habit_id}-d5" type="checkbox" name="d5" value="${boxes[0].d5}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d6-label" for="${habit_id}-d6">d6
      <input id="${habit_id}-d6" type="checkbox" name="d6" value="${boxes[0].d6}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d7-label" for="${habit_id}-d7">d7
      <input id="${habit_id}-d7" type="checkbox" name="d7" value="${boxes[0].d7}"onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>`;
      document.getElementById(`${habit_id}-div`).append(checkboxes);
      check(user_id, habit_id);

     //bold current day
      highlight_check(user_id, habit_id)

    });
}

function get_boxes(user_id, habit_id) {
    fetch(`http://127.0.0.1:8000/track/${habit_id}`)
    .then(response => response.json())
    .then(boxes => {
      const checkboxes = document.createElement('div');
      checkboxes.innerHTML = 
      `<div class="box">
      <label id="${habit_id}-d1-label" for="${habit_id}-d1">d1
      <input id="${habit_id}-d1" type="checkbox" name="d1" value="${boxes[0].d1}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d2-label" for="${habit_id}-d2">d2
      <input id="${habit_id}-d2" type="checkbox" name="d2"value="${boxes[0].d2}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d3-label" for="${habit_id}-d3">d3
      <input id="${habit_id}-d3" type="checkbox" name="d3" value="${boxes[0].d3}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d4-label" for="${habit_id}-d4">d4
      <input id="${habit_id}-d4" type="checkbox" name="d4" value="${boxes[0].d4}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d5-label" for="${habit_id}-d5">d5
      <input id="${habit_id}-d5" type="checkbox" name="d5" value="${boxes[0].d5}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d6-label" for="${habit_id}-d6">d6
      <input id="${habit_id}-d6" type="checkbox" name="d6" value="${boxes[0].d6}" onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>
      <div class="box">
      <label id="${habit_id}-d7-label" for="${habit_id}-d7">d7
      <input id="${habit_id}-d7" type="checkbox" name="d7" value="${boxes[0].d7}"onChange="updateCheck(${user_id}, ${habit_id}, event)"></input>
      <span class="checkmark"></span>
      </label>
      </div>`;
      document.getElementById(`${habit_id}-div`).append(checkboxes);
      check(user_id, habit_id);

      


        });
    }

function new_habit(user_id) {
    const csrftoken = getCookie('csrftoken');
    const mini_goal = document.querySelector('#new-habit-text').value;
    fetch(`http://127.0.0.1:8000/new-habit/${user_id}`, {
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
        get_habits(user_id);
    })

    
 
}

// Submit add skill
function new_skill(user_id) {
    const csrftoken = getCookie('csrftoken');
    const  skill = document.getElementById('skilldropdown').value;
    console.log(skill)
    fetch(`http://127.0.0.1:8000/new-skill/${user_id}`, {
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
    document.querySelector('#new-skill').outerHTML = `<div  id="habit-form">
    <form id="new-habit" onsubmit="new_habit(${user_id})">
      <input type="text" id="new-habit-text"></input>
      <input type="submit" value="Start new habit"></input>
    </form>
    <div id ="ideas">
      <button id ="idea-button" onclick="showIdeas(${user_id})">Need Ideas?</button>
    </div>
  </div>
</div>`;
  
}

function showIdeas(user_id) {
    document.getElementById('idea-button').outerHTML=`<button id="go-back" onclick="goBack(${user_id})">Go Back</button>`;
    fetch(`http://127.0.0.1:8000/ideas/${user_id}`)
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

function goBack(user_id) {
    document.getElementById('ideas').innerHTML = `<button id ="idea-button" onclick="showIdeas(${user_id})">Need Ideas?</button>`;
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
                                // console.log(x);
                                // console.log(item.dataset.data[x-1])
                                var consistency = item.dataset.data[x-1];
                                var consistency = consistency.toFixed(2)
                      
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

function getSkills(user_id) {
    const heading = document.createElement('div');
    heading.innerHTML = `<h3 style="text-align: center;">Which skill do you want to review?</h3>`;
    document.querySelector('#display').append(heading);
    const skills = document.createElement('div');
    skills.id ='skill-div';
    document.querySelector('#display').append(skills)
    fetch(`http://127.0.0.1:8000/skills/${user_id}`)
    .then(response => response.json())
    .then(result => {
        result.forEach(skill => {
            const div = document.createElement('div');
            div.id = `${skill.id}-div`;
            const skilldiv = document.createElement('div');
            div.appendChild(skilldiv);
            skilldiv.innerHTML = `<button class="skill-button" onclick="getChart('skills/${user_id}/${skill.id}')">${skill.skill}</button>`;
            document.querySelector('#skill-div').append(div);
        })
    })
}





