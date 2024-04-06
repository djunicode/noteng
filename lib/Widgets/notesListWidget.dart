import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/models/notesListModel.dart';

class NotesListWidget extends StatelessWidget {
  const NotesListWidget({
    super.key,
    this.nLM,
    required this.width,
    required this.height,
  });

  final NotesListModel? nLM;
  final double? width;
  final double? height;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(16.0),
      child: Container(
        clipBehavior: Clip.antiAlias,
        height: height,
        width: width,
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
                  nLM!.title!,
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
                  nLM!.rating!,
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
              nLM!.description!,
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
                      nLM!.subject!,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 14.0,
                        color: secondaryColor,
                      ),
                    ),
                    Text(
                      nLM!.department!,
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

//EXAMPLE KE LIYE RAKHA H WRAP THIS WIDGET IN LIST VIEW BUILDER
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
