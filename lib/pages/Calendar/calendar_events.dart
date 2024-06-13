import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_neat_and_clean_calendar/flutter_neat_and_clean_calendar.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:noteng/Widgets/bottom_nav_bar.dart';
import 'package:noteng/Widgets/loading.dart';
import 'package:noteng/Widgets/modalbottom.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/data/CalendarEvents/calendarRepo.dart';
import 'package:lottie/lottie.dart';
import 'package:noteng/data/CalendarEvents/calendarModel.dart' as Cal;
import 'package:shared_preferences/shared_preferences.dart';
import '../../constants/colors.dart';
import '../../data/User/userRepo.dart';

class CalendarEvents extends StatefulWidget {
  const CalendarEvents({super.key});

  @override
  State<CalendarEvents> createState() => _CalendarEventsState();
}

class _CalendarEventsState extends State<CalendarEvents> {
  List<NeatCleanCalendarEvent> list = [];
  bool isAdmin = false;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    checkAdmin();
    fetchCalendar();
  }

  Future<void> checkAdmin() async {
    isAdmin = await UserRepo.isAdmin();
    setState(() {});
  }

  var sap_id;

  Future fetchCalendar() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var sap = await prefs.getString('sapid');
    sap_id = sap;
    list = await CalendarRepo.getFormattedEventList();
    if (mounted) {
      setState(() {});
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      floatingActionButton: isAdmin
          ? FloatingActionButton(
              onPressed: () {
                TextEditingController title = TextEditingController();
                TextEditingController description = TextEditingController();
                TextEditingController event_date = TextEditingController();

                Get.bottomSheet(
                        SingleChildScrollView(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Container(
                                padding:
                                    const EdgeInsets.fromLTRB(20, 20, 20, 20),
                                decoration: const BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: BorderRadius.only(
                                    topLeft: Radius.circular(20),
                                    topRight: Radius.circular(20),
                                  ),
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Text(
                                        "Event Title",
                                        style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.w700),
                                      ),
                                    ),
                                    textFieldWidget(
                                      hintText: "Enter the event title",
                                      maxLines: 1,
                                      controller: title,
                                    ),
                                    const SizedBox(
                                      height: 5,
                                    ),
                                    const Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Text(
                                        "Event Description",
                                        style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.w700),
                                      ),
                                    ),
                                    textFieldWidget(
                                      hintText: "Enter Event Description",
                                      maxLines: 3,
                                      controller: description,
                                    ),
                                    const SizedBox(
                                      height: 5,
                                    ),
                                    const Padding(
                                      padding: EdgeInsets.all(8.0),
                                      child: Text(
                                        "Event Date",
                                        style: TextStyle(
                                            fontSize: 18,
                                            fontWeight: FontWeight.w700),
                                      ),
                                    ),
                                    InkWell(
                                      onTap: () async {
                                        await showDatePicker(
                                          context: context,
                                          lastDate: DateTime(2030),
                                          firstDate: DateTime(2024),
                                          initialDate: DateTime.now(),
                                        ).then((pickedDate) {
                                          if (pickedDate == null) return;
                                          event_date.text =
                                              DateFormat('yyyy-MM-dd')
                                                  .format(pickedDate);
                                        });
                                      },
                                      child: TextFormField(
                                        enabled: false,
                                        readOnly: true,
                                        controller: event_date,
                                        style: const TextStyle(
                                          color: Colors.black,
                                        ),
                                        decoration: InputDecoration(
                                          floatingLabelBehavior:
                                              FloatingLabelBehavior.never,
                                          labelText: "Choose the Event Date",
                                          floatingLabelStyle:
                                              TextStyle(color: primaryColor),
                                          contentPadding: EdgeInsets.all(14.0),
                                          filled: true,
                                          fillColor: secondaryAccentColor,
                                          focusedBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(16.0),
                                            borderSide: BorderSide.none,
                                          ),
                                          enabledBorder: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(16.0),
                                            borderSide: BorderSide.none,
                                          ),
                                          border: OutlineInputBorder(
                                            borderRadius:
                                                BorderRadius.circular(16.0),
                                            borderSide: BorderSide.none,
                                          ),
                                          hintText: "Choose the Event Date",
                                          hintStyle: const TextStyle(
                                            color: Colors.black,
                                            fontSize: 14.0,
                                            fontWeight: FontWeight.w300,
                                          ),
                                          suffixIcon:
                                              Icon(Icons.calendar_month),
                                        ),
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 20,
                                    ),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceEvenly,
                                      children: [
                                        Expanded(
                                          child: InkWell(
                                            onTap: () {
                                              if (title.text.isEmpty ||
                                                  description.text.isEmpty ||
                                                  event_date.text.isEmpty) {
                                                return;
                                              }
                                              LoadingBar.loadingDialog(context);
                                              CalendarRepo.createEvent(
                                                      Cal.CalendarEvents(
                                                          date: event_date.text,
                                                          description:
                                                              description.text,
                                                          title: title.text,
                                                          note:
                                                              "Added via NOTENG Mobile App"))
                                                  .then((value) {
                                                if (value.calendarId != null) {
                                                  ScaffoldMessenger.of(context)
                                                      .showSnackBar(const SnackBar(
                                                          content: Text(
                                                              "Event added successfully")));
                                                  Get.back();
                                                } else {
                                                  ScaffoldMessenger.of(context)
                                                      .showSnackBar(const SnackBar(
                                                          content: Text(
                                                              "Failed to add event")));
                                                }
                                                Get.back();
                                              });
                                            },
                                            child: Container(
                                              height: 60,
                                              decoration: BoxDecoration(
                                                  color: primaryColor,
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          10)),
                                              child: const Center(
                                                child: Text(
                                                  'Add Event',
                                                  textAlign: TextAlign.center,
                                                  style: TextStyle(
                                                      color: Colors.white,
                                                      fontWeight:
                                                          FontWeight.bold,
                                                      fontSize: 16),
                                                ),
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Text(
                                      '*The event added will be visible to everyone.',
                                      textAlign: TextAlign.center,
                                      style: TextStyle(
                                          fontWeight: FontWeight.w600,
                                          fontSize: 10),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        persistent: false)
                    .then((value) {
                  fetchCalendar();
                  setState(() {});
                });
              },
              backgroundColor: primaryColor,
              child: const Icon(
                Icons.calendar_month_outlined,
                color: Colors.white,
              ),
            )
          : FloatingActionButton(
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
                        return Stack(
                          alignment: Alignment.topRight,
                          children: [
                            Container(
                              margin: const EdgeInsets.fromLTRB(10, 5, 10, 0),
                              height: 90,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10.0),
                                color: secondaryAccentColor.withAlpha(100),
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
                                      padding: const EdgeInsets.fromLTRB(
                                          20, 5, 20, 5),
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
                                          Expanded(
                                            child: Text(
                                              event.description,
                                              maxLines: 3,
                                              overflow: TextOverflow.ellipsis,
                                              style: TextStyle(
                                                  fontWeight: FontWeight.w400,
                                                  fontSize: 11),
                                            ),
                                          ),
                                          Row(
                                            mainAxisAlignment:
                                                MainAxisAlignment.end,
                                            children: [
                                              Text(
                                                DateFormat('dd-MM-yyyy')
                                                    .format(event.startTime),
                                                maxLines: 3,
                                                overflow: TextOverflow.ellipsis,
                                                style: TextStyle(
                                                    fontWeight: FontWeight.w400,
                                                    fontSize: 11),
                                              ),
                                            ],
                                          )
                                        ],
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            event.metadata!['user'] == sap_id
                                ? Padding(
                                    padding:
                                        const EdgeInsets.fromLTRB(0, 5, 5, 0),
                                    child: InkWell(
                                      onTap: () {
                                        Get.dialog(AlertDialog(
                                          title: const Text("Delete Event"),
                                          content: const Text(
                                              "Are you sure you want to delete this event?"),
                                          actions: [
                                            TextButton(
                                                onPressed: () {
                                                  Get.back();
                                                },
                                                child: const Text("No")),
                                            TextButton(
                                                onPressed: () async {
                                                  Get.back();
                                                  LoadingBar.loadingDialog(
                                                      context);
                                                  await CalendarRepo
                                                      .deleteEvent(event
                                                          .metadata!['id']);
                                                  Get.back();
                                                  setState(() {
                                                    fetchCalendar();
                                                  });
                                                },
                                                child: const Text("Yes")),
                                          ],
                                        ));
                                      },
                                      child: const CircleAvatar(
                                          backgroundColor: secondaryColor,
                                          radius: 15,
                                          child: Icon(
                                            Icons.delete_outline,
                                            color: Colors.white,
                                          )),
                                    ),
                                  )
                                : SizedBox()
                          ],
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
