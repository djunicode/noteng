import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';

class UploadNotes extends StatefulWidget {
  const UploadNotes({super.key});

  @override
  State<UploadNotes> createState() => _UploadNotesState();
}

class _UploadNotesState extends State<UploadNotes> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
          appBar: AppBarWidget(title: "Upload Notes",),
          backgroundColor: backgroundColor,
          body: SingleChildScrollView(
            child: Padding(
              padding: EdgeInsets.all(15.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("Notes Title",style: TextStyle(
                          fontSize: 18, 
                          fontWeight: FontWeight.w700 
                        ),),
                      ),
                      textFieldWidget(
                        hintText: "Enter Notes Title",
                        maxLines: 1,
                      ),

                      SizedBox(height: 10,),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("Subject",style: TextStyle(
                          fontSize: 18, 
                          fontWeight: FontWeight.w700 
                        ),),
                      ),

                      textFieldWidget(
                        hintText: "Enter subject",
                        maxLines: 1,
                      ),

                      SizedBox(height: 10,),

                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("Department",style: TextStyle(
                          fontSize: 18, 
                          fontWeight: FontWeight.w700 
                        ),),
                      ),

                      textFieldWidget(
                        hintText: "Enter department",
                        maxLines: 1,
                      ),

                      SizedBox(height: 10,),
                      Padding(
                        padding: EdgeInsets.all(8.0),
                        child: Text("Notes Description",style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w700
                        ),),
                      ),

                      textFieldWidget(
                        hintText: "Enter Description",
                        maxLines: 5,
                      ),

                      SizedBox(height: 10,),

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
                      onPressed: () {
                        
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

          bottomNavigationBar: ButtonWidget(name: "Upload Notes", onPressed: (){}),
    );
  }
}