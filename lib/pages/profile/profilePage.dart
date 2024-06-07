import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/bottom_nav_bar.dart';
import 'package:noteng/Widgets/jobListWidget.dart';
import 'package:noteng/Widgets/modalbottom.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/pages/Home/sample_data.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  var userName = "User Name";
  @override
  Widget build(BuildContext context) {
    double h = MediaQuery.of(context).size.height;
    double w = MediaQuery.of(context).size.width;
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
      bottomNavigationBar: Bottomnavbar(4),
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        title: const Text(
          "My Profile",
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.only(top: 30),
          child: Column(
            children: [
              Center(
                child: Container(
                  height: h * 0.23,
                  width: w * 0.95,
                  decoration: BoxDecoration(
                      color: primaryColor,
                      borderRadius: BorderRadius.circular(15)),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.only(top: 15),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Padding(
                              padding: const EdgeInsets.only(left: 20),
                              child: Text(
                                "$userName",
                                style: TextStyle(
                                    color: backgroundColor,
                                    fontSize: 25,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                            Padding(
                              padding: const EdgeInsets.only(
                                right: 20,
                              ),
                              child: Container(
                                height: h * 0.04,
                                width: w * 0.23,
                                decoration: BoxDecoration(
                                    color: backgroundColor,
                                    borderRadius: BorderRadius.circular(8)),
                                child: Center(
                                  child: Text(
                                    "Student",
                                    style: TextStyle(
                                        color: primaryColor,
                                        fontSize: 16,
                                        fontWeight: FontWeight.w600),
                                  ),
                                ),
                              ),
                            )
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Icon(
                              Icons.email_outlined,
                              color: backgroundColor,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              "shahrishi501@gmail.com",
                              style: TextStyle(
                                color: backgroundColor,
                                fontWeight: FontWeight.bold,
                                fontSize: 15,
                              ),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Padding(
                        padding: const EdgeInsets.only(left: 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Icon(
                              Icons.phone_outlined,
                              color: backgroundColor,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              "9876956781",
                              style: TextStyle(
                                  color: backgroundColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15),
                            ),
                          ],
                        ),
                      ),
                      SizedBox(
                        height: 10,
                      ),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.start,
                          children: [
                            Icon(
                              Icons.school_outlined,
                              color: backgroundColor,
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Text(
                              "Computer Engineering - 2026",
                              style: TextStyle(
                                  color: backgroundColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: 20,
              ),
              Center(
                child: Container(
                  height: h * 0.17,
                  width: w * 0.95,
                  decoration: BoxDecoration(
                    color: secondaryAccentColor,
                    borderRadius: BorderRadius.circular(15),
                  ),
                  child: SingleChildScrollView(
                    scrollDirection: Axis.horizontal,
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        Padding(
                          padding: EdgeInsets.only(left: 5, top: 20),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Center(
                                child: Icon(
                                  Icons.work_outline,
                                  size: 30,
                                ),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "12",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 25),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "Jobs Posted",
                                style: TextStyle(fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: 5,
                        ),
                        VerticalDivider(
                          thickness: 0.5,
                          color: Colors.black,
                        ),
                        Padding(
                          padding: EdgeInsets.only(top: 20),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Center(
                                child: Icon(
                                  Icons.add_photo_alternate_outlined,
                                  size: 30,
                                ),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "09",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 25),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "Posts Created",
                                style: TextStyle(fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: 5,
                        ),
                        VerticalDivider(
                          thickness: 0.5,
                          color: Colors.black,
                        ),
                        Padding(
                          padding: EdgeInsets.only(
                            top: 20,
                          ),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Center(
                                child: Icon(
                                  Icons.upload_file,
                                  size: 30,
                                ),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "34",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 25),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "Notes Shared",
                                style: TextStyle(fontSize: 11),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(
                          width: 5,
                        ),
                        VerticalDivider(
                          thickness: 0.5,
                          color: Colors.black,
                        ),
                        Padding(
                          padding: EdgeInsets.only(top: 20, right: 4),
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              Center(
                                child: Icon(
                                  Icons.videocam_outlined,
                                  size: 28,
                                ),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "23",
                                style: TextStyle(
                                    fontWeight: FontWeight.bold, fontSize: 25),
                              ),
                              SizedBox(
                                height: 5,
                              ),
                              Text(
                                "Videos Shared",
                                style: TextStyle(fontSize: 10),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10),
                child: Row(
                  children: [
                    GestureDetector(
                      child: Container(
                        height: h * 0.05,
                        width: w * 0.46,
                        decoration: BoxDecoration(
                            color: primaryColor,
                            borderRadius: BorderRadius.circular(8)),
                        child: const Padding(
                          padding: EdgeInsets.only(left: 10, right: 10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Edit Profile",
                                style: TextStyle(
                                    color: backgroundColor,
                                    fontWeight: FontWeight.w700),
                              ),
                              Icon(
                                Icons.edit_outlined,
                                color: backgroundColor,
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                    SizedBox(
                      width: 15,
                    ),
                    GestureDetector(
                      child: Container(
                        height: h * 0.05,
                        width: w * 0.46,
                        decoration: BoxDecoration(
                            color: secondaryAccentColor,
                            borderRadius: BorderRadius.circular(8)),
                        child: Padding(
                          padding: const EdgeInsets.only(left: 10, right: 10),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                "Logout",
                                style: TextStyle(
                                    color: Colors.black,
                                    fontWeight: FontWeight.w700),
                              ),
                              Icon(
                                Icons.logout_outlined,
                                color: Colors.black,
                              )
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Padding(
                padding: const EdgeInsets.only(left: 10, right: 20),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "My Post Job Opportunities",
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 17,
                      ),
                    ),
                    Divider(
                      thickness: 0.4,
                      color: Colors.black,
                    ),
                    //   SizedBox(
                    // height: 140,
                    // child: PageView.builder(
                    //   scrollDirection: Axis.horizontal,
                    //   itemCount: SampleJobList.length,
                    //   itemBuilder: (context, index) {
                    //     return JobListWidget(
                    //       SampleJobList[index],
                    //       );
                    //     },
                    //   ),
                    //   ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
