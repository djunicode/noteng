import 'dart:io';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:noteng/data/Posts/postRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';

class AddNewPostPage extends StatefulWidget {
  const AddNewPostPage({super.key});

  @override
  State<AddNewPostPage> createState() => _AddNewPostPageState();
}

class _AddNewPostPageState extends State<AddNewPostPage> {
  File? _image;
  final picker = ImagePicker();
  TextEditingController postTitle = TextEditingController();
  TextEditingController postDescription = TextEditingController();
  TextEditingController postLink = TextEditingController();
  TextEditingController postOrganization = TextEditingController();
  TextEditingController postDeadline = TextEditingController();
  TextEditingController postCategory = TextEditingController();
  Future getImage() async {
    final pickedImage = await picker.pickImage(source: ImageSource.gallery);
//
    setState(() {
      if (pickedImage != null) {
        _image = File(pickedImage.path);
      } else {
        print("No image is selected");
      }
    });
  }

  Future<void> _createPost() async {
    if (postTitle.text.isEmpty ||
        postDeadline.text.isEmpty ||
        postLink.text.isEmpty ||
        postDescription.text.isEmpty ||
        postOrganization.text.isEmpty ||
        postCategory.text.isEmpty ||
        _image == null) {
      // Handle validation error
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Fields are empty')),
      );
      print("Please fill all fields and select at least one file");
      return;
    }

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? sapid = prefs.getString('sapid');
    if (sapid == null) {
      print("User not found in SharedPreferences");
      return;
    }

    // File file = File(result!.files.first.path!);

    Posts post = Posts(
        deadline: postDeadline.text,
        description: postDescription.text,
        image: _image!.path,
        // organisedBy: postOrganization.text,
        postUrl: postLink.text,
        subtype: postCategory.text,
        title: postTitle.text,
        likes: 0,
        user: sapid);
    try {
      Posts createdPost = await PostsRepo.createPost(post, _image!);
      // Handle success
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
            content: Text('Post created successfully: ${createdPost.title}')),
      );
      print("Post created successfully: ${createdPost.title}");
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
      appBar: AppBarWidget(title: "Create New Post"),
      backgroundColor: backgroundColor,
      // bottomNavigationBar: ButtonWidget(name: "Add New Post", action: "", height: 60,),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Post Title",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Post Title",
                maxLines: 1,
                controller: postTitle,
              ),
              const SizedBox(
                height: 10,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Post Category",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Post Category",
                maxLines: 1,
                controller: postCategory,
              ),
              const SizedBox(
                height: 10,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Post Link",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Post Link",
                maxLines: 1,
                controller: postLink,
              ),
              const SizedBox(
                height: 10,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Organization Name",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter the organization name",
                maxLines: 1,
                controller: postOrganization,
              ),
              const SizedBox(
                height: 10,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Post Deadline",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              InkWell(
                onTap: () async {
                  await showDatePicker(
                    context: context,
                    lastDate: DateTime(2030),
                    firstDate: DateTime(2024),
                    initialDate: DateTime.now(),
                  ).then((pickedDate) {
                    if (pickedDate == null) return;
                    postDeadline.text =
                        DateFormat('yyyy-MM-dd').format(pickedDate);
                  });
                },
                child: TextFormField(
                  enabled: false,
                  readOnly: true,
                  controller: postDeadline,
                  style: const TextStyle(
                    color: Colors.black,
                  ),
                  decoration: InputDecoration(
                    floatingLabelBehavior: FloatingLabelBehavior.never,
                    labelText: "Choose Deadline",
                    floatingLabelStyle: TextStyle(color: primaryColor),
                    contentPadding: EdgeInsets.all(14.0),
                    filled: true,
                    fillColor: secondaryAccentColor,
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16.0),
                      borderSide: BorderSide.none,
                    ),
                    enabledBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16.0),
                      borderSide: BorderSide.none,
                    ),
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(16.0),
                      borderSide: BorderSide.none,
                    ),
                    hintText: "Choose Deadline",
                    hintStyle: const TextStyle(
                      color: Colors.black,
                      fontSize: 14.0,
                      fontWeight: FontWeight.w300,
                    ),
                    suffixIcon: Icon(Icons.calendar_month),
                  ),
                ),
              ),
              const SizedBox(
                height: 10,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Post Description",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700),
                ),
              ),
              textFieldWidget(
                hintText: "Enter Post Description",
                maxLines: 5,
                controller: postDescription,
              ),
              const SizedBox(
                height: 20,
              ),
              const Padding(
                padding: EdgeInsets.all(8.0),
                child: Text(
                  "Upload Image",
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
                      onPressed: () {
                        getImage();
                      },
                      child: Text(
                        "Upload",
                        style: TextStyle(color: backgroundColor),
                      ),
                      style: ButtonStyle(
                          backgroundColor:
                              MaterialStatePropertyAll(primaryColor)),
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(
          name: "Create New Post",
          onPressed: () {
            _createPost();
          }),
    );
  }
}
