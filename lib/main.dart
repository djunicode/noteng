import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/screens/intro_screen.dart';
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
      home: const NotengApp(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class NotengApp extends StatelessWidget {
  const NotengApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: primaryColor,
      body: Center(
        child: GestureDetector(
          child:const Text(
            'NOTENG',
            style: TextStyle(
              color: Colors.white,
              fontSize: 30,
              fontWeight: FontWeight.bold,
            ),
          ),
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => NotengScreen()),
            );
          },
        ),
      ),
    );
  }
}