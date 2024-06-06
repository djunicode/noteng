import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/pages/Home/home_screen.dart';
import 'package:get/get.dart';

class UserRegistration extends StatefulWidget {
  const UserRegistration({super.key});

  @override
  State<UserRegistration> createState() => _UserRegistrationState();
}

class _UserRegistrationState extends State<UserRegistration> {
  final _formKey = GlobalKey<FormState>();

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
            child: Form(
              key: _formKey,
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
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter SAP ID';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  textFieldWidget(
                    hintText: "Password:",
                    readOnly: false,
                    controller: passwordController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter password';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  textFieldWidget(
                    hintText: "First Name:",
                    readOnly: false,
                    controller: firstNameController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter first name';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  textFieldWidget(
                    hintText: "Last Name:",
                    readOnly: false,
                    controller: lastNameController,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter last name';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  textFieldWidget(
                    hintText: "Email:",
                    controller: emailController,
                    readOnly: false,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter email';
                      }
                      if (!RegExp(r'^[^@]+@[^@]+\.[^@]+').hasMatch(value)) {
                        return 'Please enter a valid email address';
                      }
                      return null;
                    },
                  ),
                  SizedBox(
                    height: 10.0,
                  ),
                  textFieldWidget(
                    hintText: "Conatct Number:",
                    readOnly: false,
                    numberOnly: true,
                    controller: contactNumberController,
                     validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter contact number';
                      }
                      return null;
                    },
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
                    onPressed: () async {
                      if (_formKey.currentState!.validate()) {
                        User user = User(
                          sapid: sapIdController.text,
                          password: passwordController.text,
                          fname: firstNameController.text,
                          lname: lastNameController.text,
                          email: emailController.text,
                          contactNumber: contactNumberController.text,
                        );

                        bool registrationSuccess = await UserRepo.registerUser(user);

                        if (registrationSuccess) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Registration successful')),
                          );
                         Future.delayed(Duration(seconds: 2), () {
                            Get.offAll(HomeScreen(), transition: Transition.fadeIn);
                          });
                        } else {
                          // Handle registration failure (e.g., show an error message)
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(content: Text('Registration failed')),
                          );
                        }
                      }
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
      ),
    );
  }
}
