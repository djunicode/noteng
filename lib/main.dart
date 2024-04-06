import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/notesListWidget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'constants/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'NOTENG',
      theme: ThemeData(
        fontFamily: 'Poppins',
        colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
        useMaterial3: true,
      ),
      home: trial(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class trial extends StatefulWidget {
  const trial({super.key});

  @override
  State<trial> createState() => _trialState();
}

class _trialState extends State<trial> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SizedBox(
            height: 150.0,
          ),
          textFieldWidget(
            readOnly: true,
          ),
          SizedBox(
            height: 15.0,
          ),
          textFieldWidget(
            readOnly: false,
          ),
          SizedBox(
            height: 15.0,
          ),
          textFieldWidget(
            maxLines: 8,
          ),
        ],
      ),
    );
  }
}
