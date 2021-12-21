# Habit Tracker

## About this project

This was my capstone project for Harvard's CS50W online course, hence the name of the repository. The assignment was to create a necessarily complex web application utilizing what we had learned throughout the course.

While it wasn't a strict requirement, I took it upon myself to make this project a single page application to give me a challenge and hone my skills in this area.

This single page web application is designed to help users build new habits, by helping them structure, track, and measure their efforts towards changing their behaviors.

The application is written in Python and Javascript, and uses the Django REST API to handle requests and json web tokens for user validation without reloading the page.

## Functionality

The app’s functionality revolves around specific blocks of time and breaking down goals/habits/skills into smaller more manageable actions.

Every 4 weeks, a user is prompted to choose a new skill – something they want to get better at. For example, eating more vegetables. After they choose a skil to focus onl, they’re then prompted on a weekly basis to choose an action that will practice this skill. In this example, it could be something like eating 1 hand full of vegetables at dinner. After entering this in, a table appears with 7 checkboxes, one for each day of the week. If they managed to complete that week’s action on a given day, they check the box corresponding to that day.

The bold label of a checkbox signifies what day it is. So if you start on a Monday, “d2” will be bold that Tuesday.

Every week, they’ll be prompted to commit to a goal/action for that week until 4 weeks is up when the process starts all over again.

Getting the functionality to sync with these specific interval times and single page functionality is probably one of the more sneaky/invisible challenges of this project, but also probably gave me the most trouble.

The data from these checkboxes is then plotted onto a graph using GraphJS. The Progress page charts the user’s consistency overall since beginning to use the app.

The History page allows the user to compare the records/graphs of past skills. They’ll see a button for every skill/4 week block they’ve completed. After clicking this button they’ll see a graph charting how well they did during that period.

That way, the data is presented in a way the user will find useful – they can see progress and/or glean useful insights about why they didn’t do so well during certain periods.

## Potential Future Features:

Intro slider explaining to new users how to use the application.

Hints for behaviors that practice a given skill, these will be prepopulated, but also include things other users have done.

Forums organized around certain goals.

## Deployment

Deployed with Heroku. [See live](https://glacial-springs-43992.herokuapp.com/). 

## Get started

Clone the repo to your local machine:

`$ git clone https://github.com/jmorton138/capstone`

View the application locally with Live Server at:

`http://127.0.0.1:3000`


