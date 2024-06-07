import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/pages/Auth/intro_screen.dart';
import 'package:noteng/pages/Home/home_screen.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'constants/colors.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'NOTENG',
      // theme: ThemeData(
      //   fontFamily: 'Poppins',
      //   colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
      //   useMaterial3: true,
      // ),
      home: SplashScreen(),
      // home: Trial(),
      theme: ThemeData(
        fontFamily: 'Poppins',
        colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
        useMaterial3: true,
      ),
      debugShowCheckedModeBanner: false,
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  _MainState createState() => _MainState();
}

class _MainState extends State<SplashScreen> {
  var timer;
  @override
  void initState() {
    // TODO: implement initState
    checkLogin();
    super.initState();
  }

  checkLogin() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var access_token_exists = await prefs.containsKey("access");

    timer = Timer(const Duration(seconds: 3), () {
      if (access_token_exists) {
        UserRepo.refreshToken();
        Get.offAll(() => HomeScreen());
      } else {
        Get.offAll(() => NotengScreen());
      }
    });
  }

  @override
  void dispose() {
    // TODO: implement dispose
    timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      backgroundColor: primaryColor,
      body: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(),
          Center(
            child: Text('NOTENG',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 30,
                    fontWeight: FontWeight.bold)),
          ),
          Center(
            child: Text(
                '© 2024 DJ UNICODE\nDwarkadas J. Sanghvi College of Engineering\n',
                textAlign: TextAlign.center,
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 12,
                    fontWeight: FontWeight.w600)),
          ),
        ],
      ),
    );
  }
}
