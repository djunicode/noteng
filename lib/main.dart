import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/pages/add_new_post.dart';

import 'constants/colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'NOTENG',
      // theme: ThemeData(
      //   fontFamily: 'Poppins',
      //   colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
      //   useMaterial3: true,
      // ),
      // home: Trial(),
      theme: ThemeData(
        fontFamily: 'Poppins',
        colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
        useMaterial3: true,
      ),
      home: AddNewPostPage(),
      debugShowCheckedModeBanner: false,
    );
  }
}
