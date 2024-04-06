import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:noteng/constants/colors.dart';
import 'package:noteng/models/postListModel.dart';

class PostListWidget extends StatelessWidget {
  const PostListWidget({
    super.key,
    this.pLM,
    required this.width,
    required this.height,
  });

  final PostListModel? pLM;
  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Container(
        clipBehavior: Clip.antiAlias,
        height: height,
        width: width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: backgroundColor,
          border: Border.all(
            color: secondaryColor.withOpacity(0.3),
            width: 1.0,
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            const Text(
              "Internship",
              style: TextStyle(
                color: Colors.black,
                fontSize: 19.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              pLM!.cName!,
              style: TextStyle(
                color: secondaryColor,
                fontSize: 16.0,
                fontWeight: FontWeight.w700,
              ),
            ),
            Text(
              pLM!.cDesc!,
              style: TextStyle(
                color: secondaryColor,
                fontSize: 13.0,
                fontWeight: FontWeight.w500,
              ),
            ),
            Divider(
              color: Colors.grey,
              thickness: 1.0,
              height: 20.0,
              indent: 0,
              endIndent: 0,
            ),
            Row(
              children: [
                //3months example
                FaIcon(FontAwesomeIcons.calendar),
                Text(
                  ("${pLM!.duration!} Months"),
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                // part-time
                SizedBox(
                  width: 14.0,
                ),
                FaIcon(FontAwesomeIcons.clock),
                Text(
                  pLM!.jobMode!,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                //online/hybrid
                SizedBox(
                  width: 14.0,
                ),
                FaIcon(FontAwesomeIcons.buildingCircleExclamation),
                Text(
                  pLM!.mode!,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Spacer(),
                Text(
                  pLM!.dateTime!,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
