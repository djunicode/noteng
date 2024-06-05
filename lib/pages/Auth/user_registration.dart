import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/pages/Home/home_screen.dart';
import 'package:get/get.dart';

class UserRegistration extends StatefulWidget {
  const UserRegistration({super.key});

  @override
  State<UserRegistration> createState() => _UserRegistrationState();
}

class _UserRegistrationState extends State<UserRegistration> {
  final TextEditingController sapIdController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController firstNameController = TextEditingController();
  final TextEditingController lastNameController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController contactNumberController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Container(
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                SizedBox(
                  child: SvgPicture.asset('assets/svg/login_woman.svg'),
                ),
                SizedBox(
                  height: 18.0,
                ),
                Text(
                  "Register Now!",
                  style: TextStyle(
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontFamily: 'Poppins',
                  ),
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "SAP ID:",
                  readOnly: false,
                  numberOnly: true,
                  controller: sapIdController,
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "Password:",
                  readOnly: false,
                  controller: passwordController,
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "First Name:",
                  readOnly: false,
                  controller: firstNameController,
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "Last Name:",
                  readOnly: false,
                  controller: lastNameController,
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "Email:",
                  controller: emailController,
                  readOnly: false,
                ),
                SizedBox(
                  height: 10.0,
                ),
                textFieldWidget(
                  hintText: "Conatct Number:",
                  readOnly: false,
                  numberOnly: true,
                  controller: contactNumberController,
                ),
                SizedBox(
                  height: 16.0,
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: primaryColor,
                    padding: const EdgeInsets.symmetric(
                        vertical: 16.0, horizontal: 32.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    textStyle: const TextStyle(
                      fontSize: 18,
                    ),
                  ),
                  onPressed: () {
                    //check registration field values here and post details on api function
                    Get.offAll(HomeScreen(), transition: Transition.fadeIn);
                  },
                  child: const Text(
                    'Register',
                    style: TextStyle(color: secondaryAccentColor),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
