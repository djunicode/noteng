class Mentor {
  String? testField;

  Mentor({this.testField});

  Mentor.fromJson(Map<String, dynamic> json) {
    testField = json['test_field'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['test_field'] = this.testField;
    return data;
  }
}
