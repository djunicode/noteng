import 'package:flutter/material.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';

class NotesDetails extends StatefulWidget {
  const NotesDetails({super.key});

  @override
  State<NotesDetails> createState() => _NotesDetailsState();
}

class _NotesDetailsState extends State<NotesDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBarWidget(title: "Notes Details"),
      backgroundColor: backgroundColor,
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
                  Center(
                    child: Text("Notes Title",style: TextStyle(
                      fontSize: 25,
                      fontWeight: FontWeight.w700
                      ),),
                  ),
                  SizedBox(height: 20,),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Padding(
                        padding: EdgeInsets.only(right: 40),
                        child: Text("Subject: ",style: TextStyle(
                          fontSize: 15,
                          color: secondaryColor
                        ),),
                      ),
                      Padding(
                        padding: EdgeInsets.only(right: 60),
                        child: Text("Department: ",style: TextStyle(
                          fontSize: 15,
                          color: secondaryColor
                        ),),
                      )
                    ],
                  ),
                  Divider(
                    thickness: 0.5,
                    color: secondaryColor,
                  ),

                  SizedBox(height: 20,),

                  Padding(
                    padding: EdgeInsets.only(right: 190),
                    child: Text("Notes Description",style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w700
                    ),),
                  ),
                  SizedBox(height: 10,),
                  textFieldWidget(
                    hintText: "",
                    readOnly: true,
                    maxLines: 6,
                  ),

                SizedBox(height: 20,),

                Container(
                  height: 200,
                  width: 400,
                  decoration: BoxDecoration(
                    color: secondaryColor,
                    borderRadius: BorderRadius.circular(20)
                  ),
                ),
                SizedBox(height: 20,),
                ElevatedButton(

                  onPressed: (){}, 
                  style: ButtonStyle(
                    backgroundColor: MaterialStatePropertyAll(primaryColor),
                    
                  ),
                  child: Text("Download Notes",style: TextStyle(
                    color: backgroundColor
                  ),),
                  ),

                  Divider(
                    thickness: 0.5,
                    color: secondaryColor,
                  ),

                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text("Posted by:\nMeet Chavan"),
                    Text("24th March 2024\n15:18"),
                  ],
                ),

                

                Row(
                  children: [
                    Text("Rate the Notes: "),
                    Row(
                      
                      children: 
                        List.generate(
                          5,
                        (index) => IconButton(
                            onPressed: (){
                                
                            }, 
                            icon: Icon(Icons.star_border_outlined)
                            ),
                        ),
                      
                    )
                  ],
                ),



            ],
          ),
        ),
      ),

      bottomNavigationBar: ButtonWidget(name: "Contact Notes Admin", onPressed: (){}),
    );
  }
}