import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class UploadWidget extends StatelessWidget {
  const UploadWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          height: 150,
          width: 300,
          
          decoration: BoxDecoration(
            color: secondaryAccentColor,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(color: Colors.black,
            )
          ),
      
      ),
      ]
    );
  }
}