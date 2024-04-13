import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import 'package:noteng/constants/colors.dart';
import 'package:noteng/models/jobListModel.dart';
import 'package:noteng/pages/Job/job_details.dart';

class JobListWidget extends StatelessWidget {
  final JobListModel? jLM;
  const JobListWidget(
    this.jLM, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Get.to(
        JobDetails(
          companyName: jLM!.cName.toString(),
          location: "Some Location",
          jobTitle: jLM!.jobType.toString(),
          contact: "Contact Info",
          description: jLM!.cDesc.toString(),
          jobType: jLM!.jobType.toString(),
          tenure: jLM!.duration.toString(),
          requirements: "Requirements",
          workType: jLM!.jobMode.toString(),
          workMode: jLM!.mode.toString(),
          userName: "User Name",
          dateTime: DateTime.parse(jLM!.dateTime.toString()),
        ),
      ),
      child: Container(
        padding: const EdgeInsets.fromLTRB(20, 10, 20, 10),
        height: 140,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: secondaryAccentColor.withAlpha(100),
          // border: Border.all(
          //   color: secondaryColor.withOpacity(0.3),
          //   width: 1.0,
          // ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  jLM!.jobType!,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  DateFormat('dd MMMM yyyy, HH:mm')
                      .format(DateTime.parse(jLM!.dateTime!)),
                  textAlign: TextAlign.right,
                  style: const TextStyle(
                    color: secondaryColor,
                    fontSize: 10.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
            Text(
              jLM!.cName!,
              style: const TextStyle(
                color: secondaryColor,
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            Expanded(
              child: Text(
                jLM!.cDesc!,
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: Colors.black,
                  fontSize: 12.0,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            const Divider(
              color: secondaryColor,
              thickness: 0.5,
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    const Icon(
                      Icons.calendar_today,
                      size: 16,
                      color: secondaryColor,
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      ("${jLM!.duration!} Months"),
                      style: const TextStyle(
                        color: secondaryColor,
                        fontSize: 13.0,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.clock,
                      size: 16,
                      color: secondaryColor,
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      jLM!.jobMode!,
                      style: const TextStyle(
                        color: secondaryColor,
                        fontSize: 13.0,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    const FaIcon(
                      FontAwesomeIcons.building,
                      size: 16,
                      color: secondaryColor,
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      jLM!.mode!,
                      style: const TextStyle(
                        color: secondaryColor,
                        fontSize: 13.0,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
