import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/models/postListModel.dart';

class PostListWidget extends StatelessWidget {
  const PostListWidget({
    Key? key,
    this.pLM,
    required this.height,
    required this.width,
    this.onPressed,
  }) : super(key: key);

  final PostListModel? pLM;
  final double? width;
  final double? height;
  final VoidCallback? onPressed;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Container(
        padding: EdgeInsets.symmetric(
          vertical: 16.0,
          horizontal: 16.0,
        ),
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
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: Text(
                    pLM!.pTitle!,
                    style: TextStyle(
                      color: Colors.black,
                      fontSize: 19.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Spacer(),
                Text(
                  pLM!.pDate!,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 14.0,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                SizedBox(width: 16.0),
              ],
            ),
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                Flexible(
                  child: Text(
                    pLM!.pDesc!,
                    style: TextStyle(
                      color: secondaryColor,
                      fontSize: 16.0,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
                SizedBox(
                  width: 24.0,
                ),
                if (pLM!.pImg != null)
                  Flexible(
                    child: Image.network(
                      pLM!.pImg!,
                    ),
                  ),
                SizedBox(
                  width: 16.0,
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
            Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                IconButton(
                  onPressed: onPressed,
                  icon: Icon(
                    Icons.favorite,
                    color: primaryColor,
                  ),
                ),
                SizedBox(width: 8.0),
                Text(
                  "${pLM!.pLikes!} Likes",
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 12.0,
                    fontWeight: FontWeight.w500,
                  ),
                ),
                Spacer(),
                Text(
                  pLM!.pCategory!,
                  style: TextStyle(
                    color: secondaryColor,
                    fontSize: 16.0,
                    fontWeight: FontWeight.w600,
                  ),
                ),
                SizedBox(width: 16.0),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
