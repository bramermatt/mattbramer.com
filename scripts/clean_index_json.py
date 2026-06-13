from pathlib import Path
import json

INDEX_FILE = Path("content/thoughts/index.json")
HOLDING_DIR = Path("content/thoughts/duplicate_holding")

with open(INDEX_FILE, "r", encoding="utf-8") as f:
    entries = json.load(f)

holding_files = {
    file.name
    for file in HOLDING_DIR.glob("*.html")
}

original_count = len(entries)

cleaned_entries = [
    entry
    for entry in entries
    if entry not in holding_files
]

removed_count = (
    original_count
    - len(cleaned_entries)
)

with open(
    INDEX_FILE,
    "w",
    encoding="utf-8",
) as f:
    json.dump(
        cleaned_entries,
        f,
        indent=2,
    )

print()
print("=" * 80)
print("INDEX CLEANED")
print("=" * 80)
print()
print(f"Removed entries: {removed_count}")
print(f"Remaining entries: {len(cleaned_entries)}")
print()