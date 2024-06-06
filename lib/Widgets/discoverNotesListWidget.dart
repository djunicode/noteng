import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Notes/notesModel.dart';

class DiscoverNotesListWidget extends StatelessWidget {
  const DiscoverNotesListWidget(
    this.nLM, {
    super.key,
  });

  final Notes? nLM;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.fromLTRB(10, 10, 10, 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8.0),
        color: secondaryAccentColor.withAlpha(150),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Flexible(
                child: Text(
                  nLM!.noteTitle!,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 13.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
              Column(
                children: [
                  const Icon(
                    Icons.star,
                    size: 16,
                    color: Colors.amber,
                  ),
                  Text(
                    nLM!.averageRating!.toString(),
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w400,
                      fontSize: 12.0,
                    ),
                  ),
                ],
              ),
            ],
          ),
          Divider(
            color: secondaryColor,
            thickness: 0.5,
          ),
          Text(
            nLM!.noteDescription!,
            maxLines: 3,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 10.0,
              color: secondaryColor,
              fontWeight: FontWeight.w500,
            ),
          ),
          Expanded(
            child: SizedBox(
              height: 5,
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      nLM!.subject!,
                      style: TextStyle(
                        fontWeight: FontWeight.w600,
                        fontSize: 11.0,
                        color: secondaryColor,
                      ),
                    ),
                    Text(
                      nLM!.department!,
                      style: TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 9.0,
                        color: secondaryColor,
                      ),
                    ),
                  ],
                ),
              ),
              Icon(
                Icons.file_present_outlined,
                color: secondaryColor,
                size: 16,
              ),
            ],
          ),
        ],
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
