import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/pages/Auth/user_registration.dart';

class SignupApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Signup',
      home: SignupScreen(),
    );
  }
}

class SignupScreen extends StatefulWidget {
  @override
  _SignupScreenState createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _formKey = GlobalKey<FormState>();
  String _userType = '';
  String _department = '';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: const Text('Signup'),
      // ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              const Spacer(
                flex: 2,
              ),
              SizedBox(
                child: SvgPicture.asset('assets/svg/login_woman.svg'),
              ),
              const Text(
                textAlign: TextAlign.center,
                'Signup',
                style: TextStyle(
                  fontSize: 35.0,
                  fontWeight: FontWeight.bold,
                  color: Color.fromARGB(255, 0, 0, 0),
                  fontFamily: 'Poppins',
                ),
              ),
              const Text(
                'Are You a?',
                style: TextStyle(fontSize: 18.0),
              ),
              const SizedBox(height: 8.0),
              DropdownButtonFormField<String>(
                hint: const Text('Select'),
                value: _userType.isNotEmpty ? _userType : null,
                onChanged: (value) {
                  setState(
                    () {
                      _userType = value!;
                    },
                  );
                },
                items: const [
                  DropdownMenuItem(
                    value: '',
                    child: Text('Select'),
                  ),
                  DropdownMenuItem(
                    value: 'Teacher',
                    child: Text('Teacher'),
                  ),
                  DropdownMenuItem(
                    value: 'Student',
                    child: Text('Student'),
                  ),
                ],
              ),
              const Spacer(),
              const Text(
                'Department',
                style: TextStyle(fontSize: 18.0),
              ),
              const SizedBox(height: 8.0),
              DropdownButtonFormField<String>(
                hint: const Text('Select'),
                value: _department.isNotEmpty ? _department : null,
                onChanged: (value) {
                  setState(
                    () {
                      _department = value!;
                    },
                  );
                },
                items: const [
                  DropdownMenuItem(
                    value: '',
                    child: Text('Select'),
                  ),
                  DropdownMenuItem(
                    value: 'Computer Engineering',
                    child: Text('Computer Engineering'),
                  ),
                  DropdownMenuItem(
                    value: 'Information Technology',
                    child: Text('Information Technology'),
                  ),
                  DropdownMenuItem(
                    value: 'Artificial Intelligence & ML',
                    child: Text('Artificial Intelligence & ML'),
                  ),
                  DropdownMenuItem(
                    value: 'Artificial Intelligence & DS',
                    child: Text('Artificial Intelligence & DS'),
                  ),
                  DropdownMenuItem(
                    value: 'Data Science',
                    child: Text('Data Science'),
                  ),
                  DropdownMenuItem(
                    value: 'Internet of Things',
                    child: Text('Internet of Things'),
                  ),
                  DropdownMenuItem(
                    value: 'Electronics & Telecommunications',
                    child: Text('Electronics & Telecommunications'),
                  ),
                  DropdownMenuItem(
                    value: 'Mechanical Engineering',
                    child: Text('Mechanical Engineering'),
                  ),
                  DropdownMenuItem(
                    value: 'Others',
                    child: Text('Others'),
                  ),
                ],
              ),
              const Spacer(
                flex: 3,
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
                  if (_formKey.currentState!.validate()) {
                    // Perform signup logic here
                    print('User Type: $_userType');
                    print('Department: $_department');
                    Get.to(
                        UserRegistration(
                          expertise: _userType + "@" + _department,
                        ),
                        transition: Transition.fadeIn);
                  }
                },
                child: const Text(
                  'Continue',
                  style: TextStyle(color: secondaryAccentColor),
                ),
              ),
              const Spacer(
                flex: 10,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
