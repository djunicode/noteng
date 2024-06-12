import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/chip_selection_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:noteng/data/Job/jobRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';

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

  Future<void> _addJob() async {
    if (_companyName.text.isEmpty ||
        _jobTitle.text.isEmpty ||
        _selectedJobType.isEmpty ||
        _selectedWorkType.isEmpty ||
        _location.text.isEmpty ||
        _contact.text.isEmpty ||
        _requirements.text.isEmpty ||
        _tenure.text.isEmpty ||
        _description.text.isEmpty) {
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

    Job job = Job(
        company: _companyName.text,
        contactNo: _contact.text,
        description: _description.text,
        durationInMonths: int.parse(_tenure.text),
        jobTitle: _jobTitle.text,
        location: _location.text,
        mode: _selectedWorkType,
        requirements: _requirements.text,
        subtype: _selectedJobType,
        user: sapid);

    try {
      Job addNewJob = await JobRepo.createJob(job);

      if (addNewJob.jobId != null) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text('Job created successfully: ${addNewJob.jobTitle}')),
        );
        Get.back();
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Job creation failed')),
        );
      }
      // Handle success
    } catch (e) {
      // Handle error
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Upload failed: $e')),
      );
      print("Upload failed: $e");
    }
  }

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
                    Padding(
                      padding: const EdgeInsets.all(5),
                      child: DropdownButtonFormField<String>(
                        hint: const Text('Select'),
                        value: _jobTitle.text,
                        onChanged: (value) {
                          setState(
                            () {
                              _jobTitle.text = value!;
                            },
                          );
                        },
                        items: const [
                          DropdownMenuItem(
                            value: '',
                            child: Text('Select'),
                          ),
                          DropdownMenuItem(
                            value: 'Software Engineer',
                            child: Text('Software Engineer'),
                          ),
                          DropdownMenuItem(
                            value: 'Data Analyst',
                            child: Text('Data Analyst'),
                          ),
                          DropdownMenuItem(
                            value: 'Web Developer',
                            child: Text('Web Developer'),
                          ),
                          DropdownMenuItem(
                            value: 'UI/UX Designer',
                            child: Text('UI/UX Designer'),
                          ),
                          DropdownMenuItem(
                            value: 'Project Manager',
                            child: Text('Project Manager'),
                          ),
                          DropdownMenuItem(
                            value: 'Business Analyst',
                            child: Text('Business Analyst'),
                          ),
                          DropdownMenuItem(
                            value: 'Bakend Developer',
                            child: Text('Bakend Developer'),
                          ),
                          DropdownMenuItem(
                            value: 'Frontend Developer',
                            child: Text('Frontend Developer'),
                          ),
                          DropdownMenuItem(
                            value: 'Fullstack Developer',
                            child: Text('Fullstack Developer'),
                          ),
                          DropdownMenuItem(
                            value: 'Machine Learning Engineer',
                            child: Text('Machine Learning Engineer'),
                          ),
                        ],
                      ),
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
                      numberOnly: true,
                      hintText: "Enter Company Phone",
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
                      options: ["internship", "Job"],
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
                      numberOnly: true,
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
                      options: const ["Offline", "Online", "Hybrid", "Remote"],
                      onTypeSelected: (selectedType) {
                        setState(() {
                          _selectedWorkType = selectedType;
                        });
                      },
                    ),
                  ],
                ),
              ),

              // Padding(
              //   padding: const EdgeInsets.only(bottom: 10),
              //   child: Column(
              //     crossAxisAlignment: CrossAxisAlignment.start,
              //     children: [
              //       const Text(
              //         "Work Mode",
              //         style: TextStyle(fontWeight: FontWeight.w600),
              //       ),
              //       const SizedBox(height: 5),
              //       ChipSelectionWidget(
              //         onTypeSelected: (selectedMode) {
              //           setState(() {
              //             _selectedWorkMode = selectedMode;
              //           });
              //         },
              //         options: const ["Online", "Offline"],
              //       ),
              //     ],
              //   ),
              // ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(
        name: "Add New Job Opportunity",
        onPressed: _addJob,
      ),
    );
  }
}
