import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_otp_text_field/flutter_otp_text_field.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/pages/Auth/login_screen.dart';

class OTPScreen2 extends StatefulWidget {
  final String _email;
  OTPScreen2(this._email);

  @override
  _OTPScreenState createState() => _OTPScreenState();
}

class _OTPScreenState extends State<OTPScreen2> {
  final _formKey = GlobalKey<FormState>();

  String _newpassword = '';
  String _OTP = '';

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
                'Choose your password',
                style: TextStyle(fontSize: 18.0),
              ),
              TextFormField(
                obscureText: true,
                decoration: InputDecoration(
                  hintText: 'Choose new password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                onChanged: (value) {
                  _newpassword = value;
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Please a enter valid password';
                  }
                  return null;
                },
              ),
              const SizedBox(
                height: 20,
              ),
              const Text(
                'Enter OTP received',
                style: TextStyle(fontSize: 18.0),
              ),
              OtpTextField(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                numberOfFields: 6,
                borderColor: primaryColor,
                focusedBorderColor: primaryColor,
                margin: const EdgeInsets.all(8),
                showFieldAsBox: true,
                onCodeChanged: (String value) {
                  _OTP = value;
                },
                onSubmit: (String value) {
                  _OTP = value;
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

                    if (await UserRepo.verifyOTP(
                      _OTP,
                      widget._email,
                      _newpassword,
                    )) {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Password set successfully'),
                        ),
                      );
                      Get.offAll(LoginScreen());
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Failed to set password'),
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
                  'Set Password',
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
