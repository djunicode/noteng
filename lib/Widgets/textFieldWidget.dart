import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class textFieldWidget extends StatelessWidget {
  const textFieldWidget(
      {super.key,
      this.controller,
      this.maxLines = 1,
      this.hintText = "Your Name:"});

  final TextEditingController? controller;
  final int? maxLines;
  final String? hintText;
  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      maxLines: maxLines,
      style: const TextStyle(
        color: Colors.black,
      ),
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(14.0),
        filled: true,
        fillColor: secondaryAccentColor,
        focusedBorder: getInputBorder,
        enabledBorder: getInputBorder,
        border: getInputBorder,
        hintText: hintText,
        hintStyle: const TextStyle(
          color: Colors.black,
          fontSize: 14.0,
        ),
      ),
    );
  }

  OutlineInputBorder get getInputBorder {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(16.0),
      borderSide: BorderSide.none,
    );
  }
}
