import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Posts/postModel.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:url_launcher/url_launcher_string.dart';

class PostDetails extends StatefulWidget {
  final Posts post;
  PostDetails(this.post, {super.key});

  @override
  State<PostDetails> createState() => _PostDetailsState();
}

class _PostDetailsState extends State<PostDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarWidget(title: "Post Details"),
      backgroundColor: backgroundColor,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(15.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.post.title!,
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
              ),
              Text(
                widget.post.subtype!.toUpperCase(),
                style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: secondaryColor),
              ),
              const Divider(
                color: secondaryColor,
                thickness: 0.5,
              ),
              widget.post.image != null
                  ? Container(
                      height: 200,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          image: DecorationImage(
                              image: NetworkImage(widget.post.image!),
                              fit: BoxFit.cover),
                          borderRadius: BorderRadius.circular(8)),
                    )
                  : SizedBox(),
              SizedBox(
                height: 10,
              ),
              Row(
                children: [
                  Icon(
                    Icons.favorite,
                    color: widget.post.isInterested! ? Colors.red : Colors.grey,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(left: 10),
                    child: widget.post.likes! > 0
                        ? Text("${widget.post.likes! - 1}+ Likes")
                        : Text("No Likes"),
                  )
                ],
              ),
              const SizedBox(
                height: 20,
              ),
              const Padding(
                padding: EdgeInsets.only(right: 200),
                child: Text(
                  "Description:",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                ),
              ),
              const SizedBox(height: 5),
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                    color: secondaryAccentColor,
                    borderRadius: BorderRadius.circular(8)),
                child: Text(widget.post.description!),
              ),
              widget.post.organisedBy != null
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 20,
                        ),
                        const Padding(
                          padding: EdgeInsets.only(right: 200),
                          child: Text(
                            "Organised By:",
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600),
                          ),
                        ),
                        const SizedBox(height: 5),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                              color: secondaryAccentColor,
                              borderRadius: BorderRadius.circular(8)),
                          child: Text(widget.post.organisedBy!),
                        ),
                      ],
                    )
                  : SizedBox(),
              widget.post.deadline != null
                  ? Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const SizedBox(
                          height: 20,
                        ),
                        const Padding(
                          padding: EdgeInsets.only(right: 200),
                          child: Text(
                            "Deadline:",
                            style: TextStyle(
                                fontSize: 18, fontWeight: FontWeight.w600),
                          ),
                        ),
                        const SizedBox(height: 5),
                        Container(
                          width: double.infinity,
                          padding: const EdgeInsets.all(10),
                          decoration: BoxDecoration(
                              color: secondaryAccentColor,
                              borderRadius: BorderRadius.circular(8)),
                          child: Text(DateFormat('EEEE, MM/dd/y, HH:MM')
                              .format(DateTime.parse(widget.post.deadline!))),
                        ),
                      ],
                    )
                  : SizedBox(),
              const SizedBox(
                height: 20,
              ),
              Divider(
                color: secondaryColor,
                thickness: 0.5,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text("Posted by:\n${widget.post.user}"),
                  Text("Post Date:\n" +
                      DateFormat('EEEE, MM/dd/y')
                          .format(DateTime.parse(widget.post.dateUpdated!))),
                ],
              ),
            ],
          ),
        ),
      ),
      bottomNavigationBar: widget.post.postUrl != null
          ? ButtonWidget(
              name: "Visit Website",
              onPressed: () {
                launchUrlString(widget.post.postUrl!);
              })
          : SizedBox(),
    );
  }
}
