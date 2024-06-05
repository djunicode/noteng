class Notes {
  int? noteId;
  List<Ratings>? ratings;
  double? averageRating;
  String? noteTitle;
  String? noteDescription;
  String? subject;
  String? department;
  String? document;
  String? user;

  Notes(
      {this.noteId,
      this.ratings,
      this.averageRating,
      this.noteTitle,
      this.noteDescription,
      this.subject,
      this.department,
      this.document,
      this.user});

  Notes.fromJson(Map<String, dynamic> json) {
    noteId = json['note_id'];
    if (json['ratings'] != null) {
      ratings = <Ratings>[];
      json['ratings'].forEach((v) {
        ratings!.add(new Ratings.fromJson(v));
      });
    }
    averageRating = double.parse(json['average_rating'].toString());
    noteTitle = json['note_title'];
    noteDescription = json['note_description'];
    subject = json['subject'];
    department = json['department'];
    document = json['document'];
    user = json['user'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.noteId != null) data['note_id'] = this.noteId;
    if (this.ratings != null) {
      data['ratings'] = this.ratings!.map((v) => v.toJson()).toList();
    }
    if (this.averageRating != null) data['average_rating'] = this.averageRating;
    if (this.noteTitle != null) data['note_title'] = this.noteTitle;
    if (this.noteDescription != null)
      data['note_description'] = this.noteDescription;
    if (this.subject != null) data['subject'] = this.subject;
    if (this.department != null) data['department'] = this.department;
    if (this.document != null) data['document'] = this.document;
    if (this.user != null) data['user'] = this.user;
    return data;
  }
}

class Ratings {
  String? user;
  int? rating;

  Ratings({this.user, this.rating});

  Ratings.fromJson(Map<String, dynamic> json) {
    user = json['user'];
    rating = json['rating'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['user'] = this.user;
    data['rating'] = this.rating;
    return data;
  }
}
