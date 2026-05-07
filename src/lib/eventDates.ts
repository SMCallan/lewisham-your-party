const EVENT_TIME_ZONE = 'Europe/London';
const DAY_IN_MS = 24 * 60 * 60 * 1000;

type DateValue = Date | string | number;

type EventFrontmatter = {
    title?: string;
    date: DateValue;
    end_date?: DateValue;
    location?: string;
    synopsis?: string;
};

const getLondonDateKey = (date: Date) => {
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: EVENT_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).formatToParts(date);

    const year = parts.find((part) => part.type === 'year')?.value;
    const month = parts.find((part) => part.type === 'month')?.value;
    const day = parts.find((part) => part.type === 'day')?.value;

    return `${year}-${month}-${day}`;
};

export const getTodayDayNumber = () => dateKeyToDayNumber(getLondonDateKey(new Date()));

export const toDateKey = (value: DateValue) => {
    if (value instanceof Date) {
        return value.toISOString().slice(0, 10);
    }

    const rawValue = String(value);
    const dateOnlyMatch = rawValue.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (dateOnlyMatch) {
        return dateOnlyMatch[0];
    }

    const parsedDate = new Date(value);

    if (Number.isNaN(parsedDate.valueOf())) {
        return rawValue;
    }

    return parsedDate.toISOString().slice(0, 10);
};

export const dateKeyToDayNumber = (dateKey: string) => {
    const [year, month, day] = dateKey.split('-').map(Number);

    return Math.floor(Date.UTC(year, month - 1, day) / DAY_IN_MS);
};

const dayNumberToDateKey = (dayNumber: number) => {
    return new Date(dayNumber * DAY_IN_MS).toISOString().slice(0, 10);
};

const addDaysToDateKey = (dateKey: string, days: number) => {
    return dayNumberToDateKey(dateKeyToDayNumber(dateKey) + days);
};

const toCalendarDate = (dateKey: string) => dateKey.replaceAll('-', '');

const escapeCalendarText = (value = '') => {
    return value
        .replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
};

export const getEventStartDay = (frontmatter: EventFrontmatter) => {
    return dateKeyToDayNumber(toDateKey(frontmatter.date));
};

export const getEventEndDay = (frontmatter: EventFrontmatter) => {
    return dateKeyToDayNumber(toDateKey(frontmatter.end_date ?? frontmatter.date));
};

export const isEventHappeningToday = (frontmatter: EventFrontmatter, todayDay = getTodayDayNumber()) => {
    return getEventStartDay(frontmatter) <= todayDay && getEventEndDay(frontmatter) >= todayDay;
};

export const isEventUpcoming = (frontmatter: EventFrontmatter, todayDay = getTodayDayNumber()) => {
    return getEventStartDay(frontmatter) > todayDay;
};

export const isEventCurrentOrUpcoming = (frontmatter: EventFrontmatter, todayDay = getTodayDayNumber()) => {
    return getEventEndDay(frontmatter) >= todayDay;
};

export const isEventPast = (frontmatter: EventFrontmatter, todayDay = getTodayDayNumber()) => {
    return getEventEndDay(frontmatter) < todayDay;
};

export const compareEventsByStartDateAsc = (a: any, b: any) => {
    return getEventStartDay(a.frontmatter) - getEventStartDay(b.frontmatter);
};

export const compareEventsByStartDateDesc = (a: any, b: any) => {
    return getEventStartDay(b.frontmatter) - getEventStartDay(a.frontmatter);
};

export const formatDate = (value: DateValue) => {
    const dateKey = toDateKey(value);

    return new Intl.DateTimeFormat('en-GB', {
        timeZone: 'UTC',
    }).format(new Date(`${dateKey}T00:00:00Z`));
};

export const formatEventDateRange = (frontmatter: EventFrontmatter) => {
    const endDate = frontmatter.end_date ?? frontmatter.date;
    const startDateKey = toDateKey(frontmatter.date);
    const endDateKey = toDateKey(endDate);

    if (endDateKey !== startDateKey) {
        return `${formatDate(frontmatter.date)} - ${formatDate(endDate)}`;
    }

    return formatDate(frontmatter.date);
};

export const getCalendarDownloadName = (slug: string) => `${slug}.ics`;

export const getCalendarHref = (frontmatter: EventFrontmatter, eventUrl: string) => {
    const startDateKey = toDateKey(frontmatter.date);
    const endDateKey = toDateKey(frontmatter.end_date ?? frontmatter.date);
    const exclusiveEndDateKey = addDaysToDateKey(endDateKey, 1);
    const fullEventUrl = eventUrl.startsWith('http') ? eventUrl : `https://lewishamyourparty.org.uk${eventUrl}`;
    const calendarText = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Lewisham Your Party//Events//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${toCalendarDate(startDateKey)}-${encodeURIComponent(fullEventUrl)}@lewishamyourparty.org.uk`,
        `DTSTAMP:${toCalendarDate(getLondonDateKey(new Date()))}T000000Z`,
        `DTSTART;VALUE=DATE:${toCalendarDate(startDateKey)}`,
        `DTEND;VALUE=DATE:${toCalendarDate(exclusiveEndDateKey)}`,
        `SUMMARY:${escapeCalendarText(frontmatter.title ?? 'Lewisham Your Party event')}`,
        `DESCRIPTION:${escapeCalendarText(frontmatter.synopsis ?? '')}`,
        frontmatter.location ? `LOCATION:${escapeCalendarText(frontmatter.location)}` : '',
        `URL:${fullEventUrl}`,
        'END:VEVENT',
        'END:VCALENDAR',
    ]
        .filter(Boolean)
        .join('\r\n');

    return `data:text/calendar;charset=utf-8,${encodeURIComponent(calendarText)}`;
};
