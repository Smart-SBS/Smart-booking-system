import React, { useEffect } from 'react'

import Calendar from 'tui-calendar';
import 'tui-calendar/dist/tui-calendar.css'; 

const CalendarData = () => {
  useEffect(() => {
    const calendar = new Calendar('#calendar', {
      defaultView: 'month', 
      taskView: true, 
      template: {
				monthDayname: function(dayname) {
					return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
				}
			}
    });
  }, []);

  return <div id="calendar"></div>;
}

export default CalendarData