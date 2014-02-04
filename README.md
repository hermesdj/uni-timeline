angular-timeline
===================

**Requirements:** AngularJS 1.2+

This is a work in progress project !

## Current features :

- Project structure is good but need improvements
- Basic display of the timeline
- Auto centering of the timeline indicator when resizing window
- Drag the timeline with mousedown + mousemove


## Initial Todos :
- Finish the project structure
- Complete the Gruntfile for build tasks
- Add moar tests !

## Projected features :
- Add / Remove events and event display
- Add / Remove eras and era display
- Add utilities functions to move the timeline to an event (by script or by clicking on an event)
- Configure the timeline with options (allow drag for example)
- Expose the Api to bind click events, hover events, etc.
- Configure the way the time are displayed
- Expose css classes for templating (currently the css are mixed in the timeline.css and timeline-white.css)
- Allow zoom-in and zoom-out. Each zoom will recalculate the timeline displayed values (example major is centuries, then zoom in major become decades)
- Zoom from eons to seconds. Stream the displayed content depending on the zoom level
- etc.

## Init dev environment :

1. Clone the git repository

2. Download the required dependencies

The project need **npm**, **bower** and **grunt** to be installed
Be sure to also have karma installed

### Install the project

Run CMD on the root of the project then install it with npm :

```
$ npm install
```

download the required dependencies with bower

```
$ bower install
```

### Run the server
Run the gruntfile with the server option

```
$ grunt server
```

This will launch an express server and open the browser on the example.html file.
It will bind an event listener for file changes in ./src and refresh automatically
the browser.