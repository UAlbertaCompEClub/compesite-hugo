+++
fragment = "config"

# Load Bootstrap and FontAwesome stylesheets
# Not necessary since done elsewhere in syna theme
#[[config]]
#  type = "css"
#  block = true
#  html = "<link href='https://use.fontawesome.com/releases/v5.0.6/css/all.css' rel='stylesheet'/>"
#
#[[config]]
#  type = "css"
#  block = true
#  html = "<link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'/>"

# Load Event Calendar Stylesheets
[[config]]
  type = "css"
  block = true
  resource = "fullcalendar/packages/core/main.css"

[[config]]
  type = "css"
  block = true
  resource = "fullcalendar/packages/daygrid/main.css"

[[config]]
  type = "css"
  block = true
  resource = "fullcalendar/packages/bootstrap/main.css"

# Load Event Calendar Scripts
[[config]]
  type = "js"
  block = true
  resource = "fullcalendar/packages/core/main.js"

[[config]]
  type = "js"
  block = true
  resource = "fullcalendar/packages/daygrid/main.js"

[[config]]
  type = "js"
  block = true
  resource = "fullcalendar/packages/bootstrap/main.js"

[[fullcalendar]]
  calendar_element = "calendar"
  eventsdb = "events/index.json"

+++
