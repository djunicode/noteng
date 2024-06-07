class Job {
  int? jobId;
  String? company;
  String? jobTitle;
  String? subtype;
  String? mode;
  String? location;
  String? contactNo;
  String? requirements;
  int? durationInMonths;
  String? description;
  String? uploadTime;
  String? user;

  Job(
      {this.jobId,
      this.company,
      this.jobTitle,
      this.subtype,
      this.mode,
      this.location,
      this.contactNo,
      this.requirements,
      this.durationInMonths,
      this.description,
      this.uploadTime,
      this.user});

  Job.fromJson(Map<String, dynamic> json) {
    jobId = json['job_id'];
    company = json['company'];
    jobTitle = json['job_title'];
    subtype = json['subtype'];
    mode = json['mode'];
    location = json['location'];
    contactNo = json['contact_no'];
    requirements = json['requirements'];
    durationInMonths = json['duration_in_months'];
    description = json['description'];
    uploadTime = json['upload_time'];
    user = json['user'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.jobId != null) data['job_id'] = this.jobId;
    if (this.company != null) data['company'] = this.company;
    if (this.jobTitle != null) data['job_title'] = this.jobTitle;
    if (this.subtype != null) data['subtype'] = this.subtype;
    if (this.mode != null) data['mode'] = this.mode;
    if (this.location != null) data['location'] = this.location;
    if (this.contactNo != null) data['contact_no'] = this.contactNo;
    if (this.requirements != null) data['requirements'] = this.requirements;
    if (this.durationInMonths != null)
      data['duration_in_months'] = this.durationInMonths;
    if (this.description != null) data['description'] = this.description;
    if (this.uploadTime != null) data['upload_time'] = this.uploadTime;
    if (this.user != null) data['user'] = this.user;
    return data;
  }
}
