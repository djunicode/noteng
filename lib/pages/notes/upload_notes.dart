import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';

import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/Notes/notesRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';

class UploadNotes extends StatefulWidget {
  const UploadNotes({super.key});

  @override
  State<UploadNotes> createState() => _UploadNotesState();
}

class _UploadNotesState extends State<UploadNotes> {
  FilePickerResult? result;
  String _selectedItem = '';
  TextEditingController notesTitle = TextEditingController();
  TextEditingController notesSubject = TextEditingController();
  TextEditingController notesDescription = TextEditingController();

  Future<void> _uploadNotes() async {
    if (notesTitle.text.isEmpty ||
        notesSubject.text.isEmpty ||
        _selectedItem.isEmpty ||
        notesDescription.text.isEmpty ||
        result == null ||
        result!.files.isEmpty) {
      // Handle validation error
      print("Please fill all fields and select at least one file");
      return;
    }

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? sapid = prefs.getString('sapid');
    if (sapid == null) {
      print("User not found in SharedPreferences");
      return;
    }

    File file = File(result!.files.first.path!);

    Notes note = Notes(
      noteTitle: notesTitle.text,
      noteDescription: notesDescription.text,
      subject: notesSubject.text,
      department: _selectedItem,
      user: sapid,
      document: file.path.split('/').last,
    );

    try {
      Notes createdNote = await NotesRepo.createNote(note, file);
      // Handle success
      if (createdNote.noteId != null) {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("Notes added successfully!")));
        print("Upload successful: ${createdNote.noteTitle}");
        Get.back();
      } else {
        ScaffoldMessenger.of(context)
            .showSnackBar(SnackBar(content: Text("Failed to upload Note!")));
        print("Failed to create note.");
      }
    } catch (e) {
      // Handle error
      print("Upload failed: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(
        title: "Upload Notes",
      ),
      backgroundColor: backgroundColor,
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Notes Title",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Notes Title",
                maxLines: 1,
                controller: notesTitle,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Subject",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter subject",
                maxLines: 1,
                controller: notesSubject,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Department",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: DropdownButtonFormField<String>(
                  hint: const Text('Select'),
                  value: _selectedItem.isNotEmpty ? _selectedItem : null,
                  onChanged: (newValue) {
                    setState(() {
                      _selectedItem = newValue!;
                    });
                    print('Selected item: $newValue');
                  },
                  items: const [
                    DropdownMenuItem(
                      value: '',
                      child: Text('Select'),
                    ),
                    DropdownMenuItem(
                      value: 'CS',
                      child: Text('CS'),
                    ),
                    DropdownMenuItem(
                      value: 'IT',
                      child: Text('IT'),
                    ),
                    DropdownMenuItem(
                      value: 'DS',
                      child: Text('DS'),
                    ),
                    DropdownMenuItem(
                      value: 'AIDS',
                      child: Text('AIDS'),
                    ),
                    DropdownMenuItem(
                      value: 'AIML',
                      child: Text('AIML'),
                    ),
                    DropdownMenuItem(
                      value: 'IOT',
                      child: Text('IOT'),
                    ),
                    DropdownMenuItem(
                      value: 'EXTC',
                      child: Text('EXTC'),
                    ),
                    DropdownMenuItem(
                      value: 'MECH',
                      child: Text('MECH'),
                    ),
                  ],
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Notes Description",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Description",
                maxLines: 5,
                controller: notesDescription,
              ),
              SizedBox(
                height: 10,
              ),
              Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Upload File",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              Container(
                height: 200,
                width: 400,
                decoration: BoxDecoration(
                  color: backgroundColor,
                  border: Border.all(
                    width: 2.0,
                    color: Colors.black,
                    style: BorderStyle.solid, // Removes the solid border
                  ),
                  borderRadius: BorderRadius.circular(15),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.upload_sharp),
                    ElevatedButton(
                      onPressed: () async {
                        try {
                          result = await FilePicker.platform
                              .pickFiles(allowMultiple: true);
                          setState(() {});
                        } catch (e) {
                          // Handle the error
                          print("File pick error: $e");
                        } finally {
                          // Ensure any resources are cleaned up here, if needed
                        }
                      },
                      child: Text(
                        "Upload",
                        style: TextStyle(color: backgroundColor),
                      ),
                      style: ButtonStyle(
                          backgroundColor:
                              MaterialStatePropertyAll(primaryColor)),
                    ),
                    if (result != null)
                      ...result!.files.map((file) => Text(file.name)).toList(),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(
        name: "Upload Notes",
        onPressed: _uploadNotes,
      ),
    );
  }
}
