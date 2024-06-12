import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_neat_and_clean_calendar/neat_and_clean_calendar_event.dart';
import 'package:noteng/constants/api_endpoint.dart';
import 'package:noteng/data/CalendarEvents/calendarModel.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CalendarRepo {
  //Method to Create Event
  static Future<CalendarEvents> createEvent(CalendarEvents event) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');
    var sap_id = await prefs.getString('sapid');

    var data = event.toJson();
    data.addAll({'user': sap_id});

    try {
      final response = await dio.post(
        "${ApiEndpoint.calendar}",
        data: data,
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
      if (response.statusCode == 201) {
        CalendarEvents calendarEvents = CalendarEvents.fromJson(response.data);
        print('Calendar Event created successfully: ${response.data}');
        return calendarEvents;
      } else {
        print(
            'Failed to create calendar event: ${response.data} ${response.statusCode}');
        return CalendarEvents();
      }
    } catch (e) {
      print('Error occurred: $e');
      return CalendarEvents();
    }
  }

  //Method to Delete Event
  static Future<void> deleteEvent(int id) async {
    final dio = Dio();
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token = await prefs.getString('access');

    try {
      final response = await dio.delete(
        "${ApiEndpoint.calendar}/$id",
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
        print('Event deleted successfully: ${response.data}');
      } else {
        print(
            'Failed to delete event: ${response.data} ${response.statusCode}');
      }
    } catch (e) {
      print('Error occurred: $e');
    }
  }

  //Method to Get All Calendar Events
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
          metadata: {
            'user': calendarEvents[i].user!,
            'id': calendarEvents[i].calendarId!
          },
          endTime: DateTime.parse(calendarEvents[i].date!)));
    }

    return list;
  }
}
