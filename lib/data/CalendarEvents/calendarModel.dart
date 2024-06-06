class CalendarEvents {
  int? calendarId;
  String? date;
  String? title;
  String? description;
  String? note;
  String? user;

  CalendarEvents(
      {this.calendarId,
      this.date,
      this.title,
      this.description,
      this.note,
      this.user});

  CalendarEvents.fromJson(Map<String, dynamic> json) {
    calendarId = json['calendar_id'];
    date = json['date'];
    title = json['title'];
    description = json['description'];
    note = json['note'];
    user = json['user'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['calendar_id'] = this.calendarId;
    data['date'] = this.date;
    data['title'] = this.title;
    data['description'] = this.description;
    data['note'] = this.note;
    data['user'] = this.user;
    return data;
  }
}
