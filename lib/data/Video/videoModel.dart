class Video {
  int? video_id;
  String? subject;
  String? topics;
  int? sem;
  String? links;
  String? user;

  Video({
    this.video_id,
    this.subject,
    this.links,
    this.sem,
    this.topics,
    this.user,
  });
  Video.fromJson(Map<String, dynamic> json) {
    video_id = json['video_id'];
    subject = json['subject'];
    sem = json['sem'];
    topics = json['topics'];
    links = json['links'];
    user = json['user'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.video_id != null) data['video_id'] = this.video_id;
    if (this.subject != null) data['subject'] = this.subject;
    if (this.sem != null) data['sem'] = this.sem;
    if (this.topics != null) data['topics'] = this.topics;
    if (this.links != null) data['links'] = this.links;
    if (this.user != null) data['user'] = this.user;
    return data;
  }
}
