import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:intl/intl.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:url_launcher/url_launcher.dart';

class JobDetails extends StatelessWidget {
  final Job job;

  const JobDetails({
    required this.job,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String formattedDate =
        DateFormat('dd-MMM-yyyy').format(DateTime.parse(job.uploadTime!));
    String hour = DateFormat('HH').format(DateTime.parse(job.uploadTime!));
    String minute = DateFormat('mm').format(DateTime.parse(job.uploadTime!));

    return Scaffold(
      appBar: const AppBarWidget(title: "Job Opportunity"),
      body: Padding(
        padding: const EdgeInsets.all(12),
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                job.jobTitle!,
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 25,
                ),
              ),
              Text(
                job.company!,
                style: const TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 20,
                    color: Color.fromARGB(255, 106, 106, 106)),
              ),
              Container(
                child: Text(
                  job.location!,
                  style: const TextStyle(
                      color: secondaryColor, fontWeight: FontWeight.bold),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: Container(
                      width: double.infinity,
                      padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                      decoration: BoxDecoration(
                          color: primaryColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const Icon(
                            Icons.calendar_month_outlined,
                            color: Colors.white,
                          ),
                          const SizedBox(
                            width: 2,
                          ),
                          Text(
                            "Duration:\n${job.durationInMonths} Months",
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      margin: const EdgeInsets.only(left: 5, right: 5),
                      padding: const EdgeInsets.fromLTRB(10, 5, 0, 5),
                      decoration: BoxDecoration(
                          color: primaryColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const Icon(
                            Icons.work_outline,
                            color: Colors.white,
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            "Type:\n${job.subtype}",
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                      decoration: BoxDecoration(
                          color: primaryColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const Icon(
                            Icons.laptop,
                            color: Colors.white,
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            "Mode:\n${job.mode}",
                            style: const TextStyle(color: Colors.white),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 5,
              ),
              const Divider(),
              const SizedBox(
                height: 15,
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
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Text(job.description!),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 15,
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
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          borderRadius: BorderRadius.circular(8)),
                      child: Text(job.requirements!),
                    )
                  ],
                ),
              ),
              SizedBox(
                height: 15,
              ),
              const Divider(),
              Row(
                children: [
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "Posted by:",
                        style: TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        job.user!,
                        style: const TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      )
                    ],
                  ),
                  const Spacer(),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        formattedDate,
                        style: const TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        "$hour:$minute",
                        style: const TextStyle(
                            color: secondaryColor, fontWeight: FontWeight.bold),
                      ),
                    ],
                  )
                ],
              ),
              const SizedBox(
                height: 15,
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: job.contactNo != null
          ? ButtonWidget(
              name: "Contact Now",
              onPressed: () {
                launchUrl(Uri.parse('tel:${job.contactNo}'));
              })
          : SizedBox(),
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