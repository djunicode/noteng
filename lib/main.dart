import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
<<<<<<< HEAD
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/notesListWidget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
=======
import 'package:noteng/pages/add_new_post.dart';

>>>>>>> 40766f0d8df78b9f06471bf77bc969f14dc0806f
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
<<<<<<< HEAD
=======
      // theme: ThemeData(
      //   fontFamily: 'Poppins',
      //   colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
      //   useMaterial3: true,
      // ),
      // home: Trial(),
>>>>>>> 40766f0d8df78b9f06471bf77bc969f14dc0806f
      theme: ThemeData(
        fontFamily: 'Poppins',
        colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
        useMaterial3: true,
      ),
<<<<<<< HEAD
      home: trial(),
=======
      home: AddNewPostPage(),
>>>>>>> 40766f0d8df78b9f06471bf77bc969f14dc0806f
      debugShowCheckedModeBanner: false,
    );
  }
}
<<<<<<< HEAD

class trial extends StatefulWidget {
  const trial({super.key});

  @override
  State<trial> createState() => _trialState();
}

class _trialState extends State<trial> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      appBar: AppBarWidget(title: "Dummy Title"),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: [
              SizedBox(
                height: 150.0,
              ),
              SizedBox(
                height: 15,
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
        ),
      ),
    );
  }
}
=======
>>>>>>> 40766f0d8df78b9f06471bf77bc969f14dc0806f
