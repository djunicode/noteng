import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/chip_selection_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';

class AddNewJob extends StatefulWidget {
  AddNewJob({Key? key});

  @override
  _AddNewJobState createState() => _AddNewJobState();
}

class _AddNewJobState extends State<AddNewJob> {
  final TextEditingController _companyName = TextEditingController();
  final TextEditingController _location = TextEditingController();
  final TextEditingController _description = TextEditingController();
  final TextEditingController _contact = TextEditingController();
  final TextEditingController _tenure = TextEditingController();
  final TextEditingController _requirements = TextEditingController();
  final TextEditingController _jobTitle = TextEditingController();

  String _selectedJobType = '';
  String _selectedWorkType = '';
  String _selectedWorkMode = '';

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
                    const Text(
                      "Company Name",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    SizedBox(height: 5),
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
                    const Text(
                      "Company Location",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    textFieldWidget(
                      hintText: "Enter Company Location",
                      controller: _location,
                    ),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Job Title",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    textFieldWidget(
                      hintText: "Enter Job Title",
                      controller: _jobTitle,
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
                    Text(
                      "Company Contact",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    SizedBox(height: 5),
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
                    const Text(
                      "Job Description",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    textFieldWidget(
                      hintText: "Enter Job Description",
                      controller: _description,
                      maxLines: 4,
                      readOnly: true,
                    ),
                  ],
                ),
              ),
              // Job Type
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Job Type",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    ChipSelectionWidget(
                      options: ["Internship", "Full Time Job"],
                      onTypeSelected: (selectedType) {
                        setState(() {
                          _selectedJobType = selectedType;
                        });
                      },
                    ),
                  ],
                ),
              ),
              // Job Tenure
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Row(
                      children: [
                        Text(
                          "Job Tenure",
                          style: TextStyle(fontWeight: FontWeight.w600),
                        ),
                        SizedBox(width: 5),
                        Text(
                          "Months",
                          style: TextStyle(color: Colors.grey),
                        ),
                      ],
                    ),
                    SizedBox(
                      height: 5,
                    ),
                    // Add some space between the text and the text field
                    textFieldWidget(
                      hintText: "Enter Job Tenure",
                      controller: _tenure,
                    ),
                  ],
                ),
              ),

              // Job Requirements
              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Job Requirements",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
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
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Work Type",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    ChipSelectionWidget(
                      options: const ["Full Time", "Part Time"],
                      onTypeSelected: (selectedType) {
                        setState(() {
                          _selectedWorkType = selectedType;
                        });
                      },
                    ),
                  ],
                ),
              ),

              Padding(
                padding: const EdgeInsets.only(bottom: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Work Mode",
                      style: TextStyle(fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(height: 5),
                    ChipSelectionWidget(
                      onTypeSelected: (selectedMode) {
                        setState(() {
                          _selectedWorkMode = selectedMode;
                        });
                      },
                      options: const ["Online", "Offline"],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(
        name: "Add New Job Opportunity",
        onPressed: () {},
      ),
    );
  }
}
