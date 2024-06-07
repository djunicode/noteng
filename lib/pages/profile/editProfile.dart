import 'package:flutter/material.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EditProfile extends StatefulWidget {
  const EditProfile({super.key});

  @override
  State<EditProfile> createState() => _EditProfileState();
}

class _EditProfileState extends State<EditProfile> {
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
    setState(() {});
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
              ),
              SizedBox(height: 30,),
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
                    onPressed: (){
                      
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
