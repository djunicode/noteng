import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:noteng/Widgets/discover_tab.dart';
import 'package:noteng/Widgets/postListWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:noteng/data/Posts/postRepo.dart';
import 'package:noteng/pages/Home/sample_data.dart';

import '../../Widgets/bottom_nav_bar.dart';
import '../../Widgets/modalbottom.dart';

class DiscoverPost extends StatefulWidget {
  const DiscoverPost({Key? key}) : super(key: key);

  @override
  _DiscoverPostState createState() => _DiscoverPostState();
}

class _DiscoverPostState extends State<DiscoverPost> {
  final TextEditingController SearchController = TextEditingController();
  var branchSelected = "All";
  List<Posts> posts = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    fetchData();
  }

  Future fetchData() async {
    posts = await PostsRepo.getAllPosts();
    setState(() {});
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
      bottomNavigationBar: Bottomnavbar(1),
      backgroundColor: Colors.white,
      appBar: PreferredSize(
        preferredSize: const Size.fromHeight(275),
        child: Container(
          padding: const EdgeInsets.fromLTRB(25, 50, 25, 20),
          child: Column(
            children: [
              const Text(
                "Discover",
                style:
                    const TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
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
                    Container(
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
                    branchChip("All"),
                    branchChip("CS"),
                    branchChip("IT"),
                    branchChip("AIML"),
                    branchChip("AIDS"),
                    branchChip("DS"),
                    branchChip("IOT"),
                    branchChip("EXTC"),
                    branchChip("ME"),
                  ],
                ),
              ),
              const Divider(
                height: 30,
                color: secondaryColor,
                thickness: 0.5,
              ),
              DiscoverTab(1)
            ],
          ),
        ),
      ),
      body: posts.length > 0
          ? ListView.builder(
              scrollDirection: Axis.vertical,
              itemCount: posts.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.fromLTRB(25, 0, 25, 10),
                  child: PostListWidget(
                    posts[index],
                  ),
                );
              },
            )
          : Center(child: CircularProgressIndicator()),
    );
  }

  Widget branchChip(branchName) {
    return GestureDetector(
      onTap: () {
        setState(() {
          branchSelected = branchName;
        });
      },
      child: Container(
        margin: const EdgeInsets.only(right: 10),
        height: 35,
        padding: const EdgeInsets.fromLTRB(15, 5, 15, 5),
        decoration: BoxDecoration(
            color: branchSelected == branchName
                ? primaryColor
                : secondaryAccentColor,
            borderRadius: BorderRadius.circular(12)),
        child: Center(
          child: Text(
            branchName,
            style: TextStyle(
                color: branchSelected == branchName
                    ? Colors.white
                    : secondaryColor,
                fontSize: 15,
                fontWeight: FontWeight.w500),
          ),
        ),
      ),
    );
  }
}
