import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/data/Video/videoModel.dart';
import 'package:noteng/data/Video/videoRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ShareVideo extends StatefulWidget {
  const ShareVideo({super.key});

  @override
  State<ShareVideo> createState() => _ShareVideoState();
}

class _ShareVideoState extends State<ShareVideo> {
  TextEditingController _videoTopic = TextEditingController();

  TextEditingController _videoLink = TextEditingController();

  TextEditingController _videoSubject = TextEditingController();

  TextEditingController _videoSemester = TextEditingController();

  Future<void> _uploadVideo() async {
    if (_videoTopic.text.isEmpty || _videoLink.text.isEmpty) {
      print("Please fill all fields and select at least one file");
      return;
    }

    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? sapid = prefs.getString('sapid');
    if (sapid == null) {
      print("User not found in SharedPreferences");
      return;
    }

    Video video = Video(
      links: _videoLink.text,
      sem: int.parse(_videoSemester.text),
      subject: _videoSubject.text,
      topics: _videoTopic.text,
    );

    Video createdVideo = await VideoRepo.createVideo(video);
    if (createdVideo != null && createdVideo.links != null) {
      print("Video successfully uploaded");
    } else {
      print("Failed to upload video");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(title: "Share Video Resource"),
      body: Padding(
        padding: EdgeInsets.all(15),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Video Topic",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 5),
                  textFieldWidget(
                      hintText: "Enter Video Topic", controller: _videoTopic),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(bottom: 10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Video Link",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 5),
                  textFieldWidget(
                    hintText: "Enter Video Link",
                    controller: _videoLink,
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
                    "Subject",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 5),
                  textFieldWidget(
                    hintText: "Enter Subject",
                    controller: _videoSubject,
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
                    "Semester",
                    style: TextStyle(fontWeight: FontWeight.w600),
                  ),
                  SizedBox(height: 5),
                  textFieldWidget(
                    hintText: "Enter which semester",
                    controller: _videoSemester,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: ButtonWidget(name: "Share", onPressed: () {}),
    );
  }
}
