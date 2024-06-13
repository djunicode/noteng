import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/loading.dart';
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
    if (_videoTopic.text.isEmpty ||
        _videoLink.text.isEmpty ||
        _videoSubject.text.isEmpty ||
        _videoSemester.text.isEmpty) {
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
    Video video = Video(
        links: _videoLink.text,
        sem: int.parse(_videoSemester.text),
        subject: _videoSubject.text,
        topics: _videoTopic.text,
        user: sapid);

    Video createdVideo = await VideoRepo.createVideo(video);
    if (createdVideo != null && createdVideo.links != null) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Video successfully uploaded')),
      );
      Get.back();
      Get.back();
      print("Video successfully uploaded");
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Failed to upload video')),
      );
      print("Failed to upload video");
      Get.back();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
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
                    numberOnly: true,
                    hintText: "Enter which semester",
                    controller: _videoSemester,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: ButtonWidget(
          name: "Share",
          onPressed: () {
            _uploadVideo();
          }),
    );
  }
}
