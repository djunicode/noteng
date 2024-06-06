import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class textFieldWidget extends StatelessWidget {
  const textFieldWidget(
      {super.key,
      this.controller,
      this.numberOnly = false,
      this.maxLines = 1,
      this.hintText = "Your Name:",
      this.readOnly = false,
      this.suffixIcon = false,
      this.icon,
      this.validator});

  final TextEditingController? controller;
  final int maxLines;
  final String hintText;
  final bool numberOnly;
  final bool readOnly;
  final bool suffixIcon;
  final Widget? icon;
  final String? Function(String?)? validator;

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      readOnly: readOnly,
      controller: controller,
      maxLines: maxLines,
      keyboardType: numberOnly ? TextInputType.number : TextInputType.text,
      style: const TextStyle(
        color: Colors.black,
      ),
      decoration: InputDecoration(
        floatingLabelBehavior: FloatingLabelBehavior.auto,
        labelText: hintText,
        floatingLabelStyle: TextStyle(color: primaryColor),
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
        suffixIcon: suffixIcon ? icon : null,
      ),
      validator: validator,
    );
  }

  OutlineInputBorder get getInputBorder {
    return OutlineInputBorder(
      borderRadius: BorderRadius.circular(16.0),
      borderSide: BorderSide.none,
    );
  }
}
