angular-timeline
===================

**Requirements:** AngularJS 1.2+

This is a work in progress project !

## Current features :

- Project structure is good but need improvements
- Basic display of the timeline


## Initial Todos :
- Finish the project structure
- Complete the Gruntfile for build tasks

## Projected features :
- Add / Remove events and event display
- Add / Remove eras and era display
- Add utilities functions to move the timeline to an event (by script or by clicking on an event)
- etc.

## Init dev environment :

1. Clone the git repository

2. Download the required dependencies
The project need **npm**, **bower** and **grunt** to be installed

3. Install the project
Run CMD on the root of the project then install it with npm :

```
$ npm install
```

4. download the required dependencies with bower

```
$ bower install
```

5. Run the gruntfile with the server option

```
$ grunt server
```

This will launch an express server and open the browser on the example.html file.
It will bind an event listener for file changes in ./src and refresh automatically
the brower.