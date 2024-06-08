import 'dart:io';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/jobListWidget.dart';
import 'package:noteng/Widgets/notesListWidget.dart';
import 'package:noteng/Widgets/postListWidget.dart';
import 'package:noteng/Widgets/videoListWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Job/jobModel.dart';
import 'package:noteng/data/Job/jobRepo.dart';
import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/Notes/notesRepo.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:noteng/data/Posts/postRepo.dart';
import 'package:noteng/data/User/userModel.dart';
import 'package:noteng/data/User/userRepo.dart';
import 'package:noteng/data/Video/videoModel.dart';
import 'package:noteng/data/Video/videoRepo.dart';
import 'package:noteng/pages/Discover/discover_job.dart';
import 'package:noteng/pages/Discover/discover_notes.dart';
import 'package:noteng/pages/Discover/discover_posts.dart';
import 'package:noteng/pages/Discover/discover_videos.dart';
import 'package:noteng/pages/Home/sample_data.dart';
import 'package:noteng/pages/profile/profilePage.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../../Widgets/bottom_nav_bar.dart';
import '../../Widgets/modalbottom.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController SearchController = TextEditingController();
  var jobSelected = true;
  var postSelected = false;
  var noteSelected = false;
  var videoSelected = false;

  var userName = "User Name";
  List<Job> jobs = [];
  List<Posts> posts = [];
  List<Notes> notes = [];
  List<Video> videos = [];

  Future fetchUserName() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var fname = await prefs.getString("fname");
    var lname = await prefs.getString("lname");
    if (fname == null && lname == null) {
      userName = "User";
    } else if (fname != null && lname != null) {
      userName = "$fname $lname";
    } else {
      userName = "$fname";
    }

    setState(() {});
  }

  Future fetchData() async {
    jobs = await JobRepo.getAllJobs();
    posts = await PostsRepo.getAllPosts();
    notes = await NotesRepo.getAllNotes();
    videos = await VideoRepo.getAllVideos();
    setState(() {});
  }

  Future<File> pickFile() async {
    FilePickerResult? result = await FilePicker.platform.pickFiles();

    if (result != null) {
      return File(result.files.single.path!);
    } else {
      // User canceled the picker
      return File('');
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchUserName();
    fetchData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
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
      bottomNavigationBar: Bottomnavbar(0),
      backgroundColor: Colors.white,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(250),
        child: Container(
          padding: const EdgeInsets.fromLTRB(25, 50, 25, 20),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        "NOTENG",
                        style: TextStyle(
                            fontSize: 24, fontWeight: FontWeight.w800),
                      ),
                      Text(
                        "Hey, $userName",
                        style: const TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w800),
                      ),
                    ],
                  ),
                  InkWell(
                    onTap: () {
                      Get.offAll(ProfilePage(), transition: Transition.fade);
                    },
                    child: Container(
                      height: 50,
                      width: 50,
                      decoration: BoxDecoration(
                          color: secondaryAccentColor.withAlpha(150),
                          borderRadius: BorderRadius.circular(15)),
                      child: const Icon(
                        Icons.person_outline,
                        color: primaryColor,
                        size: 30,
                      ),
                    ),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              Container(
                width: double.infinity,
                height: 60,
                decoration: BoxDecoration(
                    color: secondaryAccentColor,
                    borderRadius: BorderRadius.circular(12)),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: SearchController,
                        decoration: const InputDecoration(
                            hintText: "Search for posts, notes, etc...",
                            hintStyle: TextStyle(
                                color: secondaryColor,
                                fontSize: 16,
                                fontWeight: FontWeight.w500),
                            border: InputBorder.none,
                            contentPadding:
                                EdgeInsets.only(left: 10, right: 10)),
                      ),
                    ),
                    InkWell(
                      onTap: () {
                        if (jobSelected) {
                          Get.offAll(DiscoverJob(
                            initial_search_query: SearchController.text,
                          ));
                        }
                        if (noteSelected) {
                          Get.offAll(DiscoverNotes(
                            initial_search_query: SearchController.text,
                          ));
                        }
                        if (videoSelected) {
                          Get.offAll(DiscoverVideos(
                            initial_search_query: SearchController.text,
                          ));
                        }
                        if (postSelected) {
                          Get.offAll(DiscoverPost(
                            initial_search_query: SearchController.text,
                          ));
                        }
                      },
                      child: Container(
                        margin: const EdgeInsets.fromLTRB(0, 0, 10, 0),
                        height: 40,
                        width: 40,
                        decoration: BoxDecoration(
                            color: primaryColor,
                            borderRadius: BorderRadius.circular(10)),
                        child: Padding(
                          padding: const EdgeInsets.all(9.0),
                          child: SvgPicture.asset(
                            "assets/svg/search.svg",
                          ),
                        ),
                      ),
                    )
                  ],
                ),
              ),
              const SizedBox(
                height: 15,
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = false;
                          videoSelected = false;
                          jobSelected = !jobSelected;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: jobSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Jobs",
                            style: TextStyle(
                                color:
                                    jobSelected ? Colors.white : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = !postSelected;
                          noteSelected = false;
                          videoSelected = false;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: postSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Posts & Hackathons",
                            style: TextStyle(
                                color: postSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = !noteSelected;
                          videoSelected = false;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: noteSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Notes",
                            style: TextStyle(
                                color: noteSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          postSelected = false;
                          noteSelected = false;
                          videoSelected = !videoSelected;
                          jobSelected = false;
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.only(right: 10),
                        height: 35,
                        padding: const EdgeInsets.fromLTRB(10, 5, 10, 5),
                        decoration: BoxDecoration(
                            color: videoSelected
                                ? primaryColor
                                : secondaryAccentColor,
                            borderRadius: BorderRadius.circular(12)),
                        child: Center(
                          child: Text(
                            "Videos",
                            style: TextStyle(
                                color: videoSelected
                                    ? Colors.white
                                    : secondaryColor,
                                fontSize: 15,
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
      body: SingleChildScrollView(
          child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(25, 0, 25, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // InkWell(
                //   onTap: () async {
                //     UserRepo.registerUser(User.fromJson({
                //       "sapid": "60004230269",
                //       "password": "pass@123",
                //       "fname": "Meet",
                //       "lname": "Chavan",
                //       "email": "meetchavan24@gmail.com",
                //       "contact_number": "8169264512"
                //     }));
                //   },
                //   child: const Text(
                //     "Test Signup User",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     UserRepo.loginUser(User.fromJson({
                //       "sapid": "60004230269",
                //       "password": "pass@123",
                //     }));
                //   },
                //   child: const Text(
                //     "Test Login User",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     UserRepo.refreshToken();
                //   },
                //   child: const Text(
                //     "Test Refresh Token",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     UserRepo.getUserDetails();
                //   },
                //   child: const Text(
                //     "Test Get User Details",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     UserRepo.editUserDetails(User.fromJson({
                //       "fname": "Meet",
                //       "lname": "Chavan",
                //       "email": "meetchavan24@gmail.com",
                //       "contact_number": "8169264511"
                //     }));
                //   },
                //   child: const Text(
                //     "Test Update User Details",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // SizedBox(
                //   height: 20,
                // ),
                // InkWell(
                //   onTap: () async {
                //     PostsRepo.getAllPosts().then((value) {
                //       print(value[0].toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get All Posts",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     PostsRepo.getSinglePost(2).then((value) {
                //       print(value.toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get Single Post",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     PostsRepo.createPost(
                //         Posts.fromJson({
                //           "title": "ABC",
                //           "deadline": "2024-04-06T17:58:57Z",
                //           "post_url": "http://abc.com",
                //           "description": "ABCD",
                //           "likes": 1,
                //           "organised_by": "college",
                //           "subtype": "hackathon",
                //           "is_interested": true,
                //           "date_updated": "2024-06-05",
                //           "date_uploaded": "2024-06-05",
                //           "image":
                //               "https://res.cloudinary.com/dhwxjoncj/raw/upload/v1/media/images/Screenshot_2024-06-05_at_11.11.36AM_eeu4on.png",
                //           "user": "60004230269"
                //         }),
                //         await pickFile());
                //   },
                //   child: const Text(
                //     "Test Create Post",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     PostsRepo.deletePost(9);
                //   },
                //   child: const Text(
                //     "Test Delete Post",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     PostsRepo.updatePost(
                //         Posts.fromJson({
                //           "post_id": 3,
                //           "title": "ABC",
                //           "post_url": "http://abc.com",
                //           "description": "ABCD",
                //           "likes": 1,
                //           "organised_by": "college",
                //           "subtype": "hackathon",
                //           "is_interested": true,
                //         }),
                //         await pickFile());
                //   },
                //   child: const Text(
                //     "Test Update Post",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // SizedBox(
                //   height: 20,
                // ),
                // InkWell(
                //   onTap: () async {
                //     NotesRepo.getAllNotes().then((value) {
                //       print(value[0].toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get All Notes",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     NotesRepo.getSingleNote(2).then((value) {
                //       print(value.toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get Single Note",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     NotesRepo.createNote(
                //         Notes.fromJson({
                //           "note_id": 5,
                //           "ratings": [],
                //           "average_rating": 0,
                //           "note_title": "updated test1",
                //           "note_description":
                //               "This is the updated description of the note1.",
                //           "subject": "Maths4",
                //           "department": "Comps2",
                //           "document":
                //               "https://res.cloudinary.com/dhwxjoncj/raw/upload/v1/media/raw/Screenshot_2024-06-05_at_11.11.36AM_fs0vul.png",
                //           "user": "60004230269"
                //         }),
                //         await pickFile());
                //   },
                //   child: const Text(
                //     "Test Create Note",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     NotesRepo.deleteNote(5);
                //   },
                //   child: const Text(
                //     "Test Delete Note",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     NotesRepo.updateNote(
                //         Notes.fromJson({
                //           "note_id": 6,
                //           "ratings": [],
                //           "average_rating": 0,
                //           "note_title": "updated test1",
                //           "note_description":
                //               "This is the updated description of the note1.",
                //           "subject": "Maths4",
                //           "department": "Comps2",
                //           "user": "60004230269"
                //         }),
                //         await pickFile());
                //   },
                //   child: const Text(
                //     "Test Update Note",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // SizedBox(
                //   height: 20,
                // ),
                // InkWell(
                //   onTap: () async {
                //     JobRepo.getAllJobs().then((value) {
                //       print(value[0].toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get All Jobs",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     JobRepo.getSingleJob(2).then((value) {
                //       print(value.toJson());
                //     });
                //   },
                //   child: const Text(
                //     "Test Get Single Job",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     JobRepo.createJob(Job.fromJson({
                //       "company": "AMEX_TEST",
                //       "job_title": "Software Engineer",
                //       "subtype": "Job",
                //       "mode": "Offline",
                //       "location": "Remote",
                //       "contact_no": "9082228928",
                //       "requirements":
                //           "No Backlogss till now - 8.5+ CGPA - Knowledge of any Backend Framework - Proficiency In DSA - System Design - Database Management",
                //       "duration_in_months": 3,
                //       "description":
                //           "We are seeking a highly motivated and talented AI Intern to join our dynamic team. Asan AI Intern, you will have the opportunity to work on cutting-edge projects in artificialintelligence and machine learning. You will collaborate with our experienced AI researchers and engineers to develop innovative solutions that address real-world challenges across various industries.",
                //       "upload_time": "2024-06-06T15:40:23.466223Z",
                //       "user": "60004230269"
                //     }));
                //   },
                //   child: const Text(
                //     "Test Create Job",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     JobRepo.deleteJob(9);
                //   },
                //   child: const Text(
                //     "Test Delete Job",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // InkWell(
                //   onTap: () async {
                //     JobRepo.updateJob(Job.fromJson({
                //       "job_id": 10,
                //       "company": "AMEX_TEST 2",
                //       "subtype": "Job",
                //       "mode": "Offline",
                //       "location": "Remote",
                //       "contact_no": "9082228008",
                //       "requirements":
                //           "No Backlogss till now - 7.5+ CGPA - Knowledge of any Backend Framework - Proficiency In DSA - System Design - Database Management",
                //       "duration_in_months": 3,
                //       "description":
                //           "We are not seeking a highly motivated and talented AI Intern to join our dynamic team. Asan AI Intern, you will have the opportunity to work on cutting-edge projects in artificialintelligence and machine learning. You will collaborate with our experienced AI researchers and engineers to develop innovative solutions that address real-world challenges across various industries.",
                //       "upload_time": "2024-06-06T15:40:23.466223Z",
                //     }));
                //   },
                //   child: const Text(
                //     "Test Update Job",
                //     style: TextStyle(
                //         color: Colors.black,
                //         fontSize: 16,
                //         fontWeight: FontWeight.w700),
                //   ),
                // ),
                // SizedBox(
                //   height: 20,
                // ),
                const Text(
                  "Explore Latest Job Opportunities",
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
                            return JobListWidget(
                              jobs[index],
                            );
                          },
                        )
                      : JobListWidget_Shimmer(),
                ),
                const SizedBox(
                  height: 20,
                ),
                const Text(
                  "Explore Latest Posts & Hackathons",
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
                            return PostListWidget(
                              posts[index],
                            );
                          },
                        )
                      : PostListWidget_Shimmer(),
                ),
              ],
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Container(
            height: 215,
            padding: const EdgeInsets.fromLTRB(25, 10, 25, 0),
            width: double.infinity,
            color: primaryColor,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Explore Shared Notes",
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                      fontWeight: FontWeight.w700),
                ),
                const Divider(
                  color: Colors.white,
                  thickness: 0.5,
                ),
                SizedBox(
                    height: 156,
                    child: notes.length > 0
                        ? ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: notes.length,
                            itemBuilder: (context, index) {
                              return NotesListWidget(
                                notes[index],
                              );
                            },
                          )
                        : ListView.builder(
                            scrollDirection: Axis.horizontal,
                            itemBuilder: (context, index) {
                              return NotesListWidget_Shimmer();
                            },
                          )),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.fromLTRB(25, 20, 25, 0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  "Explore Shared Video Resources",
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
                    height: 246,
                    child: videos.length > 0
                        ? PageView.builder(
                            scrollDirection: Axis.horizontal,
                            itemCount: videos.length,
                            itemBuilder: (context, index) {
                              return VideoListWidget(
                                video: videos[index],
                              );
                            },
                          )
                        : VideoListWidget_Shimmer()),
              ],
            ),
          ),
          const SizedBox(
            height: 50,
          ),
        ],
      )),
    );
  }
}
