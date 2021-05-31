Habit Tracker Web Application Summary:

My project is a single page habit tracking app that allows users to track and structure their progress when seeking to build new behaviors. Users can creat their account, login, and logout without a page redirect.

Every 4 weeks the user will be prompted to pick a new skill to practice from a dropdown. Then, every week within that 4 week period the user is prompted to pick a habit to work on that week that will build the skill they've chose. Once they've entered in a habit, the site renders the text of the habit they've chose with a series of 7 checkboxes each labeled according to what day it is in relation to when they started the habit e.g., d1, d2, d3 etc. The heading for the checkbox will be in bold if it is currently that day. For example, if the user starts their habit on Monday, "d1" will be in bold on Monday, and "d3" on Wednesday. When a user checks a checkbox to signify they completed the habit for that day, that data is stored in the database so that when the user clicks on the "Progress" navigation link, a chart will be rendered showing the user how consistently they completed their habits from week to week, from 0 to 100%.

When the user clicks the "History" navigation link they are brought to a list of buttons. Each button has the text of the Skills they have worked on. Say a user has been using the app for 8 weeks and the first month the Skill they practiced was "Exercise" and the second was "Portion Control". The history link would render 2 buttons saying "Exercise" and "History" respectively. Clicking on one of these buttons renders a chart showing the user their consistency data for that Skill.

The point of the app is to help users stay motivated and accountable by making it easier to see the progress they've made and encourage focusing on the process rather than results.

Distinctiveness and Complexity:

This project challenged me in a number of ways. Creating a single page application meant I couldn't use Django's out of the box capabilities to login, logout, and create users (which I had relied on for past projects). This meant using Json Web Tokens which was way out of my comfort zone and took a lot of time and googling to figure out how to make it work.

Beyond the complexity of using JWT for user authentication which impacted how I made every aspect of the application (no more Django templates), I also utilized chart.js to render visual representations of specific data sets, which updates asynchronously to reflect any changes the user makes to their profile.

Furthermore, the usage of checkboxes (and a lot of them at that) adds complexity and distinctiveness not seen in other assignments. Checkboxes aren't straightforward to style, especially when a checkbox click event needs to update the database and the styling of for that specific checkbox.

In addition, for this app to work properly, certain stylings, pages, and data had to occur at the right time with relation to other events. For example, the user needs to be prompted to set a new weekly goal 1 week after the previous goal was set, and the user needs to be prompted to set a new monthly skill every 4 weeks. Going back to the checkboxes, getting the right checkbox heading to have a bold font on the right day was surprising one of the more complex parts of this application. Not only did I have to consider the timing algorithm, but also all of the other checkboxes being rendered on the screen and all of the other API calls required to display the data accurately and in user friendly way.

In conclusion, the functionality of this web application was different from previous projects and the choice to build a single page application and use chart.js to map specific data points added a large amount of complexity to this project.

index.js
This file is responsible for rendering the UI and fetching the data needed for this task.

models.py
This file contains my models and hence the structure of my database.

urls.py
This contains the paths for my fetch requests so I can access the data from my database and render it to the UI.

serializers.py
This file contains all of the functions for serializing data from my models so it can be converted to json and utilized by the API.

views.py
This file handles my API views.

backends.py
This file contains a class for validating users with Json Web Tokens.

exceptions.py
This file contains the code for handling exceptions and returning the appropriate json response for these exceptions.


