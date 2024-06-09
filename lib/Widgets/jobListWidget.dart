import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:noteng/pages/Job/job_details.dart';
import 'package:shimmer/shimmer.dart';

class JobListWidget extends StatelessWidget {
  final Job job;
  const JobListWidget(
    this.job, {
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Get.to(
        JobDetails(
          job: job,
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
                  job.subtype!,
                  style: const TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Text(
                  DateFormat('dd MMMM yyyy, HH:mm')
                      .format(DateTime.parse(job.uploadTime!)),
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
              job.company!,
              style: const TextStyle(
                color: secondaryColor,
                fontSize: 16,
                fontWeight: FontWeight.w700,
              ),
            ),
            Expanded(
              child: Text(
                job.description!,
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
                      ("${job.durationInMonths!} Months"),
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
                      job.mode!,
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
                      job.location!,
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

class JobListWidget_Shimmer extends StatelessWidget {
  const JobListWidget_Shimmer({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
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
              Shimmer.fromColors(
                  baseColor: secondaryColor.withAlpha(100),
                  highlightColor: secondaryAccentColor,
                  child: Container(
                    height: 20,
                    width: 100,
                    decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        borderRadius: BorderRadius.circular(10)),
                  )),
              Shimmer.fromColors(
                  baseColor: secondaryColor.withAlpha(100),
                  highlightColor: secondaryAccentColor,
                  child: Container(
                    height: 15,
                    width: 30,
                    decoration: BoxDecoration(
                        color: Colors.grey.shade400,
                        borderRadius: BorderRadius.circular(8)),
                  )),
            ],
          ),
          Shimmer.fromColors(
              baseColor: secondaryColor.withAlpha(50),
              highlightColor: secondaryAccentColor,
              child: Container(
                margin: EdgeInsets.only(top: 10),
                height: 20,
                width: double.infinity,
                decoration: BoxDecoration(
                    color: Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(8)),
              )),
          Shimmer.fromColors(
              baseColor: secondaryColor.withAlpha(50),
              highlightColor: secondaryAccentColor,
              child: Container(
                margin: EdgeInsets.symmetric(vertical: 5),
                height: 20,
                width: double.infinity,
                decoration: BoxDecoration(
                    color: Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(8)),
              )),
          const Divider(
            color: secondaryColor,
            thickness: 0.5,
          ),
          Shimmer.fromColors(
              baseColor: secondaryColor.withAlpha(50),
              highlightColor: secondaryAccentColor,
              child: Container(
                height: 20,
                width: double.infinity,
                decoration: BoxDecoration(
                    color: Colors.grey.shade400,
                    borderRadius: BorderRadius.circular(8)),
              )),
        ],
      ),
    );
  }
}
