#!/usr/bin/env python3

import os
import toml
import argparse

def dir_path(string):
    if os.path.isdir(string):
        return string
    else:
        raise NotADirectoryError(string)

def parse_args():
    parser = argparse.ArgumentParser(description="Generate markdown for FAQ question")
    parser.add_argument("path", help="Path to member pages", type=dir_path)
    return parser.parse_args()

def main():
    args = parse_args()

    os.chdir(args.path)
    
    flist = list(filter(lambda f: f.endswith(".md") and f != "index.md", os.listdir()))
    num = len(flist) + 1
    fname = f"question{num}.md"
    with open(fname, "w") as f:
        front_matter = {
            "title": "INSERT TITLE HERE",
            "weight": num * 10,
        }
        contents = "+++\n" + toml.dumps(front_matter) + "+++\n" + "INSERT ANSWER\n"
        f.write(contents)
        print(f"Created {os.path.join(args.path, fname)}. Edit file to add question and answers.")

if __name__ == "__main__":
    main()
