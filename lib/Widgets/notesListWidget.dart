import 'package:flutter/material.dart';

class NotesListWidget extends StatelessWidget {
  const NotesListWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double containerSize = constraints.maxWidth < constraints.maxHeight
            ? constraints.maxWidth
            : constraints.maxHeight;
        return SizedBox(
          width: containerSize,
          height: containerSize,
          child: Container(
            padding: EdgeInsets.symmetric(
              vertical: 16.0,
              horizontal: 16.0,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(8.0),
              color: Colors.blueGrey,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Row(
                  children: [
                    Text(
                      "Notes Title",
                      style: TextStyle(
                        color: Colors.black,
                        fontSize: 24.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    const Spacer(),
                    Icon(Icons.star_outline_sharp),
                    SizedBox(
                      width: 12.0,
                    ),
                    Text(
                      "4.6",
                      style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.w200,
                      ),
                    ),
                  ],
                ),
                Divider(
                  color: Colors.grey,
                  thickness: 1.0,
                  height: 20.0,
                  indent: 20.0,
                  endIndent: 20.0,
                ),
                Text(
                  "Check out these study buddy notes crafted by students who've been through coding...Check out these study buddy notes crafted by students who've been through coding...Check out these study buddy notes crafted by students who've been through coding...Check out these study buddy notes crafted by students who've been through coding...",
                  style: TextStyle(
                    color: Colors.grey,
                    fontSize: 16,
                  ),
                ),
                SizedBox(
                  height: 12.0,
                ),
                Row(
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Subject",
                          style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.w200,
                          ),
                        ),
                        Text(
                          "Department",
                          style: TextStyle(
                            color: Colors.grey,
                            fontWeight: FontWeight.w300,
                          ),
                        ),
                      ],
                    ),
                    Spacer(),
                    Icon(Icons.document_scanner),
                    SizedBox(
                      width: 24.0,
                    ),
                  ],
                )
              ],
            ),
          ),
        );
      },
    );
  }
}
