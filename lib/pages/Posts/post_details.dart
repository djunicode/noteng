import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';

class PostDetails extends StatefulWidget {
  const PostDetails({super.key});

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
            children: [
                  Center(
                    child: Text("Post Title",style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w700
                    ),),
                  ),
                  
                  const Divider(
                    color: secondaryColor,
                    thickness: 0.5,

                  ),
                const SizedBox(height: 20,),

                const Padding(
                  padding: EdgeInsets.only(right: 200),
                  child: Text("Post Description",style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w600
                  ),),
                ),
                const SizedBox(height: 20,),
                const textFieldWidget(
                  maxLines: 7,
                  readOnly: true,
                  hintText: "",
                ),

                const SizedBox(height: 20,),
                Container(
                      height: 170,
                      width: 200,
                ),

                Divider(
                  color: secondaryColor,
                  thickness: 0.5,
                ),

                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Posted by:\n Meet Chavan"),
                    Text("24th March 2024\n15:18"),
                  ],
                ),
                SizedBox(height: 10,),
                Row(
                  children: [
                    Icon(Icons.favorite,color: Colors.red,),
                    Padding(
                      padding: const EdgeInsets.only(left: 10),
                      child: Text("100+ Likes"),
                    )
                  ],
                )
            ],
          ),
        ),
      ),
      bottomNavigationBar: ButtonWidget(name: "Contact Post Admin", onPressed: (){}),
    );
  }
}