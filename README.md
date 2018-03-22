# Notes for Clubhouse

This project is a [Chrome extension](https://developer.chrome.com/extensions)
that allows you to embed notes on [Clubhouse.io](https://clubhouse.io/),
tracked and maintained using [Google Sheets](https://www.google.com/sheets/about/).

## Why?

An important part of [Scrum](https://en.wikipedia.org/wiki/Scrum_(software_development))
is the retrospective meeting. In this meeting, the team typically comes up
with specific actions they can take to improve their work in the next sprint.

[Clubhouse](https://clubhouse.io/) is a nifty project management tool,
but it doesn't have any way to keep track of retrospective actions.
By embedding these retrospective actions on a Clubhouse board, teams can
keep these retrospective actions in mind every day, and make sure to follow
up on those actions.

## Google Integration

This project stores data using [Google Sheets](https://www.google.com/sheets/about/),
for ease of use and collaboration. Currently, one particular Google Sheet
is hardcoded into the extension. In the future, it would be good to implement
a sheet selector, so you can select which Google Sheet you want to use
to hold and manage this data.

# Install from Web Store

This project is [publicly available on the Chrome web store](https://chrome.google.com/webstore/detail/notes-for-clubhouse/agcblfcicgkpgiccllhhpepccjjagfhp).
It is currently marked as an "unlisted" extension, which means that it's
publicly available if you know the link, but it will not show up in search
results.

# Install Development Build

If you want to install the development build, follow these steps:

1. Clone the repository to your computer
2. Run `yarn install` to install the dependencies
3. Run `yarn start` to start the development server. This will create a new
   directory called `build`, and drop the built files inside.
4. In Google Chrome, go to `chrome://extensions`, and turn on developer mode
   (using the switch on the top right side of the page)
5. Click the "Load unpacked" button, and select the `build` directory
   that was created by `yarn start`

# How to Use

To use the extension, visit any page under `app.clubhouse.io`. You will see
a new panel appear at the bottom of the page, which will ask you to login
with your Google Account. Once you've logged in, the panel will fetch the
hardcoded Google Sheet, parse the contents, and display the retro actions
associated with the current date.

You can also use the "..." button in the top right of the panel to log out
of your Google account, or close the panel. To reopen the panel after it has
been closed, click the extension's icon to the right of the URL bar.
