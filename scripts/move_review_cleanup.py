from pathlib import Path
from collections import defaultdict
import shutil
import re

THOUGHTS_DIR = Path("content/thoughts")
HOLDING_DIR = THOUGHTS_DIR / "duplicate_holding"

HOLDING_DIR.mkdir(exist_ok=True)

REREAD_WORDS = [
    "reread",
    "third-reread",
    "second-reread",
    "mythirdtimereading",
]

PREFIXES = [
    "bookreview-",
    "bookdiscussion-",
    "moviereview-",
    "tvshowreview-",
    "videogamereview-",
    "foodreview-",
    "techreview-",
]


def is_reread(filename):
    filename = filename.lower()
    return any(word in filename for word in REREAD_WORDS)


def normalize_title(filename):
    name = filename.lower()

    name = name.replace(".html", "")

    name = re.sub(
        r"^\d{4}-\d{1,2}-\d{1,2}-",
        "",
        name,
    )

    for prefix in PREFIXES:
        if name.startswith(prefix):
            name = name[len(prefix):]

    parts = name.split("-")

    if len(parts) > 1:
        parts = parts[:-1]

    name = "-".join(parts)

    name = re.sub(
        r"(stormlightarchive\d+)",
        "",
        name,
    )

    name = re.sub(
        r"(mistborn\d+)",
        "",
        name,
    )

    name = re.sub(
        r"(dune\d+)",
        "",
        name,
    )

    name = re.sub(
        r"(thewheeloftime\d+)",
        "",
        name,
    )

    name = re.sub(
        r"(harrypotter\d+)",
        "",
        name,
    )

    name = re.sub(
        r"[^a-z0-9]",
        "",
        name,
    )

    return name


def score(file):
    score = len(file.name)

    if re.match(
        r"^\d{4}-\d{2}-\d{2}-",
        file.name,
    ):
        score += 500

    return score


files = [
    f
    for f in THOUGHTS_DIR.glob("*.html")
    if not is_reread(f.name)
]

groups = defaultdict(list)

for file in files:
    groups[normalize_title(file.name)].append(file)

moves = []

keys = sorted(groups.keys())

for i, key_a in enumerate(keys):

    for key_b in keys[i + 1:]:

        if key_a == key_b:
            continue

        if len(key_a) < 8:
            continue

        if key_a in key_b or key_b in key_a:

            files_a = groups[key_a]
            files_b = groups[key_b]

            combined = files_a + files_b

            keep = max(
                combined,
                key=score,
            )

            for file in combined:

                if file == keep:
                    continue

                moves.append(
                    (
                        keep,
                        file,
                        key_a,
                        key_b,
                    )
                )

report = []

report.append("=" * 80)
report.append("CONTAINMENT DUPLICATE REPORT")
report.append("=" * 80)
report.append("")

moved = set()

for keep, move, key_a, key_b in moves:

    if move in moved:
        continue

    moved.add(move)

    report.append(
        f"KEEP: {keep.name}"
    )

    report.append(
        f"MOVE: {move.name}"
    )

    report.append(
        f"KEYS: {key_a} <-> {key_b}"
    )

    report.append("")

    destination = HOLDING_DIR / move.name

    if not destination.exists():
        shutil.move(
            str(move),
            str(destination),
        )

report.append("")
report.append(
    f"Files moved: {len(moved)}"
)

Path(
    "containment_duplicate_report.txt"
).write_text(
    "\n".join(report),
    encoding="utf-8",
)

print()
print("=" * 80)
print("DONE")
print("=" * 80)
print()
print(
    f"Moved: {len(moved)}"
)
print(
    f"Holding folder: {HOLDING_DIR}"
)
print(
    "Report: containment_duplicate_report.txt"
)
print()