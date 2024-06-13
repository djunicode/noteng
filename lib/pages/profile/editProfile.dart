import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/loading.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EditProfile extends StatefulWidget {
  const EditProfile({super.key});

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
  TextEditingController firName = TextEditingController();
  TextEditingController lasName = TextEditingController();
  TextEditingController mailId = TextEditingController();
  TextEditingController phone = TextEditingController();
  var firstName = "";
  var lastName = "";
  var emailId = "";
  var contactNo = "";
  Future fetchUserName() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var fname = await prefs.getString("fname");
    firstName = fname!;
    var lname = await prefs.getString("lname");
    lastName = lname!;
    var email = await prefs.getString("email");
    emailId = email!;
    var contact = await prefs.getString("contactNumber");
    contactNo = contact!;
    setState(() {
      firstName = fname;
      lastName = lname;
      emailId = email;
      contactNo = contact;

      firName.text = fname;
      lasName.text = lname;
      mailId.text = email;
      phone.text = contact;
    });
  }

  Future<void> _EditUser() async {
    if (firName.text.isEmpty ||
        lasName.text.isEmpty ||
        mailId.text.isEmpty ||
        phone.text.isEmpty) {
      // Handle validation error
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Fields are empty')),
      );
      print("Please fill all fields");
      return;
    }

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? sapid = prefs.getString('sapid');
    if (sapid == null) {
      print("User not found in SharedPreferences");
      return;
    }
    LoadingBar.loadingDialog(context);
    User user = User(
      sapid: sapid,
      fname: firName.text,
      lname: lasName.text,
      contactNumber: phone.text,
      email: mailId.text,
    );

    try {
      User editUser = await UserRepo.editUserDetails(user);
      // Handle success
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('User Edited successfully: ${editUser.sapid}')),
      );
      print("User edited successfully: ${editUser.sapid}");
      Get.back();
    } catch (e) {
      // Handle error
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Editing failed: $e')),
      );
      print("editing failed: $e");
    }
    Get.back();
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchUserName();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        centerTitle: true,
        title: const Text(
          "My Profile",
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  "First Name",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
                ),
              ),
              textFieldWidget(
                maxLines: 1,
                hintText: firstName,
                controller: firName,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  "Last Name",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
                ),
              ),
              textFieldWidget(
                maxLines: 1,
                hintText: lastName,
                controller: lasName,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  "Email",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
                ),
              ),
              textFieldWidget(
                maxLines: 1,
                hintText: emailId,
                controller: mailId,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Text(
                  "Contact",
                  style: TextStyle(fontWeight: FontWeight.w600, fontSize: 18),
                ),
              ),
              textFieldWidget(
                maxLines: 1,
                numberOnly: true,
                hintText: contactNo,
                controller: phone,
              ),
              SizedBox(
                height: 30,
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: primaryColor,
                  padding: const EdgeInsets.symmetric(
                      vertical: 16.0, horizontal: 110.0),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  textStyle: const TextStyle(
                    fontSize: 18,
                  ),
                ),
                onPressed: () {
                  _EditUser();
                },
                child: const Text(
                  'Update Changes',
                  style: TextStyle(color: secondaryAccentColor),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
