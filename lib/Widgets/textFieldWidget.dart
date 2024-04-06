import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class textFieldWidget extends StatelessWidget {
  const textFieldWidget(
      {super.key,
      this.controller,
      this.maxLines = 1,
      this.hintText = "Your Name:",
      this.readOnly,
      this.suffixIcon,
      this.icon});
//maxLines,controller,readOnly and hintText dono jab bhi widget call karo tabh pass krna by default maxLines 1 rakha h
//hintText upar "Your Name:" hatake jo bhi ho woh pass krna nd remove that

//jab description text field use kr rhe ho tab description pass in hint text and do pass readOnly as true.
//for icon,suffixIcon jab text field pe piche icon dalna h tabh suffixIcon ko true krna
//and then icon mai widget pass krdena tumlogo ke icon
//ka or text ka jo bhi ho...

  final TextEditingController? controller;
  final int? maxLines;
  final String? hintText;
  final bool? readOnly;
  final bool? suffixIcon;
  final Widget? icon;
  @override
  Widget build(BuildContext context) {
    return TextField(
      readOnly: readOnly ?? false,
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
          fontWeight: FontWeight.w300,
        ),
        suffixIcon: suffixIcon == true ? icon : null,
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
