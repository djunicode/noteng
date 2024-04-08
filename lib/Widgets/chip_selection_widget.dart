import 'package:flutter/material.dart';
import 'package:noteng/constants/colors.dart';

class ChipSelectionWidget extends StatefulWidget {
  final List<String> options;
  final void Function(String)? onTypeSelected;

  const ChipSelectionWidget({
    Key? key,
    required this.options,
    this.onTypeSelected,
  }) : super(key: key);

  @override
  _ChipSelectionWidgetState createState() => _ChipSelectionWidgetState();
}

class _ChipSelectionWidgetState extends State<ChipSelectionWidget> {
  String? _selectedType;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      child: Row(
        children: widget.options
            .map(
              (option) => GestureDetector(
                onTap: () {
                  setState(() {
                    _selectedType = option;
                    widget.onTypeSelected?.call(option);
                  });
                },
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color:
                        _selectedType == option ? primaryColor : Colors.white,
                    borderRadius: BorderRadius.circular(4),
                    border: Border.all(color: Colors.grey),
                  ),
                  child: Text(
                    option,
                    style: TextStyle(
                      color: _selectedType == option
                          ? Colors.white
                          : Colors.black,
                    ),
                  ),
                ),
              ),
            )
            .toList(),
      ),
    );
  }
}
