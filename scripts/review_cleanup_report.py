from pathlib import Path
from collections import defaultdict
import re

THOUGHTS_DIR = Path("content/thoughts")


def normalize_filename(filename):
    name = filename.lower()

    # Remove .html
    name = name.replace(".html", "")

    # Remove date prefix
    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name
    )

    # Remove content type prefixes
    prefixes = [
        "bookreview-",
        "bookdiscussion-",
        "moviereview-",
        "tvshowreview-",
        "videogamereview-",
        "foodreview-",
        "techreview-",
    ]

    for prefix in prefixes:
        if name.startswith(prefix):
            name = name[len(prefix):]

    # Remove author slug
    parts = name.split("-")

    if len(parts) > 1:
        parts = parts[:-1]

    name = "-".join(parts)

    # Remove punctuation
    name = re.sub(r"[^a-z0-9]", "", name)

    return name


groups = defaultdict(list)

for file in THOUGHTS_DIR.glob("*.html"):
    key = normalize_filename(file.name)
    groups[key].append(file.name)

duplicates = {}

for key, files in groups.items():
    if len(files) > 1:
        duplicates[key] = files

report_lines = []

report_lines.append("=" * 80)
report_lines.append("POSSIBLE DUPLICATE REVIEWS")
report_lines.append("=" * 80)
report_lines.append("")

for key in sorted(duplicates.keys()):

    report_lines.append(f"KEY: {key}")

    for file in sorted(duplicates[key]):
        report_lines.append(f"  - {file}")

    report_lines.append("")

report_lines.append("")
report_lines.append(f"Duplicate groups found: {len(duplicates)}")

report = "\n".join(report_lines)

output_file = Path("duplicate_report.txt")

with open(output_file, "w", encoding="utf-8") as file:
    file.write(report)

print()
print("=" * 80)
print("Duplicate report generated")
print("=" * 80)
print()
print(f"Groups found: {len(duplicates)}")
print(f"Report written to: {output_file}")
print()