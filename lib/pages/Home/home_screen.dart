import 'dart:math';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/jobListWidget.dart';
import 'package:noteng/Widgets/notesListWidget.dart';
import 'package:noteng/Widgets/postListWidget.dart';
import 'package:noteng/Widgets/videoListWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/pages/Home/sample_data.dart';

import '../../Widgets/bottom_nav_bar.dart';
import '../../Widgets/modalbottom.dart';
import '../../models/jobListModel.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController SearchController = TextEditingController();
  var jobSelected = true;
  var postSelected = false;
  var noteSelected = false;
  var videoSelected = false;

  var userName = "User Name";
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
      bottomNavigationBar: Bottomnavbar(0),
      backgroundColor: Colors.white,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(250),
        child: Container(
          padding: const EdgeInsets.fromLTRB(25, 50, 25, 20),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "NOTENG",
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.w800),
                      ),
                      Text(
                        "Hey, $userName",
                        style: const TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w800),
                      ),
                    ],
                  ),
                  Container(
                    height: 50,
                    width: 50,
                    decoration: BoxDecoration(
                        color: secondaryAccentColor.withAlpha(150),
                        borderRadius: BorderRadius.circular(15)),
                    child: const Icon(
                      Icons.person_outline,
                      color: primaryColor,
                      size: 30,
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              Container(
                width: double.infinity,
                height: 60,
                decoration: BoxDecoration(
                    color: secondaryAccentColor,
                    borderRadius: BorderRadius.circular(12)),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: SearchController,
                        decoration: const InputDecoration(
                            hintText: "Search for posts, notes, etc...",
                            hintStyle: TextStyle(
                                color: secondaryColor,
                                fontSize: 16,
                                fontWeight: FontWeight.w500),
                            border: InputBorder.none,
                            contentPadding:
                                EdgeInsets.only(left: 10, right: 10)),
                      ),
                    ),
                    Container(
                      margin: const EdgeInsets.fromLTRB(0, 0, 10, 0),
                      height: 40,
                      width: 40,
                      decoration: BoxDecoration(
                          color: primaryColor,
                          borderRadius: BorderRadius.circular(10)),
                      child: Padding(
                        padding: const EdgeInsets.all(9.0),
                        child: SvgPicture.asset(
                          "assets/svg/search.svg",
                        ),
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = false;
                          videoSelected = false;
                          jobSelected = !jobSelected;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: jobSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Jobs",
                            style: TextStyle(
                                color:
                                    jobSelected ? Colors.white : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = !postSelected;
                          noteSelected = false;
                          videoSelected = false;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: postSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Posts & Hackathons",
                            style: TextStyle(
                                color: postSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = !noteSelected;
                          videoSelected = false;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: noteSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Notes",
                            style: TextStyle(
                                color: noteSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = false;
                          videoSelected = !videoSelected;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: videoSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Videos",
                            style: TextStyle(
                                color: videoSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Explore Latest Job Opportunities",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
                const Divider(
                  color: secondaryColor,
                  thickness: 0.5,
                ),
                SizedBox(
                  height: 140,
                  child: PageView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: SampleJobList.length,
                    itemBuilder: (context, index) {
                      return JobListWidget(
                        SampleJobList[index],
                      );
                    },
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  "Explore Latest Posts & Hackathons",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
                const Divider(
                  color: secondaryColor,
                  thickness: 0.5,
                ),
                SizedBox(
                  height: 170,
                  child: PageView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: SampleJobList.length,
                    itemBuilder: (context, index) {
                      return PostListWidget(
                        SamplePostList[index],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Container(
            height: 215,
            padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
            width: double.infinity,
            color: primaryColor,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Explore Shared Notes",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
                const Divider(
                  color: Colors.white,
                  thickness: 0.5,
                ),
                SizedBox(
                  height: 156,
                  child: ListView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: SampleJobList.length,
                    itemBuilder: (context, index) {
                      return NotesListWidget(
                        SampleNoteList[index],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(25, 20, 25, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Explore Shared Video Resources",
                  style: TextStyle(
                      color: Colors.black,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
                const Divider(
                  color: secondaryColor,
                  thickness: 0.5,
                ),
                SizedBox(
                  height: 246,
                  child: PageView.builder(
                    scrollDirection: Axis.horizontal,
                    itemCount: SampleJobList.length,
                    itemBuilder: (context, index) {
                      return VideoListWidget(
                        vLink: SampleVideoList[index]["vLink"],
                        vTitle: SampleVideoList[index]["vTitle"],
                      );
                    },
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 50,
          ),
        ],
      )),
    );
  }
}
