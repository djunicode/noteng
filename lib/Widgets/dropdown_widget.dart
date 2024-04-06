import 'package:flutter/material.dart';

class DropDownWidget extends StatelessWidget {
  const DropDownWidget({super.key, this.hintText = "Your name:"});
  final String? hintText;
  final String selectedvalue = "Hackathon";
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: DropdownButton(
          onChanged: (String? newvalue) {},
          hint: Text(hintText!),
          
          items: <String>[
            "Hackathon",
            "Achievements",
            "Annoucements",
            "Porject",
            "Research Paper"
            
          ].map<DropdownMenuItem<String>>((String value) {
            return DropdownMenuItem<String>(
                value: value, child: Text(value));
          }).toList(),
        ),
      ),
    );
  }
}
