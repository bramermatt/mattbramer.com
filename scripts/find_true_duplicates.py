from pathlib import Path
from collections import defaultdict
from hashlib import md5
import re

THOUGHTS_DIR = Path("content/thoughts")


def normalize_title(filename):
    """
    Convert filename into a comparison key.

    Examples:
    2024-08-26-bookreview-theartofwar-suntzu.html
    2024-8-26-bookreview-theartofwar-suntzu.html
    -> theartofwar
    """
    name = filename.lower()

    # Remove extension
    name = name.replace(".html", "")

    # Remove date prefix
    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name,
    )

    # Remove content-type prefixes
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


def extract_content_hash(path):
    """
    Generate a hash of the file content.
    Files with identical content get identical hashes.
    """
    try:
        text = path.read_text(
            encoding="utf-8",
            errors="ignore",
        )

        text = text.lower()
        text = re.sub(r"\s+", " ", text)

        return md5(
            text.encode("utf-8")
        ).hexdigest()

    except Exception:
        return None


def canonical_score(filename):
    """
    Determine which filename is the preferred version.

    Higher score wins.
    """
    score = 0

    # Prefer YYYY-MM-DD
    if re.match(
        r"^\d{4}-\d{2}-\d{2}-",
        filename,
    ):
        score += 100

    # Prefer longer filenames
    score += len(filename)

    return score


groups = defaultdict(list)

for file in THOUGHTS_DIR.glob("*.html"):
    title_key = normalize_title(file.name)
    content_hash = extract_content_hash(file)

    if content_hash is None:
        continue

    groups[(title_key, content_hash)].append(file)

duplicate_groups = []

for _, files in groups.items():
    if len(files) < 2:
        continue

    files = sorted(
        files,
        key=lambda f: canonical_score(f.name),
        reverse=True,
    )

    keep = files[0]
    delete = files[1:]

    duplicate_groups.append(
        (keep, delete)
    )

report = []

report.append("=" * 80)
report.append("SAFE DUPLICATE REPORT")
report.append("=" * 80)
report.append("")

for keep, delete_list in duplicate_groups:
    report.append(f"KEEP: {keep.name}")

    for file in delete_list:
        report.append(f"DELETE: {file.name}")

    report.append("")

report.append("")
report.append(
    f"Duplicate groups found: {len(duplicate_groups)}"
)

report_text = "\n".join(report)

output_file = Path(
    "safe_duplicate_report.txt"
)

output_file.write_text(
    report_text,
    encoding="utf-8",
)

print()
print("=" * 80)
print("SAFE DUPLICATE REPORT CREATED")
print("=" * 80)
print()
print(f"Duplicate groups: {len(duplicate_groups)}")
print(f"Report written to: {output_file}")
print()