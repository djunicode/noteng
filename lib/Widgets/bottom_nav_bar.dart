import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/pages/Calendar/calendar_events.dart';
import 'package:noteng/pages/Discover/discover_job.dart';
import 'package:noteng/pages/Home/home_screen.dart';
import 'package:noteng/pages/profile/profilePage.dart';
import '../../constants/colors.dart';

class Bottomnavbar extends StatefulWidget {
  int currentIndex = 0;
  Bottomnavbar(this.currentIndex, {Key? key}) : super(key: key);

  @override
  _BottomnavbarState createState() => _BottomnavbarState();
}

class _BottomnavbarState extends State<Bottomnavbar> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      backgroundColor: secondaryAccentColor,
      showUnselectedLabels: true,
      showSelectedLabels: true,
      selectedIconTheme: const IconThemeData(color: primaryColor),
      unselectedIconTheme: IconThemeData(color: Colors.grey[800]),
      type: BottomNavigationBarType.fixed,
      selectedItemColor: primaryColor,
      selectedLabelStyle: const TextStyle(color: primaryColor, fontSize: 14),
      unselectedLabelStyle: const TextStyle(color: Colors.black, fontSize: 14),
      currentIndex: widget.currentIndex,
      items: const [
        BottomNavigationBarItem(
          icon: Icon(
            Icons.home_outlined,
          ),
          label: 'Home',
        ),
        BottomNavigationBarItem(
            icon: Icon(
              Icons.trending_up_rounded,
            ),
            label: 'Discover'),
        BottomNavigationBarItem(
          icon: Icon(
            Icons.home_outlined,
            color: Colors.transparent,
          ),
          label: '',
        ),
        BottomNavigationBarItem(
          icon: Icon(
            Icons.calendar_month_outlined,
          ),
          label: 'Events',
        ),
        BottomNavigationBarItem(
            icon: Icon(
              Icons.person_2_outlined,
            ),
            label: 'Profile'),
      ],
      onTap: (value) {
        if (value == 0 && widget.currentIndex != 0) {
          Get.offAll(() => const HomeScreen(), transition: Transition.fadeIn);
        }
        if (value == 1 && widget.currentIndex != 1) {
          Get.offAll(() => DiscoverJob(), transition: Transition.fadeIn);
        }
        if (value == 3 && widget.currentIndex != 3) {
          Get.offAll(() => const CalendarEvents(),
              transition: Transition.fadeIn);
        }
        if (value == 4 && widget.currentIndex != 4) {
          Get.offAll(() => const ProfilePage(), transition: Transition.fadeIn);
        }
      },
    );
  }
}
