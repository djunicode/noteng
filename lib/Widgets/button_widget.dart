import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class ButtonWidget extends StatelessWidget {
  final String name;
  final VoidCallback onPressed;
  final double? height;
  final double? width;

   ButtonWidget({
    Key? key,
    required this.name,
    required this.onPressed, 
    this.width,
    this.height,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final double screenWidth = MediaQuery.of(context).size.width;
    final double finalWidth = width ?? screenWidth;
    final double finalHeight = height ?? 50;

    return TextButton(
      onPressed: onPressed, 
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
