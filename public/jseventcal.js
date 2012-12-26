var JsEventCal = function(div, content) {
    var calendarSkeleton = createCalendarSkeleton(new XDate());
    for (var i = 0; i < content.length; i++) {
        $('.' + content[i].date, calendarSkeleton).append(
            $('<p class="event"></p>')
	        .append(content[i].event));
    }
    $(div).append(calendarSkeleton);
};

var DAY_OF_WEEK_ARRAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var createCalendarSkeleton = function(xdate) {
    var today = xdate.clone();

    // Find the first day of the calendar to render
    xdate.setDate(1);
    var month = xdate.getMonth();
    var nextMonth = xdate.clone().addMonths(1).getMonth();
    while (xdate.getDay() != 0) {
	xdate.addDays(-1);
    }

    var isFirst = true;
    var currentMonth;
    var calendarTable = $('<table cellpadding="0" cellspacing="0" class="month-table""></table>');
 
    // Days of the week.
    var monthHeaderRow = $('<tr class="month-header-row"></tr>');
    calendarTable.append(monthHeaderRow);  
    for (var i = 0; i < 7; i++) {
        $(monthHeaderRow).append($('<th class="month-header"">' + DAY_OF_WEEK_ARRAY[i] + '</th>'));
    }

    while (isFirst || xdate.getMonth() != nextMonth) {
        if (xdate.getDay() == 0) {
	    currentMonth = $('<tr class="monthrow"></tr>');
            calendarTable.append(currentMonth);
        }
        var dayTd =
            $('<td class="month-day"></td>');
	dayTd.addClass(xdate.toString('yyyy-MM-dd'));
        currentMonth.append(dayTd);
        if (xdate.getMonth() != month) {
	    dayTd.append(
	        $('<span class="prev-month-date"></span>')
	            .append(xdate.getDate()));
	} else {
            dayTd.append(
	        $('<span class="current-month-date"></span>')
	            .append(xdate.getDate()));
	}
        xdate.addDays(1);
	isFirst = false;
    }

    return calendarTable;
};
