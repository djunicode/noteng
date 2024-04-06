import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';

class AddNewJob extends StatelessWidget {
  AddNewJob({Key? key});

  final TextEditingController _companyName = TextEditingController();
  final TextEditingController _location = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _contact = TextEditingController();
  final TextEditingController _tenure = TextEditingController();
  final TextEditingController _requirements = TextEditingController();
  final TextEditingController _workType = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarWidget(title: "Post Job Opportunity"),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Company Name
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Company Name"),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Company Name",
                      controller: _companyName,
                    ),
                  ],
                ),
              ),
              // Company Location
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Company Location"),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Company Location",
                      controller: _location,
                    ),
                  ],
                ),
              ),
              // Company Contact
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Company Contact"),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Company Phone/Email/url",
                      controller: _contact,
                    ),
                  ],
                ),
              ),
              // Job Description
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Job Description"),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Job Description",
                      controller: _description,
                      maxLines: 4,
                      readOnly: true,
                    ),
                  ],
                ),
              ),
              // Job Tenure
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Text("Job Tenure"),
                        SizedBox(
                            width:
                                5), // Add some space between the text and the "Months" text
                        Text(
                          "Months", // "Months" text remains there permanently
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Job Tenure",
                      controller: _tenure,
                    ),
                  ],
                ),
              ),
              // Job Requirements
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text("Job Requirements"),
                    SizedBox(
                        height:
                            5), // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Job Requirements",
                      maxLines: 4,
                      readOnly: true,
                      controller: _requirements,
                    ),
                  ],
                ),
              ),
              // Work Type
              Padding(
                padding: EdgeInsets.only(bottom: 10),
                child: Text("Work Type"),
              ),
              ButtonWidget(
                name: "Add New Job Opportunity",
                onPressed: () {}, // Empty function, no action will be performed
              )
            ],
          ),
        ),
      ),
    );
  }
}
