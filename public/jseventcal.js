var currentDate;

var JsEventCal = function(div, content) {
    currentDate = new XDate();
    var calendarContainerDiv = $('<div id="cal-container"></div>');
    var topHeader = $('<div id="top-header"></div>');

    var leftButton = $('<button class="btn">&#60;</button>');
    leftButton.click(function() {
      currentDate.addMonths(-1);
      updateCalendar(div, content);
    });

    var rightButton = $('<button class="btn">&#62;</button>');
    rightButton.click(function() {
      currentDate.addMonths(1);
      updateCalendar(div, content);
    });

    var buttonGroup = $('<span class="btn-group">');
    buttonGroup.append(leftButton);
    buttonGroup.append(rightButton);
    topHeader.append(buttonGroup);
    topHeader.append($('<span id="cal-title"></span>'));

    $(div).append(topHeader);
    $(div).append(calendarContainerDiv);

    updateCalendar(div, content);
};

var updateCalendar = function(div, content) {
  $('#cal-title', div).empty();
  $('#cal-title', div).append($('<span class="cal-title"></span>').append(currentDate.toString('MMMM, yyyy')));
  $('#cal-container', div).empty();
  $('#cal-container', div).append(createCalendar(content, currentDate));
};

var createCalendar = function(content, xdate) {
    var calendarSkeleton = createCalendarSkeleton(xdate);
    console.log(content);
    for (var i = 0; i < content.length; i++) {
        var event = $('<p class="event"></p>');
        var eventSpan = $('<a href="javascript:"></a>');
        eventSpan.append(content[i].event_title);
        event.append(eventSpan);
        $('.' + content[i].date, calendarSkeleton).append(event);
        eventSpan.popover(
          { placement: 'top',
            title: content[i].event_title,
            html: true,
            content: content[i].event_details_html,
            animation: true});
    }
    return calendarSkeleton;
};

var DAY_OF_WEEK_ARRAY = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var createCalendarSkeleton = function(currentDate) {
    var today = currentDate.clone();
    var xdate = currentDate.clone();

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
