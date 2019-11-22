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
  resource = "fullcalendar/packages/list/main.css"

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
  resource = "fullcalendar/packages/list/main.js"

[[config]]
  type = "js"
  block = true
  resource = "fullcalendar/packages/bootstrap/main.js"

[[fullcalendar]]
  calendarElement = "upcomingEventsCalendar"

  [fullcalendar.calendarObj]    
    events = "events/index.json"
    plugins = ["bootstrap", "list"]
    themeSystem = "bootstrap"
    header = false
    defaultView = "list"
    [fullcalendar.calendarObj.views]
        [fullcalendar.calendarObj.views.list]
            [fullcalendar.calendarObj.views.list.duration]
                days = 240
+++
