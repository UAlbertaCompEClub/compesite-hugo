+++
fragment = "config"

[[config]]
    type = "css"
    block = true
    resource = "fullcalendar/packages/core/main.css"

[[config]]
    type = "css"
    block = true
    resource = "fullcalendar/packages/daygrid/main.css"

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
    html = """
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        var calendarEl = document.getElementById('calendar');

        var calendar = new FullCalendar.Calendar(calendarEl, {
          plugins: [ 'dayGrid' ]
        });

        calendar.render();
      });
    </script>
    """
  
+++
