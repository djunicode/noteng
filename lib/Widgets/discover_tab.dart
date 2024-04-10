import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/pages/Discover/discover_job.dart';
import 'package:noteng/pages/Discover/discover_notes.dart';
import 'package:noteng/pages/Discover/discover_posts.dart';
import 'package:noteng/pages/Discover/discover_videos.dart';

import '../constants/colors.dart';

Widget DiscoverTab(selectedIndex) {
  return Row(
    children: [
      Expanded(
        child: InkWell(
          onTap: () {
            Get.off(() => const DiscoverJob(),
                transition: Transition.noTransition);
          },
          child: Container(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
            height: 37,
            decoration: BoxDecoration(
              color: selectedIndex == 0 ? primaryColor : secondaryAccentColor,
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(10),
                  bottomLeft: Radius.circular(10)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                SvgPicture.asset(
                  "assets/svg/add_job.svg",
                  color: selectedIndex == 0 ? Colors.white : secondaryColor,
                  height: 20,
                ),
                Text(
                  "Jobs",
                  style: TextStyle(
                      color: selectedIndex == 0 ? Colors.white : secondaryColor,
                      fontSize: 15,
                      fontWeight: FontWeight.w400),
                )
              ],
            ),
          ),
        ),
      ),
      Expanded(
        child: InkWell(
          onTap: () {
            Get.off(() => const DiscoverPost(),
                transition: Transition.noTransition);
          },
          child: Container(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
            height: 37,
            decoration: BoxDecoration(
              color: selectedIndex == 1 ? primaryColor : secondaryAccentColor,
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(0), bottomLeft: Radius.circular(0)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                SvgPicture.asset(
                  "assets/svg/create_post.svg",
                  color: selectedIndex == 1 ? Colors.white : secondaryColor,
                  height: 20,
                ),
                Text(
                  "Posts",
                  style: TextStyle(
                      color: selectedIndex == 1 ? Colors.white : secondaryColor,
                      fontSize: 15,
                      fontWeight: FontWeight.w400),
                )
              ],
            ),
          ),
        ),
      ),
      Expanded(
        child: InkWell(
          onTap: () {
            Get.off(() => const DiscoverNotes(),
                transition: Transition.noTransition);
          },
          child: Container(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
            height: 37,
            decoration: BoxDecoration(
              color: selectedIndex == 2 ? primaryColor : secondaryAccentColor,
              borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(0), bottomLeft: Radius.circular(0)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                SvgPicture.asset(
                  "assets/svg/upload_notes.svg",
                  color: selectedIndex == 2 ? Colors.white : secondaryColor,
                  height: 20,
                ),
                Text(
                  "Notes",
                  style: TextStyle(
                      color: selectedIndex == 2 ? Colors.white : secondaryColor,
                      fontSize: 15,
                      fontWeight: FontWeight.w400),
                )
              ],
            ),
          ),
        ),
      ),
      Expanded(
        child: InkWell(
          onTap: () {
            Get.off(() => const DiscoverVideos(),
                transition: Transition.noTransition);
          },
          child: Container(
            padding: const EdgeInsets.fromLTRB(0, 5, 0, 5),
            height: 37,
            decoration: BoxDecoration(
              color: selectedIndex == 3 ? primaryColor : secondaryAccentColor,
              borderRadius: const BorderRadius.only(
                  topRight: Radius.circular(10),
                  bottomRight: Radius.circular(10)),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                SvgPicture.asset(
                  "assets/svg/share_video.svg",
                  color: selectedIndex == 3 ? Colors.white : secondaryColor,
                  height: 30,
                ),
                Text(
                  "Videos ",
                  style: TextStyle(
                      color: selectedIndex == 3 ? Colors.white : secondaryColor,
                      fontSize: 15,
                      fontWeight: FontWeight.w400),
                )
              ],
            ),
          ),
        ),
      ),
    ],
  );
}
