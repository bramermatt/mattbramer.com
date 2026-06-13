from pathlib import Path
from collections import defaultdict
import re

THOUGHTS_DIR = Path("content/thoughts")

DRY_RUN = True


def normalize_filename(filename):
    """
    Remove date formatting differences only.

    Example:

    2024-08-26-bookreview-theartofwar-suntzu.html
    2024-8-26-bookreview-theartofwar-suntzu.html

    both become:

    theartofwar-suntzu
    """

    name = filename.lower()

    name = name.replace(".html", "")

    # remove date
    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name,
    )

    # remove content type
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

    return name


def canonical_score(filename):
    """
    Higher score wins.
    """

    score = 0

    # prefer YYYY-MM-DD
    if re.match(
        r"^\d{4}-\d{2}-\d{2}-",
        filename,
    ):
        score += 1000

    score += len(filename)

    return score


groups = defaultdict(list)

for file in THOUGHTS_DIR.glob("*.html"):
    key = normalize_filename(file.name)
    groups[key].append(file)

delete_candidates = []

report_lines = []

report_lines.append("=" * 80)
report_lines.append("SAFE DUPLICATE REPORT")
report_lines.append("=" * 80)
report_lines.append("")

for key in sorted(groups):

    files = groups[key]

    if len(files) < 2:
        continue

    files = sorted(
        files,
        key=lambda f: canonical_score(f.name),
        reverse=True,
    )

    keep = files[0]

    report_lines.append(f"KEY: {key}")
    report_lines.append(f"KEEP: {keep.name}")

    for duplicate in files[1:]:

        report_lines.append(
            f"DELETE: {duplicate.name}"
        )

        delete_candidates.append(duplicate)

        if not DRY_RUN:
            duplicate.unlink()

    report_lines.append("")

report_lines.append("")
report_lines.append(
    f"Files to delete: {len(delete_candidates)}"
)

Path(
    "safe_duplicate_report.txt"
).write_text(
    "\n".join(report_lines),
    encoding="utf-8",
)

print()
print("=" * 80)
print("SAFE DUPLICATE REPORT GENERATED")
print("=" * 80)
print()
print(f"Delete candidates: {len(delete_candidates)}")
print(f"Dry run: {DRY_RUN}")
print()
print("Report written to:")
print("safe_duplicate_report.txt")
print()

if not DRY_RUN:
    print(
        f"Deleted {len(delete_candidates)} files."
    )