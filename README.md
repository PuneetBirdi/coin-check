This is a React dashboard style application to display crypto currency information obtained through the Coinbase Pro API.

The websocket connection is through a Node/Express server and styling is done with Styled Components.

TODO:

1. Manage, level2 orderbook data, as well as orderbook updates.
2. Make changes to UI to display order-book data.
3. Most likely, implement the ContextAPI for app level state-management, Redux seems a little over-kill.
4. Implement news API for news articles in bottom section.
5. Tweak the chart, currently the time scale is not adjusting appropriately, and the colours look horrible.
6. Add real-time chart updates using the ticket websocket channell.
