import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:noteng/constants/colors.dart';

class VideoListWidget extends StatelessWidget {
  const VideoListWidget({
    Key? key,
    this.vLink,
    this.vThumbnail,
    this.vTitle,
  }) : super(key: key);

  final String? vTitle;
  final String? vThumbnail;
  final String? vLink;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Container(
        padding: EdgeInsets.symmetric(
          horizontal: 16.0,
          vertical: 16.0,
        ),
        clipBehavior: Clip.antiAlias,
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
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Text(
                  vTitle!,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18.0,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                Spacer(),
                IconButton(
                  onPressed: () {},
                  icon: FaIcon(FontAwesomeIcons.link),
                ),
                SizedBox(
                  width: 18.0,
                ),
              ],
            ),
            Divider(
              color: Colors.grey,
              thickness: 1.0,
              height: 20.0,
              indent: 0,
              endIndent: 0,
            ),
            Image.network(
              vThumbnail!,
              fit: BoxFit.contain,
            ),
          ],
        ),
      ),
    );
  }
}
