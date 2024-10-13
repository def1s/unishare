import { DateSelectArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { memo, useState } from 'react';
import cls from './Calendar.module.scss';

interface CalendarProps {
    className?: string;
}

export const Calendar = memo((props: CalendarProps) => {
	const {
		className
	} = props;

	const [counter, setCounter] = useState(0);
	const [events, setEvents] = useState<EventApi[]>([]);

	const createEventId = () => {
		setCounter(prev => prev + 1);
		return String(counter);
	};

	const handleSelect = (selectInfo: DateSelectArg) => {
		const title = prompt('Please enter a new title for your event');
		const calendarApi = selectInfo.view.calendar;

		calendarApi.unselect(); // clear date selection

		if (title) {
			calendarApi.addEvent({
				id: createEventId(),
				title,
				start: selectInfo.startStr,
				end: selectInfo.endStr,
				allDay: selectInfo.allDay
			});
		}
	};

	const handleSetEvents = (events: EventApi[]) => {
		setEvents(events);
	};


	// TODO выносить конфигурацию календаря в отдельный файл
	return (
		<div className={cls.container}>
			<FullCalendar
				plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
				initialView="timeGridWeek"
				headerToolbar={{
					left: 'prev,next today',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				}}
				locale='ru'
				select={handleSelect}
				editable={true}
				selectable={true}
				selectMirror={true}
				eventsSet={handleSetEvents}
				buttonText={{
					today: 'сегодня',
					month: 'месяц',
					week: 'неделя',
					day: 'день'
				}}
				allDayText='Весь день'
				slotLabelFormat={{
					hour: 'numeric',
					minute: 'numeric'
				}}
			/>
		</div>
	);
});
