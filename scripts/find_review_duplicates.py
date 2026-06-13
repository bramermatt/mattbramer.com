from pathlib import Path
import re
from difflib import SequenceMatcher

THOUGHTS_DIR = Path("content/thoughts")


def clean_name(filename):
    name = filename.lower()

    name = name.replace(".html", "")

    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name
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

    return name


files = sorted(
    [f.name for f in THOUGHTS_DIR.glob("*.html")]
)

matches = []

for i in range(len(files)):
    for j in range(i + 1, len(files)):

        a = files[i]
        b = files[j]

        a_clean = clean_name(a)
        b_clean = clean_name(b)

        similarity = SequenceMatcher(
            None,
            a_clean,
            b_clean
        ).ratio()

        if similarity >= 0.80:
            matches.append(
                (
                    similarity,
                    a,
                    b
                )
            )

matches.sort(reverse=True)

with open(
    "possible_review_duplicates.txt",
    "w",
    encoding="utf-8"
) as report:

    for similarity, a, b in matches:

        report.write(
            f"{similarity:.2f}\n"
        )

        report.write(
            f"  {a}\n"
        )

        report.write(
            f"  {b}\n\n"
        )

print(
    f"Found {len(matches)} possible duplicates."
)

print(
    "Saved to possible_review_duplicates.txt"
)