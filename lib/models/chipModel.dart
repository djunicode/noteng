class ChipModel {
  final String? label;
  final int? selectionType;
  final bool? isSelected;

  ChipModel({
    required this.label,
    this.selectionType,
    this.isSelected = false,
  });
}
