import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:noteng/Widgets/app_bar_widget.dart';
import 'package:noteng/Widgets/button_widget.dart';
import 'package:noteng/Widgets/textFieldWidget.dart';
import 'package:noteng/constants/colors.dart';
import 'package:noteng/data/Notes/notesModel.dart';
import 'package:noteng/data/Notes/notesRatingRepo.dart';
import 'package:noteng/data/Notes/notesRepo.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:syncfusion_flutter_pdfviewer/pdfviewer.dart';
import 'package:url_launcher/url_launcher_string.dart';

class NotesDetails extends StatefulWidget {
  final Notes note;
  NotesDetails(this.note, {super.key});

  @override
  State<NotesDetails> createState() => _NotesDetailsState();
}

class _NotesDetailsState extends State<NotesDetails> {
  bool already_rated = false;

  @override
  void initState() {
    super.initState();
    containsUser();
  }

  Future containsUser() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    var sap_id = await prefs.getString("sapid");

    for (Ratings rating in widget.note.ratings!) {
      if (rating.user == sap_id) {
        already_rated = true;
        setState(() {});
        break;
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarWidget(title: "Notes Details"),
      backgroundColor: backgroundColor,
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        widget.note.noteTitle!,
                        style: const TextStyle(
                            fontSize: 20, fontWeight: FontWeight.w700),
                      ),
                    ),
                    Flexible(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.star,
                            color: Colors.amber,
                          ),
                          const SizedBox(
                            width: 5,
                          ),
                          Text(
                            widget.note.averageRating!.toStringAsFixed(2),
                            style: const TextStyle(
                                fontSize: 20, fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    )
                  ],
                ),
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  "Subject: ${widget.note.subject}",
                  style: const TextStyle(
                      fontSize: 15,
                      color: secondaryColor,
                      fontWeight: FontWeight.w700),
                ),
                Text(
                  "Department: ${widget.note.department}",
                  style: const TextStyle(
                      fontSize: 15,
                      color: secondaryColor,
                      fontWeight: FontWeight.w700),
                )
              ],
            ),
            const Divider(
              thickness: 0.5,
              color: secondaryColor,
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
              width: double.infinity,
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                  color: secondaryAccentColor,
                  borderRadius: BorderRadius.circular(8)),
              child: Text(widget.note.noteDescription!),
            ),
            const SizedBox(
              height: 20,
            ),
            widget.note.document!.contains(RegExp(
                    r'\.(png|jpg|jpeg|gif|bmp|tiff?|webp)$',
                    caseSensitive: false))
                ? Expanded(
                    child: Container(
                      height: 500,
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                          color: secondaryAccentColor,
                          image: DecorationImage(
                              image: NetworkImage(widget.note.document!),
                              fit: BoxFit.fill),
                          borderRadius: BorderRadius.circular(8)),
                    ),
                  )
                : SizedBox(),
            widget.note.document!
                    .contains(RegExp(r'\.pdf$', caseSensitive: false))
                ? Expanded(
                    child: SfPdfViewer.network(widget.note.document!),
                  )
                : SizedBox(),
            const SizedBox(
              height: 5,
            ),
            !already_rated
                ? Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text("Rate the Notes: "),
                      RatingBar.builder(
                        initialRating: 0,
                        minRating: 1,
                        direction: Axis.horizontal,
                        allowHalfRating: false,
                        itemCount: 5,
                        itemPadding: EdgeInsets.symmetric(horizontal: 1.0),
                        itemBuilder: (context, _) => Icon(
                          Icons.star,
                          color: Colors.amber,
                          size: 10,
                        ),
                        onRatingUpdate: (rating) {
                          NotesRatingRepo.setRating(
                                  widget.note.noteId!, rating.round())
                              .then((value) {
                            setState(() {
                              already_rated = true;
                              widget.note.averageRating = rating;
                            });
                          });
                        },
                      )
                    ],
                  )
                : SizedBox(),
            const SizedBox(
              height: 5,
            ),
            const Divider(
              thickness: 0.5,
              color: secondaryColor,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text("Posted by:\n${widget.note.user}"),
              ],
            ),
          ],
        ),
      ),
      bottomNavigationBar: ButtonWidget(
          name: "Download Notes",
          onPressed: () {
            launchUrlString(widget.note.document!);
          }),
    );
  }
}
