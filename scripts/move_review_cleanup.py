from pathlib import Path
from collections import defaultdict
import shutil
import re

THOUGHTS_DIR = Path("content/thoughts")
HOLDING_DIR = THOUGHTS_DIR / "duplicate_holding"

MOVE_FILES = False

HOLDING_DIR.mkdir(exist_ok=True)


def extract_date(filename):
    match = re.match(
        r"^(\d{4}-\d{1,2}-\d{1,2})",
        filename
    )

    if match:
        return match.group(1)

    return None


def normalize_title(filename):
    name = filename.lower()

    name = name.replace(".html", "")

    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name,
    )

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

    name = re.sub(
        r"[^a-z0-9]",
        "",
        name,
    )

    return name


def canonical_score(filename):
    score = 0

    if re.match(
        r"^\d{4}-\d{2}-\d{2}-",
        filename,
    ):
        score += 1000

    score += len(filename)

    return score


files_by_date = defaultdict(list)

for file in THOUGHTS_DIR.glob("*.html"):
    date = extract_date(file.name)

    if date:
        files_by_date[date].append(file)


duplicates = []

for date, files in sorted(files_by_date.items()):

    for i in range(len(files)):
        for j in range(i + 1, len(files)):

            file_a = files[i]
            file_b = files[j]

            title_a = normalize_title(file_a.name)
            title_b = normalize_title(file_b.name)

            is_duplicate = (
                title_a in title_b
                or title_b in title_a
            )

            if not is_duplicate:
                continue

            keep = max(
                [file_a, file_b],
                key=lambda f: canonical_score(
                    f.name
                )
            )

            delete = (
                file_b
                if keep == file_a
                else file_a
            )

            duplicates.append(
                (
                    date,
                    keep,
                    delete,
                )
            )


seen = set()
final_duplicates = []

for date, keep, delete in duplicates:

    if delete.name in seen:
        continue

    seen.add(delete.name)

    final_duplicates.append(
        (
            date,
            keep,
            delete,
        )
    )


report = []

report.append("=" * 80)
report.append("CONTAINMENT DUPLICATE REPORT")
report.append("=" * 80)
report.append("")

for date, keep, delete in final_duplicates:

    report.append(
        f"DATE: {date}"
    )

    report.append(
        f"KEEP: {keep.name}"
    )

    report.append(
        f"MOVE: {delete.name}"
    )

    report.append("")


report.append("")
report.append(
    f"Candidates found: {len(final_duplicates)}"
)

report_text = "\n".join(report)

Path(
    "aggressive_duplicate_report.txt"
).write_text(
    report_text,
    encoding="utf-8",
)

moved = 0

if MOVE_FILES:

    for _, _, delete in final_duplicates:

        destination = (
            HOLDING_DIR
            / delete.name
        )

        if delete.exists():

            shutil.move(
                str(delete),
                str(destination)
            )

            moved += 1

print()
print("=" * 80)
print("REVIEW CLEANUP")
print("=" * 80)
print()

print(
    f"Candidates found: {len(final_duplicates)}"
)

if MOVE_FILES:
    print(
        f"Files moved: {moved}"
    )
else:
    print(
        "MOVE_FILES=False"
    )
    print(
        "No files were moved."
    )

print()
print(
    "Report: aggressive_duplicate_report.txt"
)
print(
    f"Holding folder: {HOLDING_DIR}"
)
print()