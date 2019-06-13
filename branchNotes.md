# Notes for this Feature/Fix Branch

- The property indicating a task is done should be of data type 'bool'.
- The existing CRUD functionality concerning single tasks needs to be connected to the new modal UI.
- Create data persistence and state for reoccurance data and connect it with the already existing date selection functionality.
- Create a subcollection of members on each group document and provide the mechanism for fetching that data in order to render out group member avatars.
- Create the support for a user to send out an invitation email that will allow another user to sign in, or create an account and then be added as a member to the group the invite originated from.
- A list of every task, from all groups that are assigned to a given user, can be rendered.
