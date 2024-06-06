import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/constants/colors.dart';

class JobDetails extends StatelessWidget {
  final String companyName;
  final String location;
  final String jobTitle;
  final String contact;
  final String description;
  final String jobType;
  final String tenure;
  final String requirements;
  final String workType;
  final String workMode;
  final String userName;
  final DateTime dateTime;

  const JobDetails({
    required this.companyName,
    required this.location,
    required this.jobTitle,
    required this.contact,
    required this.description,
    required this.jobType,
    required this.tenure,
    required this.requirements,
    required this.workType,
    required this.workMode,
    required this.userName,
    required this.dateTime,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String formattedDate = DateFormat('dd-MMM-yyyy').format(dateTime);
    String hour = DateFormat('HH').format(dateTime);
    String minute = DateFormat('mm').format(dateTime);

    return Scaffold(
      appBar: const AppBarWidget(title: "Job Opportunity"),
      body: Padding(
        padding: EdgeInsets.all(12),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                jobTitle,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 25,
                ),
              ),
              Text(
                companyName,
                style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Color.fromARGB(255, 106, 106, 106)),
              ),
              Container(
                child: Text(
                  location,
                  style: TextStyle(
                      color: secondaryColor, fontWeight: FontWeight.bold),
                ),
              ),
              SizedBox(height: 12),
              Row(
                children: [
                  Container(
                    padding: EdgeInsets.all(8),
                    child: Text(
                      jobType,
                      style: TextStyle(color: Colors.white),
                    ),
                    decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(10)),
                  ),
                  Spacer(),
                  Container(
                    padding: EdgeInsets.all(8),
                    child: Text(
                      tenure + " Months",
                      style: TextStyle(color: Colors.white),
                    ),
                    decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(8)),
                  ),
                  Spacer(),
                  Container(
                    padding: EdgeInsets.all(8),
                    child: Text(
                      workType,
                      style: TextStyle(color: Colors.white),
                    ),
                    decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(8)),
                  ),
                  Spacer(),
                  Container(
                    padding: EdgeInsets.all(8),
                    child: Text(
                      workMode,
                      style: TextStyle(color: Colors.white),
                    ),
                    decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(8)),
                  ),
                  Spacer()
                ],
              ),
              SizedBox(
                height: 5,
              ),
              Divider(),
              SizedBox(
                height: 5,
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Job Description",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      padding: EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Text(description),
                    )
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Job Requirements",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    Container(
                      padding: EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Text(requirements),
                    )
                  ],
                ),
              ),
              Divider(),
              Row(
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Posted by:",
                        style: TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        userName,
                        style: TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      )
                    ],
                  ),
                  Spacer(),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        formattedDate,
                        style: TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "$hour:$minute",
                        style: TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                    ],
                  )
                ],
              ),
              SizedBox(
                height: 15,
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(name: "Apply", onPressed: () {}),
    );
  }
}


      // home: JobDetails(
      //   companyName: "Unicode",
      //   contact: "contsct@unicode",
      //   description:
      //       "orem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id odio nec nulla rutrum ultrices. Mauris vel aliquam quam, eu fringilla justo. Quisque porttitl fringi",
      //   workMode: "Offline",
      //   workType: "Full Time",
      //   jobTitle: "Flutter Intern",
      //   jobType: "Internship",
      //   requirements:
      //       """Proficiency in Flutter framework with strong understanding of Dart programming language.
      //       Hands-on experience in developing and deploying mobile applications on both Android and iOS platforms.
      //       Familiarity with RESTful APIs for seamless integration of backend services.""",
      //   location: "Mumbai",
      //   tenure: "2 months",
      //   userName: "Vikas Kewat",
      //   dateTime: DateTime.now(),
      // ),