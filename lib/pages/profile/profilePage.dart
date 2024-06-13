import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/bottom_nav_bar.dart';
import 'package:noteng/Widgets/discoverNotesListWidget.dart';
import 'package:noteng/Widgets/jobListWidget.dart';
import 'package:noteng/Widgets/loading.dart';
import 'package:noteng/Widgets/modalbottom.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:noteng/data/Job/jobRepo.dart';
import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/Notes/notesRepo.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:noteng/data/Posts/postRepo.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/data/Video/videoModel.dart';
import 'package:noteng/data/Video/videoRepo.dart';
import 'package:noteng/main.dart';
import 'package:noteng/pages/Home/sample_data.dart';
import 'package:noteng/pages/profile/editProfile.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:shimmer/shimmer.dart';

import '../../Widgets/notesListWidget.dart';
import '../../Widgets/postListWidget.dart';
import '../../Widgets/videoListWidget.dart';
import '../Notes/notes_detail.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  var userName = "User Name";
  var email = "";
  var phone = "";
  var sapid = "";
  var expertise = "";
  var role = "Student";
  var job_posted = 0;
  var post_created = 0;
  var notes_shared = 0;
  var videos_shared = 0;
  var is_loaded = false;
  bool isAdmin = false;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchUserData();
  }

  List<Job> jobs = [];
  List<Posts> posts = [];
  List<Notes> notes = [];
  List<Video> videos = [];

  Future signout() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    await prefs.remove('refresh');
    await prefs.remove('access');
    await prefs.remove("sapid");
    await prefs.remove("email");
    await prefs.remove("fname");
    await prefs.remove("lname");
    await prefs.remove("contactNumber");
    await prefs.remove("expertise");

    Get.offAll(const SplashScreen());
  }

  Future fetchData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var sap_sp = await prefs.getString("sapid");

    jobs = await JobRepo.getAllJobs();
    posts = await PostsRepo.getAllPosts();
    notes = await NotesRepo.getAllNotes();
    videos = await VideoRepo.getAllVideos();

    job_posted = jobs.where((job) => job.user == sap_sp!).length;
    post_created = posts.where((post) => post.user == sap_sp!).length;
    notes_shared = notes.where((note) => note.user == sap_sp!).length;
    videos_shared = videos.where((video) => video.user == sap_sp!).length;

    isAdmin = await UserRepo.isAdmin();

    if (isAdmin) {
      setState(() {
        role = "Admin";
      });
    } else {
      jobs = jobs.where((job) => job.user == sap_sp).toList();
      posts = posts.where((post) => post.user == sap_sp).toList();
      notes = notes.where((note) => note.user == sap_sp).toList();
      videos = videos.where((video) => video.user == sap_sp).toList();
    }

    if (mounted) {
      setState(() {
        is_loaded = true;
      });
    }
  }

  Future fetchUserData() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var fname = await prefs.getString("fname");
    var lname = await prefs.getString("lname");
    var sap_sp = await prefs.getString("sapid");
    var email_sp = await prefs.getString("email");
    var contact_sp = await prefs.getString("contactNumber");
    var expertise_sp = await prefs.getString("expertise");
    sapid = sap_sp!;
    email = email_sp!;
    phone = contact_sp!;
    role = expertise_sp!.split("@").first;
    expertise = expertise_sp!.split("@").last;
    userName = "$fname $lname";
    if (mounted) {
      setState(() {});
    }

    fetchData();
  }

  @override
  Widget build(BuildContext context) {
    double h = MediaQuery.of(context).size.height;
    double w = MediaQuery.of(context).size.width;
    return Scaffold(
        backgroundColor: Colors.white,
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            Get.bottomSheet(const Modalbottom(), persistent: false);
          },
          backgroundColor: primaryColor,
          child: const Icon(
            Icons.add,
            color: Colors.white,
          ),
        ),
        floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
        bottomNavigationBar: Bottomnavbar(4),
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
            padding: const EdgeInsets.only(top: 30),
            child: Column(
              children: [
                Center(
                  child: Container(
                    width: w * 0.95,
                    decoration: BoxDecoration(
                        color: primaryColor,
                        borderRadius: BorderRadius.circular(15)),
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(top: 15),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Padding(
                                padding: const EdgeInsets.only(left: 20),
                                child: Text(
                                  "$userName",
                                  style: const TextStyle(
                                      color: backgroundColor,
                                      fontSize: 25,
                                      fontWeight: FontWeight.bold),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.only(
                                  right: 20,
                                ),
                                child: Container(
                                  height: h * 0.04,
                                  width: w * 0.23,
                                  decoration: BoxDecoration(
                                      color: backgroundColor,
                                      borderRadius: BorderRadius.circular(8)),
                                  child: Center(
                                    child: Text(
                                      role,
                                      style: const TextStyle(
                                          color: primaryColor,
                                          fontSize: 16,
                                          fontWeight: FontWeight.w600),
                                    ),
                                  ),
                                ),
                              )
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Icon(
                                Icons.numbers,
                                color: backgroundColor,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                sapid,
                                style: const TextStyle(
                                  color: backgroundColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Icon(
                                Icons.email_outlined,
                                color: backgroundColor,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                email,
                                style: const TextStyle(
                                  color: backgroundColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.only(left: 20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Icon(
                                Icons.phone_outlined,
                                color: backgroundColor,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                phone,
                                style: const TextStyle(
                                    color: backgroundColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.start,
                            children: [
                              const Icon(
                                Icons.school_outlined,
                                color: backgroundColor,
                              ),
                              const SizedBox(
                                width: 10,
                              ),
                              Text(
                                expertise,
                                style: const TextStyle(
                                    color: backgroundColor,
                                    fontWeight: FontWeight.bold,
                                    fontSize: 15),
                              ),
                            ],
                          ),
                        ),
                        SizedBox(height: 10)
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                Center(
                  child: Container(
                    height: h * 0.17,
                    width: w * 0.95,
                    decoration: BoxDecoration(
                      color: secondaryAccentColor,
                      borderRadius: BorderRadius.circular(15),
                    ),
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: is_loaded
                          ? Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Padding(
                                  padding:
                                      const EdgeInsets.only(left: 5, top: 20),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.work_outline,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        job_posted.toString(),
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Jobs Posted",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(top: 20),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.add_photo_alternate_outlined,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        post_created.toString(),
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Posts Created",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                    top: 20,
                                  ),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.upload_file,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        notes_shared.toString(),
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Notes Shared",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.only(top: 20, right: 4),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.videocam_outlined,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        videos_shared.toString(),
                                        style: const TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 25),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Videos Shared",
                                        style: TextStyle(fontSize: 10),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            )
                          : Row(
                              mainAxisAlignment: MainAxisAlignment.spaceAround,
                              children: [
                                Padding(
                                  padding: EdgeInsets.only(left: 5, top: 20),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      Center(
                                        child: Icon(
                                          Icons.work_outline,
                                          size: 30,
                                        ),
                                      ),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Shimmer.fromColors(
                                          baseColor: Colors.black,
                                          highlightColor: secondaryAccentColor,
                                          child: Text("0",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25))),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        "Jobs Posted",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(top: 20),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.add_photo_alternate_outlined,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Shimmer.fromColors(
                                          baseColor: Colors.black,
                                          highlightColor: secondaryAccentColor,
                                          child: Text("0",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25))),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Posts Created",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding: const EdgeInsets.only(
                                    top: 20,
                                  ),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.upload_file,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Shimmer.fromColors(
                                          baseColor: Colors.black,
                                          highlightColor: secondaryAccentColor,
                                          child: Text("0",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25))),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Notes Shared",
                                        style: TextStyle(fontSize: 11),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  width: 5,
                                ),
                                const VerticalDivider(
                                  thickness: 0.5,
                                  color: Colors.black,
                                ),
                                Padding(
                                  padding:
                                      const EdgeInsets.only(top: 20, right: 4),
                                  child: Column(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      const Center(
                                        child: Icon(
                                          Icons.videocam_outlined,
                                          size: 30,
                                        ),
                                      ),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      Shimmer.fromColors(
                                          baseColor: Colors.black,
                                          highlightColor: secondaryAccentColor,
                                          child: Text("0",
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25))),
                                      const SizedBox(
                                        height: 5,
                                      ),
                                      const Text(
                                        "Videos Shared",
                                        style: TextStyle(fontSize: 10),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ),
                    ),
                  ),
                ),

                isAdmin
                    ? const Padding(
                        padding: const EdgeInsets.only(left: 15, right: 15),
                        child: const Divider(
                          color: secondaryColor,
                          thickness: 0.5,
                        ),
                      )
                    : SizedBox(),
                isAdmin
                    ? Center(
                        child: Container(
                          height: h * 0.17,
                          width: w * 0.95,
                          decoration: BoxDecoration(
                            color: secondaryAccentColor,
                            borderRadius: BorderRadius.circular(15),
                          ),
                          child: SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            child: is_loaded
                                ? Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            left: 5, top: 20),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons.work_outline,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Text(
                                              jobs.length.toString(),
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Total\nJobs Posted",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(top: 20),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons
                                                    .add_photo_alternate_outlined,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Text(
                                              posts.length.toString(),
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Total\nPosts Created",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(
                                          top: 20,
                                        ),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons.upload_file,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Text(
                                              notes.length.toString(),
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Total\nNotes Shared",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            top: 20, right: 4),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons.videocam_outlined,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Text(
                                              videos.length.toString(),
                                              style: const TextStyle(
                                                  fontWeight: FontWeight.bold,
                                                  fontSize: 25),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Total\nVideos Shared",
                                              textAlign: TextAlign.center,
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  )
                                : Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceAround,
                                    children: [
                                      Padding(
                                        padding:
                                            EdgeInsets.only(left: 5, top: 20),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            Center(
                                              child: Icon(
                                                Icons.work_outline,
                                                size: 30,
                                              ),
                                            ),
                                            SizedBox(
                                              height: 5,
                                            ),
                                            Shimmer.fromColors(
                                                baseColor: Colors.black,
                                                highlightColor:
                                                    secondaryAccentColor,
                                                child: Text("0",
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 25))),
                                            SizedBox(
                                              height: 5,
                                            ),
                                            Text(
                                              "Jobs Posted",
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(top: 20),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons
                                                    .add_photo_alternate_outlined,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Shimmer.fromColors(
                                                baseColor: Colors.black,
                                                highlightColor:
                                                    secondaryAccentColor,
                                                child: Text("0",
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 25))),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Posts Created",
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(
                                          top: 20,
                                        ),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons.upload_file,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Shimmer.fromColors(
                                                baseColor: Colors.black,
                                                highlightColor:
                                                    secondaryAccentColor,
                                                child: Text("0",
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 25))),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Notes Shared",
                                              style: TextStyle(fontSize: 11),
                                            ),
                                          ],
                                        ),
                                      ),
                                      const SizedBox(
                                        width: 5,
                                      ),
                                      const VerticalDivider(
                                        thickness: 0.5,
                                        color: Colors.black,
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.only(
                                            top: 20, right: 4),
                                        child: Column(
                                          mainAxisAlignment:
                                              MainAxisAlignment.start,
                                          children: [
                                            const Center(
                                              child: Icon(
                                                Icons.videocam_outlined,
                                                size: 30,
                                              ),
                                            ),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            Shimmer.fromColors(
                                                baseColor: Colors.black,
                                                highlightColor:
                                                    secondaryAccentColor,
                                                child: Text("0",
                                                    style: const TextStyle(
                                                        fontWeight:
                                                            FontWeight.bold,
                                                        fontSize: 25))),
                                            const SizedBox(
                                              height: 5,
                                            ),
                                            const Text(
                                              "Videos Shared",
                                              style: TextStyle(fontSize: 10),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                          ),
                        ),
                      )
                    : SizedBox(),
                const SizedBox(
                  height: 20,
                ),
                Padding(
                  padding: const EdgeInsets.only(left: 10),
                  child: Row(
                    children: [
                      GestureDetector(
                        onTap: () {
                          Get.to(() => const EditProfile());
                        },
                        child: Container(
                          height: h * 0.05,
                          width: w * 0.46,
                          decoration: BoxDecoration(
                              color: primaryColor,
                              borderRadius: BorderRadius.circular(8)),
                          child: const Padding(
                            padding: EdgeInsets.only(left: 10, right: 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Edit Profile",
                                  style: TextStyle(
                                      color: backgroundColor,
                                      fontWeight: FontWeight.w700),
                                ),
                                Icon(
                                  Icons.edit_outlined,
                                  color: backgroundColor,
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        width: 15,
                      ),
                      GestureDetector(
                        onTap: () {
                          signout();
                        },
                        child: Container(
                          height: h * 0.05,
                          width: w * 0.46,
                          decoration: BoxDecoration(
                              color: secondaryAccentColor,
                              borderRadius: BorderRadius.circular(8)),
                          child: const Padding(
                            padding: EdgeInsets.only(left: 10, right: 10),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  "Logout",
                                  style: TextStyle(
                                      color: Colors.black,
                                      fontWeight: FontWeight.w700),
                                ),
                                Icon(
                                  Icons.logout_outlined,
                                  color: Colors.black,
                                )
                              ],
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                // Padding(
                //   padding: const EdgeInsets.only(left: 10, right: 20),
                //   child: Column(
                //     crossAxisAlignment: CrossAxisAlignment.start,
                //     children: [
                //       Text(
                //         "My Post Job Opportunities",
                //         style: TextStyle(
                //           color: Colors.black,
                //           fontWeight: FontWeight.bold,
                //           fontSize: 17,
                //         ),
                //       ),
                //       Divider(
                //         thickness: 0.4,
                //         color: Colors.black,
                //       ),
                //       //   SizedBox(
                //       // height: 140,
                //       // child: PageView.builder(
                //       //   scrollDirection: Axis.horizontal,
                //       //   itemCount: SampleJobList.length,
                //       //   itemBuilder: (context, index) {
                //       //     return JobListWidget(
                //       //       SampleJobList[index],
                //       //       );
                //       //     },
                //       //   ),
                //       //   ),
                //     ],
                //   ),
                // ),

                jobs.length > 0
                    ? Padding(
                        padding: const EdgeInsets.all(15.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Manage Posted Jobs",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700),
                            ),
                            const Divider(
                              color: secondaryColor,
                              thickness: 0.5,
                            ),
                            SizedBox(
                              height: 140,
                              child: jobs.length > 0
                                  ? PageView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: jobs.length,
                                      itemBuilder: (context, index) {
                                        return Stack(
                                          alignment: Alignment.topRight,
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  right: 10),
                                              child: JobListWidget(
                                                jobs[index],
                                              ),
                                            ),
                                            InkWell(
                                              onTap: () {
                                                Get.dialog(AlertDialog(
                                                  title:
                                                      const Text("Delete Job"),
                                                  content: const Text(
                                                      "Are you sure you want to delete this job posting?"),
                                                  actions: [
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                        },
                                                        child:
                                                            const Text("No")),
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                          LoadingBar
                                                              .loadingDialog(
                                                                  context);
                                                          JobRepo.deleteJob(
                                                              jobs[index]
                                                                  .jobId!);
                                                          Get.back();
                                                          setState(() {
                                                            jobs.removeAt(
                                                                index);
                                                          });
                                                        },
                                                        child:
                                                            const Text("Yes")),
                                                  ],
                                                ));
                                              },
                                              child: const CircleAvatar(
                                                  backgroundColor:
                                                      secondaryColor,
                                                  radius: 15,
                                                  child: Icon(
                                                    Icons.delete_outline,
                                                    color: Colors.white,
                                                  )),
                                            ),
                                          ],
                                        );
                                      },
                                    )
                                  : JobListWidget_Shimmer(),
                            ),
                          ],
                        ),
                      )
                    : SizedBox(),

                ///
                ///
                ///
                posts.length > 0
                    ? Padding(
                        padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Manage Posted Posts",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700),
                            ),
                            const Divider(
                              color: secondaryColor,
                              thickness: 0.5,
                            ),
                            SizedBox(
                              height: 180,
                              child: posts.length > 0
                                  ? PageView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: posts.length,
                                      itemBuilder: (context, index) {
                                        return Stack(
                                          alignment: Alignment.topRight,
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  right: 10),
                                              child: PostListWidget(
                                                posts[index],
                                              ),
                                            ),
                                            InkWell(
                                              onTap: () {
                                                Get.dialog(AlertDialog(
                                                  title: const Text(
                                                      "Delete Posts"),
                                                  content: const Text(
                                                      "Are you sure you want to delete this post?"),
                                                  actions: [
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                        },
                                                        child:
                                                            const Text("No")),
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                          LoadingBar
                                                              .loadingDialog(
                                                                  context);
                                                          PostsRepo.deletePost(
                                                              posts[index]
                                                                  .postId!);
                                                          Get.back();
                                                          setState(() {
                                                            posts.removeAt(
                                                                index);
                                                          });
                                                        },
                                                        child:
                                                            const Text("Yes")),
                                                  ],
                                                ));
                                              },
                                              child: const CircleAvatar(
                                                  backgroundColor:
                                                      secondaryColor,
                                                  radius: 15,
                                                  child: Icon(
                                                    Icons.delete_outline,
                                                    color: Colors.white,
                                                  )),
                                            ),
                                          ],
                                        );
                                      },
                                    )
                                  : PostListWidget_Shimmer(),
                            ),
                          ],
                        ),
                      )
                    : SizedBox(),

                ///
                ///
                ///
                notes.length > 0
                    ? Padding(
                        padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Manage Shared Notes",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700),
                            ),
                            const Divider(
                              color: secondaryColor,
                              thickness: 0.5,
                            ),
                            SizedBox(
                              height: 156,
                              child: notes.length > 0
                                  ? ListView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: notes.length,
                                      itemBuilder: (context, index) {
                                        return SizedBox(
                                          width: 180,
                                          child: Stack(
                                            alignment: Alignment.topRight,
                                            children: [
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    right: 10),
                                                child: DiscoverNotesListWidget(
                                                  notes[index],
                                                ),
                                              ),
                                              InkWell(
                                                onTap: () {
                                                  Get.dialog(AlertDialog(
                                                    title: const Text(
                                                        "Delete Note"),
                                                    content: const Text(
                                                        "Are you sure you want to delete this note?"),
                                                    actions: [
                                                      TextButton(
                                                          onPressed: () {
                                                            Get.back();
                                                          },
                                                          child:
                                                              const Text("No")),
                                                      TextButton(
                                                          onPressed: () {
                                                            Get.back();
                                                            LoadingBar
                                                                .loadingDialog(
                                                                    context);
                                                            NotesRepo.deleteNote(
                                                                notes[index]
                                                                    .noteId!);
                                                            Get.back();
                                                            setState(() {
                                                              notes.removeAt(
                                                                  index);
                                                            });
                                                          },
                                                          child: const Text(
                                                              "Yes")),
                                                    ],
                                                  ));
                                                },
                                                child: const CircleAvatar(
                                                    backgroundColor:
                                                        secondaryColor,
                                                    radius: 15,
                                                    child: Icon(
                                                      Icons.delete_outline,
                                                      color: Colors.white,
                                                    )),
                                              ),
                                            ],
                                          ),
                                        );
                                      },
                                    )
                                  : DiscoverNotesListWidget_Shimmer(),
                            ),
                          ],
                        ),
                      )
                    : SizedBox(),

                ///
                ///
                ///
                videos.length > 0
                    ? Padding(
                        padding: const EdgeInsets.fromLTRB(15, 0, 15, 15),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            const Text(
                              "Manage Shared Videos",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontSize: 16,
                                  fontWeight: FontWeight.w700),
                            ),
                            const Divider(
                              color: secondaryColor,
                              thickness: 0.5,
                            ),
                            SizedBox(
                              height: 250,
                              child: videos.length > 0
                                  ? PageView.builder(
                                      scrollDirection: Axis.horizontal,
                                      itemCount: videos.length,
                                      itemBuilder: (context, index) {
                                        return Stack(
                                          alignment: Alignment.topRight,
                                          children: [
                                            Padding(
                                              padding: const EdgeInsets.only(
                                                  right: 10),
                                              child: VideoListWidget(
                                                video: videos[index],
                                              ),
                                            ),
                                            InkWell(
                                              onTap: () {
                                                Get.dialog(AlertDialog(
                                                  title: const Text(
                                                      "Delete Videos"),
                                                  content: const Text(
                                                      "Are you sure you want to delete this video?"),
                                                  actions: [
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                        },
                                                        child:
                                                            const Text("No")),
                                                    TextButton(
                                                        onPressed: () {
                                                          Get.back();
                                                          LoadingBar
                                                              .loadingDialog(
                                                                  context);
                                                          VideoRepo.deleteVideo(
                                                              videos[index]
                                                                  .video_id!);
                                                          Get.back();
                                                          setState(() {
                                                            videos.removeAt(
                                                                index);
                                                          });
                                                        },
                                                        child:
                                                            const Text("Yes")),
                                                  ],
                                                ));
                                              },
                                              child: const CircleAvatar(
                                                  backgroundColor:
                                                      secondaryColor,
                                                  radius: 15,
                                                  child: Icon(
                                                    Icons.delete_outline,
                                                    color: Colors.white,
                                                  )),
                                            ),
                                          ],
                                        );
                                      },
                                    )
                                  : VideoListWidget_Shimmer(),
                            ),
                          ],
                        ),
                      )
                    : SizedBox(),
              ],
            ),
          ),
        ));
  }
}
