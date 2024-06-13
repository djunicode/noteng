import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/loading.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/pages/Auth/forgot_password.dart';
import 'package:noteng/pages/Home/home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  String _sapId = '';
  String _password = '';
  bool isPassVisible = false;
  TextEditingController sapIdController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                const SizedBox(height: 50.0),
                SvgPicture.asset('assets/svg/login_woman.svg'),
                const SizedBox(height: 30.0),
                const Text(
                  textAlign: TextAlign.center,
                  'Login',
                  style: TextStyle(
                    fontSize: 35.0,
                    fontWeight: FontWeight.bold,
                    color: Color.fromARGB(255, 0, 0, 0),
                    fontFamily: 'Poppins',
                  ),
                ),
                const SizedBox(height: 30.0),
                const Text(
                  'Enter your SAP ID',
                  style: TextStyle(fontSize: 18.0),
                ),
                TextFormField(
                  keyboardType: TextInputType.number,
                  decoration: InputDecoration(
                    hintText: 'Enter SAP ID',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                  onChanged: (value) {
                    _sapId = value;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your SAP ID';
                    }
                    return null;
                  },
                  controller: sapIdController,
                ),
                const SizedBox(height: 20.0),
                const Text(
                  'Enter your password',
                  style: TextStyle(fontSize: 18.0),
                ),
                TextFormField(
                  decoration: InputDecoration(
                    suffixIcon: InkWell(
                      onTap: () {
                        setState(() {
                          isPassVisible = !isPassVisible;
                        });
                      },
                      child: Icon(isPassVisible
                          ? Icons.visibility_off
                          : Icons.visibility),
                    ),
                    hintText: 'Enter password',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                  obscureText: !isPassVisible,
                  onChanged: (value) {
                    _password = value;
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Please enter your password';
                    }
                    return null;
                  },
                  controller: passwordController,
                ),
                const SizedBox(height: 20.0),
                ElevatedButton(
                  onPressed: () async {
                    if (_formKey.currentState!.validate()) {
                      User user = User(
                        sapid: sapIdController.text,
                        password: passwordController.text,
                      );

                      LoadingBar.loadingDialog(context);

                      bool registrationSuccess = await UserRepo.loginUser(user);

                      if (registrationSuccess) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Login successful')),
                        );
                        Get.back();
                        Future.delayed(Duration(seconds: 2), () {
                          Get.offAll(HomeScreen(),
                              transition: Transition.fadeIn);
                        });
                      } else {
                        // Handle registration failure
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Login failed')),
                        );
                        Get.back();
                      }
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: primaryColor,
                    foregroundColor: backgroundColor,
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                  ),
                  child: const Text(
                    'Login',
                    style: TextStyle(
                      fontSize: 18.0,
                    ),
                  ),
                ),
                const SizedBox(height: 20.0),
                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => OTPScreen()),
                    );
                  },
                  style: TextButton.styleFrom(
                    foregroundColor: primaryColor,
                  ),
                  child: const Text('Forgot your password?'),
                ),
                const SizedBox(height: 50.0),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
