+++
fragment = "config"

# Load Bootstrap and FontAwesome stylesheets
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

# Initialize Calendar and Render after DOM Loaded
[[config]]
  type = "js"
  block = true
  html = """
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      var calendarEl = document.getElementById('calendar');

      var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: [ 'bootstrap', 'dayGrid' ],
        themeSystem: 'bootstrap'
      });

      calendar.render();
    });
  </script>
  """
  
+++
