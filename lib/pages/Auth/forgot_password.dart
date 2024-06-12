import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/pages/Auth/reset_password.dart';

class OTPScreen extends StatefulWidget {
  @override
  _OTPScreenState createState() => _OTPScreenState();
}

class _OTPScreenState extends State<OTPScreen> {
  final _formKey = GlobalKey<FormState>();

  String _email = '';

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
              const SizedBox(
                height: 10,
              ),
              const Text(
                'Enter your email',
                style: TextStyle(fontSize: 18.0),
              ),
              TextFormField(
                decoration: InputDecoration(
                  hintText: 'Enter registered Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                onChanged: (value) {
                  _email = value;
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please enter your registered email';
                  }
                  return null;
                },
              ),
              const Spacer(),
              SizedBox(
                height: 250,
                child: SvgPicture.asset(
                  'assets/svg/forgot_password.svg',
                ),
              ),
              const Spacer(),
              ElevatedButton(
                onPressed: () async {
                  if (_formKey.currentState!.validate()) {
                    // Perform OTP send logic here

                    if (await UserRepo.forgotPassword(_email)) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('OTP sent successfully'),
                        ),
                      );

                      Get.to(OTPScreen2(_email));
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Failed to send OTP'),
                        ),
                      );
                    }
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: primaryColor,
                  foregroundColor: backgroundColor,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(
                        8.0), // Set the button corner radius
                  ),
                ),
                child: const Text(
                  'Send OTP',
                  style: TextStyle(
                    fontSize: 18.0, // Set the text size
                  ),
                ),
              ),
              const Spacer(
                flex: 4,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
