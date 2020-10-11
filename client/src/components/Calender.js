import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { getFetch } from '../utility/utility';
import  './calender.css';

export default class Calender extends React.Component {

  state = {
    currentEvents: []
  }

  componentDidMount(){
    getFetch('http://localhost:3001/api/calender/getevent', 'GET', {}).then( res => {
        this.setState({ currentEvents: res.data });
        console.log(res.data);
    });
  }
  render() {
    return (
        <div className="calender_container">
            <div className="leftPart">
                <h2>All Events ({this.state.currentEvents.length})</h2>
                <ul>
                { this.state.currentEvents.length && this.state.currentEvents.map(renderSidebarEvent) }
                </ul>
            </div>

            <div className="rightPart">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    weekends={true}
                    events={this.state.currentEvents} 
                    select={this.handleDateSelect}
                    eventContent={renderEventContent} // custom render function
                    eventClick={this.handleEventClick}
                   // eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                   eventAdd={this.addToDbEvent}
                   eventRemove={this.deleteFromDbEvent}
                />
            </div>
        </div>
    )
  }

  addToDbEvent = (info) => { 
    
    let title  = info.event._def.title;
    let start  = new Date(info.event._instance.range.start).toISOString();
    let end    = new Date(info.event._instance.range.end).toISOString();
    let allDay = info.event._def.allDay; 
         
    getFetch('http://localhost:3001/api/calender/addevent', 'POST', {
        title : title,
        start : start,
        end   : end,
        allDay: allDay
    }).then( res => {
        // Add Event to "currentEvents"  State
        let newObject = { id: res.data.insertId, tile: title, start: start, end: end, allDay: allDay };
        this.setState({ currentEvents: [...this.state.currentEvents, newObject ] });
        console.log(this.state.currentEvents);
    }).catch( error => {
        console.log(error);
    });
  }
  
  deleteFromDbEvent = (info) => { 
    var eventId = info.event._def.publicId; 
    getFetch('http://localhost:3001/api/calender/deleteEvent', 'POST', {
      id: eventId
    })
    .then( res => {
        // Delete Event from "currentEvents" Array state
        this.setState({ currentEvents : this.state.currentEvents.filter(event => event.id != eventId) }); 
    })
    .catch( error => {
        console.log(error);
    });
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        //id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events) => {
    //this.setState({ currentEvents: events  });
  }

}

function renderEventContent(eventInfo) { 
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event._def.title}</i>
    </>
  )
}
function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}