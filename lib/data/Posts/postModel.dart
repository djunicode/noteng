class Posts {
  int? postId;
  String? title;
  String? deadline;
  String? postUrl;
  String? description;
  int? likes;
  String? organisedBy;
  String? subtype;
  bool? isInterested;
  String? dateUpdated;
  String? dateUploaded;
  String? image;
  String? user;

  Posts(
      {this.postId,
      this.title,
      this.deadline,
      this.postUrl,
      this.description,
      this.likes,
      this.organisedBy,
      this.subtype,
      this.isInterested,
      this.dateUpdated,
      this.dateUploaded,
      this.image,
      this.user});

  Posts.fromJson(Map<String, dynamic> json) {
    postId = json['post_id'];
    title = json['title'];
    deadline = json['deadline'];
    postUrl = json['post_url'];
    description = json['description'];
    likes = json['likes'];
    organisedBy = _extractFirstValue(json['organised_by']);
    subtype = _extractFirstValue(json['subtype']);
    isInterested = json['is_interested'];
    dateUpdated = json['date_updated'];
    dateUploaded = json['date_uploaded'];
    image = json['image'];
    user = json['user'];
  }

  String _extractFirstValue(String tupleString) {
    if (tupleString == null) return '';

    var parts =
        tupleString.replaceAll("('", "").replaceAll(")", "").split("',");
    return parts[0].trim();
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.postId != null) data['post_id'] = this.postId;
    if (this.title != null) data['title'] = this.title;
    if (this.deadline != null) data['deadline'] = this.deadline;
    if (this.postUrl != null) data['post_url'] = this.postUrl;
    if (this.description != null) data['description'] = this.description;
    if (this.likes != null) data['likes'] = this.likes;
    if (this.organisedBy != null) data['organised_by'] = this.organisedBy;
    if (this.subtype != null) data['subtype'] = this.subtype;
    if (this.isInterested != null) data['is_interested'] = this.isInterested;
    if (this.dateUpdated != null) data['date_updated'] = this.dateUpdated;
    if (this.dateUploaded != null) data['date_uploaded'] = this.dateUploaded;
    if (this.image != null) data['image'] = this.image;
    if (this.user != null) data['user'] = this.user;
    return data;
  }
}
