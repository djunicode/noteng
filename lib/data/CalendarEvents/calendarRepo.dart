import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_neat_and_clean_calendar/neat_and_clean_calendar_event.dart';
import 'package:intl/intl.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/CalendarEvents/calendarModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CalendarRepo {
  //Method to Get All Posts
  static Future<List<CalendarEvents>> getAllEvents() async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      List<CalendarEvents> events = [];

      final response = await dio.get(
        ApiEndpoint.calendar,
        options: Options(
          validateStatus: (status) {
            return true;
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer $access_token'
          },
        ),
      );
      if (response.statusCode == 200) {
        List<dynamic> responseData = response.data;
        events = responseData
            .map((postJson) => CalendarEvents.fromJson(postJson))
            .toList();

        print('All Events fetched successfully: ${response.data}');
      } else {
        print(
            'Failed to fetch all events: ${response.data} ${response.statusCode}');
      }
      return events;
    } catch (e) {
      print('Error occurred: $e');
      return [];
    }
  }

  static Future<List<NeatCleanCalendarEvent>> getFormattedEventList() async {
    List<NeatCleanCalendarEvent> list = [];
    List<CalendarEvents> calendarEvents = await getAllEvents();
    for (var i = 0; i < calendarEvents.length; i++) {
      list.add(NeatCleanCalendarEvent(calendarEvents[i].title!,
          description: calendarEvents[i].description!,
          startTime: DateTime.parse(calendarEvents[i].date!),
          isAllDay: true,
          icon: "Icons.event",
          isDone: DateTime.parse(calendarEvents[i].date!)
                      .compareTo(DateTime.now()) <
                  0
              ? true
              : false,
          color: Colors.green,
          endTime: DateTime.parse(calendarEvents[i].date!)));
    }

    return list;
  }
}
