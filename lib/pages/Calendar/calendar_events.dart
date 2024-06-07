import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_neat_and_clean_calendar/flutter_neat_and_clean_calendar.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/bottom_nav_bar.dart';
import 'package:noteng/Widgets/modalbottom.dart';
import 'package:noteng/data/CalendarEvents/calendarRepo.dart';
import 'package:lottie/lottie.dart';

import '../../constants/colors.dart';

class CalendarEvents extends StatefulWidget {
  const CalendarEvents({super.key});

  @override
  State<CalendarEvents> createState() => _CalendarEventsState();
}

class _CalendarEventsState extends State<CalendarEvents> {
  List<NeatCleanCalendarEvent> list = [];
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchCalendar();
  }

  Future fetchCalendar() async {
    list = await CalendarRepo.getFormattedEventList();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Get.bottomSheet(const Modalbottom(), persistent: false);
        },
        backgroundColor: primaryColor,
        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      bottomNavigationBar: Bottomnavbar(3),
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        title: const Text(
          "Events Calendar",
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
        ),
      ),
      body: Calendar(
        eventsList: list,
        isExpandable: true,
        selectedColor: primaryColor,
        selectedTodayColor: primaryColor,
        todayColor: primaryColor,
        eventDoneColor: primaryColor,
        hideTodayIcon: true,
        allDayEventText: "",
        locale: 'en',
        isExpanded: true,
        expandableDateFormat: 'EEEE, dd. MMMM yyyy',
        datePickerType: DatePickerType.date,
        dayOfWeekStyle: const TextStyle(
            color: Colors.black, fontWeight: FontWeight.w800, fontSize: 11),
        eventListBuilder:
            (BuildContext context, List<NeatCleanCalendarEvent> events) {
          return Expanded(
              child: events.length > 0
                  ? ListView(
                      children: events.map((event) {
                        return Container(
                          margin: const EdgeInsets.fromLTRB(10, 5, 10, 0),
                          height: 90,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(10.0),
                            color: Colors.white,
                            border: Border.all(
                              color: secondaryColor.withOpacity(0.2),
                              width: 1.0,
                            ),
                          ),
                          child: Row(
                            children: [
                              Container(
                                height: 90,
                                width: 10,
                                decoration: BoxDecoration(
                                  borderRadius: const BorderRadius.only(
                                      topLeft: Radius.circular(10),
                                      bottomLeft: Radius.circular(10)),
                                  color: primaryColor,
                                  border: Border.all(
                                    color: secondaryColor.withOpacity(0.2),
                                    width: 1.0,
                                  ),
                                ),
                              ),
                              Expanded(
                                child: Padding(
                                  padding:
                                      const EdgeInsets.fromLTRB(20, 5, 20, 5),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        event.summary,
                                        style: TextStyle(
                                            fontWeight: FontWeight.w700),
                                      ),
                                      Divider(
                                        height: 5,
                                      ),
                                      Text(
                                        event.description,
                                        maxLines: 3,
                                        overflow: TextOverflow.ellipsis,
                                        style: TextStyle(
                                            fontWeight: FontWeight.w400,
                                            fontSize: 11),
                                      )
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        );
                      }).toList(),
                    )
                  : Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Text(
                          "No Events for the day!",
                          style: TextStyle(fontSize: 16),
                        ),
                        Lottie.asset("assets/svg/events.json")
                      ],
                    ));
        },
      ),
    );
  }
}
