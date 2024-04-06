import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class ButtonWidget extends StatelessWidget {
  final String name;
  final String action;
  final double? height;
  final double? width;

  const ButtonWidget({
    Key? key,
    required this.name,
    required this.action,
    this.width,
    this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double finalWidth = width ?? screenWidth;

    final double finalHeight = height ?? finalWidth * 0.15;

    return TextButton(
      onPressed: () {},
      style: TextButton.styleFrom(
        backgroundColor: primaryColor,
        fixedSize: Size(finalWidth, finalHeight),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(8),
        ),
      ),
      child: Text(
        name,
        style: const TextStyle(
          color: backgroundColor,
          fontSize: 15,
          fontWeight: FontWeight.w500,
        ),
      ),
    );
  }
}
