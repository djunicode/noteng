import 'package:noteng/data/Mentorship/mentorModel.dart';

class User {
  String? sapid;
  String? fname;
  String? lname;
  String? email;
  String? contactNumber;
  List<Mentor>? mentors;
  String? expertise;
  String? password;

  User(
      {this.sapid,
      this.password,
      this.fname,
      this.lname,
      this.email,
      this.contactNumber,
      this.mentors,
      this.expertise});

  User.fromJson(Map<String, dynamic> json) {
    sapid = json['sapid'];
    fname = json['fname'];
    lname = json['lname'];
    email = json['email'];
    contactNumber = json['contact_number'];
    if (json['mentors'] != null) {
      mentors = <Mentor>[];
      json['mentors'].forEach((v) {
        mentors!.add(new Mentor.fromJson(v));
      });
    }
    expertise = json['expertise'];
    password = json['password'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.sapid != null) data['sapid'] = this.sapid;
    if (this.fname != null) data['fname'] = this.fname;
    if (this.lname != null) data['lname'] = this.lname;
    if (this.email != null) data['email'] = this.email;
    if (this.contactNumber != null) data['contact_number'] = this.contactNumber;
    if (this.mentors != null) {
      data['mentors'] = this.mentors!.map((v) => v.toJson()).toList();
    }
    if (this.expertise != null) data['expertise'] = this.expertise;
    if (this.password != null) data['password'] = this.password;
    return data;
  }
}
