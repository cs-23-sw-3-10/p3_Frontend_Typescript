import React from 'react';
import Timeline from 'react-calendar-timeline'
import './App.css';
import moment from 'moment'
import 'react-calendar-timeline/lib/Timeline.css'

function App() {
  const groups = [{ id: 1, title: 'rig 1', stackItems: false, height: 30 }, { id: 2, title: 'rig 2' }, { id: 3, title: 'rig 3' }, { id: 4, title: 'rig 4' }, { id: 5, title: 'rig 5' }, { id: 6, title: 'rig 6' }]
  const items = [
    {
      id: 1,
      group: 1,
      title: 'den nye',
      start_time: moment().year(2023).month(10).date(1),
      end_time:moment().year(2023).month(10).date(6),
      canMove: true,
      canResize: true,
      canChangeGroup: true,
      
    },
  ]
  
  return (
    <div>
      <h1>Scrollable Horizontal Schedule</h1>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={moment()}
        defaultTimeEnd={moment().add(30, 'days')}
        // visibleTimeStart={moment().subtract(7, 'days')}
        // visibleTimeEnd={moment().add(7, 'days')}
        timeSteps={{
          second: 0,
          minute: 0,
          hour: 0,
          day: 1, 
          month: 1,
          year: 1,
        }}
      />
    </div>
  );
}
export default App;