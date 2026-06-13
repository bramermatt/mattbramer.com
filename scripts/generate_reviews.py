import csv
import json
import re
from pathlib import Path
from datetime import datetime

ROOT = Path(".")

CSV_FILE = ROOT / "goodreads_library_export.csv"
THOUGHTS_DIR = ROOT / "content" / "thoughts"
INDEX_FILE = THOUGHTS_DIR / "index.json"


def slugify(text):
    text = str(text).lower()
    text = re.sub(r"[^a-z0-9]+", "", text)
    return text


def build_filename(date_read, title, author):
    title_slug = slugify(title)
    author_slug = slugify(author)

    return f"{date_read}-bookreview-{title_slug}-{author_slug}.html"


def format_review_text(review):
    review = review.replace("<br />", "<br/>")
    review = review.replace("<br>", "<br/>")

    paragraphs = [
        p.strip()
        for p in review.split("<br/><br/>")
        if p.strip()
    ]

    return "\n\n".join(
        f"            <p>{p}</p>"
        for p in paragraphs
    )


def build_html(title, author, rating, date_read, review):
    try:
        pretty_date = datetime.strptime(
            date_read,
            "%Y/%m/%d"
        ).strftime("%B %d, %Y")
    except:
        pretty_date = date_read

    iso_date = date_read.replace("/", "-")

    review_html = format_review_text(review)

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} Book Review | Matt Bramer</title>

    <meta name="color-scheme" content="light dark"/>

    <link rel="shortcut icon" type="image/x-icon" href="../img/matts/matt-profile.jpg">

    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="/assets/css/article-shell.css">
</head>
<body>

<section>
    <article id="post"
             data-title="{title} Book Review"
             data-date="{iso_date}">

        <div>

            <p>{pretty_date}</p>

            <h1>{title} Book Review</h1>

            <p>
                {title} by {author}
            </p>

            <p>
                My rating: {rating} of 5 stars
            </p>

{review_html}

            <p>
                <a href="https://www.goodreads.com/review/list/145996417-matthew-bramer">
                    View all my reviews
                </a>
            </p>

        </div>

    </article>
</section>

<script src="../js/nav.js"></script>
<script src="/assets/js/article-shell.js"></script>

</body>
</html>
"""

    return html


# ==========================================
# TEST SETTINGS
# ==========================================

TEST_MODE = False
MAX_REVIEWS = 5

created = 0
skipped = 0

with open(CSV_FILE, encoding="utf-8") as file:
    reader = csv.DictReader(file)

    for row in reader:

        review = row["My Review"].strip()

        created += 1

        if TEST_MODE and created >= MAX_REVIEWS:
            print()
            print(f"Reached test limit of {MAX_REVIEWS} reviews.")
            break

        if not review:
            continue


        title = row["Title"].strip()
        author = row["Author"].strip()
        rating = row["My Rating"].strip()
        date_read = row["Date Read"].strip()

        if not date_read:
            continue

        filename = build_filename(
            date_read.replace("/", "-"),
            title,
            author
        )

        output_file = THOUGHTS_DIR / filename

        if output_file.exists():
            skipped += 1
            continue

        html = build_html(
            title,
            author,
            rating,
            date_read,
            review
        )

        output_file.write_text(
            html,
            encoding="utf-8"
        )

        created += 1


print(f"Created: {created}")
print(f"Skipped: {skipped}")

files = sorted(
    [f.name for f in THOUGHTS_DIR.glob("*.html")],
    reverse=True
)

with open(INDEX_FILE, "w", encoding="utf-8") as file:
    json.dump(files, file, indent=2)

    

print(f"Updated {INDEX_FILE}")
print("Done.")

