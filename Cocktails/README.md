Hosted for continuous deployment on Netlify [https://excellent-react-drink-recipes.netlify.app/]


## Synopsis

A React recipe drink recipe app I  built with  React v16, HTML5, CSS. It allows a user to search for drinks returning a filtered list multiple options. There is a single page view for each individual drink. I've implemented React router for the pages, and for redirection. It uses Context Api for global state management, React Hooks for internal component state management. Hooks used, useCallback, useState, useEffect, useRef, useParam.


## Motivation

To get better at building apps in React and personal enrichment. 

## Installation
If you prefer to run on your local -
Clone or download to your local machine and run, install package.json and then 'npm start'.


## License

&copy; 2021 Ethan Robbins
# Issues encountered and their fix

#### React Router Fix

(Fix)[https://dev.to/dance2die/page-not-found-on-netlify-with-react-router-58mc]

#### CRA Fix

```

"build": "CI= react-scripts build",

```
