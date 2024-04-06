import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';

class AddNewPostPage extends StatefulWidget {
  const AddNewPostPage({super.key});

  @override
  State<AddNewPostPage> createState() => _AddNewPostPageState();
}

class _AddNewPostPageState extends State<AddNewPostPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(title: "Create New Post"),
      backgroundColor: backgroundColor,
      bottomNavigationBar: ButtonWidget(name: "Add New Post", action: "", height: 60,),
          body: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.all(15.0),
              child: Column(
               crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                    
                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text("Post Title", 
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700
                      ),),
                    ),
                    textFieldWidget(
                      hintText: "Enter Post Title",
                      maxLines: 1,
                      ),
                    const SizedBox(height: 20,),
                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text("Post Category", 
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700
                      ),
                      ),
                    ),
                    textFieldWidget(
                      hintText: "Enter Post Category",
                      maxLines: 1,
                      icon: IconButton(onPressed: (){}, icon: Icon(Icons.arrow_drop_down)),
                      suffixIcon: true,
                      ),
                    const SizedBox(height: 20,),
                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text("Post Description", 
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700
                      ),
                      ),
                    ),
                    textFieldWidget(
                      hintText: "Enter Post Description",
                      maxLines: 5,
                      
                      ),
                    const SizedBox(height: 20,),

                    const Padding(
                      padding: EdgeInsets.all(8.0),
                      child: Text("Upload Image", 
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700
                      ),
                      ),
                    ),

                ],
              ),
            ),
          ),
    );
  }
}