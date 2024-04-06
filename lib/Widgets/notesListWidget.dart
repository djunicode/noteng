import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

//EXAMPLE KE LIYE RAKHA H HOW TO WRAP THIS WIDGET IN LIST VIEW BUILDER
//class _TrialState extends State<Trial> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       backgroundColor: backgroundColor,
//       body: SingleChildScrollView(
//         scrollDirection: Axis.horizontal,
//         child: Row(
//           children: List.generate(
//             5,
//             (index) => Padding(
//               padding: const EdgeInsets.all(8.0),
//               child: NotesListWidget(),
//             ),
//           ),
//         ),
//       ),
//     );
//   }
// }

class NotesListWidget extends StatelessWidget {
  const NotesListWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Container(
        clipBehavior: Clip.antiAlias,
        height: 550,
        width: 260,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10.0),
          color: backgroundColor,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Text(
                  "Notes Title",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Spacer(),
                Icon(Icons.star_outline_sharp),
                SizedBox(
                  width: 12.0,
                ),
                Text(
                  "4.6",
                  style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w400,
                    fontSize: 12.0,
                  ),
                ),
              ],
            ),
            Divider(
              color: Colors.grey,
              thickness: 1.0,
              height: 20.0,
              indent: 0,
              endIndent: 0,
            ),
            Text(
              "Check out  study buddy notes crafted by students who've been through coding...Check out these study buddy notes crafted by students who've been through coding...Check out these study buddy notes crafted by students who've been through coding...",
              style: TextStyle(
                fontSize: 12.0,
                color: secondaryColor,
                fontWeight: FontWeight.w500,
              ),
            ),
            SizedBox(
              height: 16.0,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      "Subject",
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14.0,
                        color: secondaryColor,
                      ),
                    ),
                    Text(
                      "Department",
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 13.0,
                        color: secondaryColor,
                      ),
                    ),
                  ],
                ),
                Icon(Icons.document_scanner),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
