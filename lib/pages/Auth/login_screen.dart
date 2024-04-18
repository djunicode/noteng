import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/constants/colors.dart';
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(
                flex: 5,
              ),
              SvgPicture.asset('assets/svg/login_woman.svg'),
              const Spacer(),
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
              const Spacer(),
              const Text(
                'Enter your SAP ID',
                style: TextStyle(fontSize: 18.0),
              ),
              TextFormField(
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
                    return 'Please enter your SAP ID lol';
                  }
                  return null;
                },
              ),
              const Spacer(),
              const Text(
                'Enter your password',
                style: TextStyle(fontSize: 18.0),
              ),
              TextFormField(
                decoration: InputDecoration(
                  hintText: 'Enter password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                obscureText: true,
                onChanged: (value) {
                  _password = value;
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your password';
                  }
                  return null;
                },
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    // Perform login logic here
                    print('SAP ID: $_sapId');
                    print('Password: $_password');
                    Get.offAll(HomeScreen(), transition: Transition.fadeIn);
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
              const Spacer(),
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
              const Spacer(
                flex: 7,
              )
            ],
          ),
        ),
      ),
    );
  }
}
